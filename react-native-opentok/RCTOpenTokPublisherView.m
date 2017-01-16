/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

@import UIKit;
#import "RCTOpenTokPublisherView.h"
#import "RCTOpenTokSessionManager.h"

#import "RCTEventDispatcher.h"
#import "RCTUtils.h"
#import <OpenTok/OpenTok.h>

@interface RCTOpenTokPublisherView () <OTSessionDelegate, OTPublisherDelegate>

@end

@implementation RCTOpenTokPublisherView {
    OTSession *_session;
    OTPublisher *_publisher;
}

/**
 * Mounts component after all props were passed
 */
- (void)didMoveToWindow {
    [super didMoveToSuperview];

    if (_publisher == nil){
        NSLog(@"여기서 publisher가 nil인 경우 여기가 실행");
        [super didMoveToSuperview];
        [self mount];
    }else{
        NSLog(@"here publisher not nil");
    }

}

/**
 * Creates a new session with a given apiKey, sessionID and token
 *
 * Calls `onStartFailure` in case an error happens during initial creation.
 *
 * Otherwise, `onSessionCreated` callback is called asynchronously
 */
- (void)mount {

    if(_session != nil ){
        NSLog(@"세션이 널이 아닌 경우. Publisher View");
        //마운트 쪽에서 이렇게 처리를 안해줘야 뻑이 안남.
        //또한 publisher쪽인데도, 에러는 subscriber쪽에서 났다고 함.
        //아마, 연동이 되어 있는 듯.
    }
    else{
        _session = [[OTSession alloc] initWithApiKey:_apiKey sessionId:_sessionId delegate:self];

        OTError *error = nil;
        [_session connectWithToken:_token error:&error];

        if (error) {
            _onPublishError(RCTJSErrorFromNSError(error));
        }
        NSLog(@"mounted..rtc publisherView.m");
    }

}

/**
 * Creates an instance of `OTPublisher` and publishes stream to the current
 * session
 *
 * Calls `onPublishError` in case of
 an error, otherwise, a camera preview is inserted
 * inside the mounted view
 */
- (void)startPublishing {
    _publisher = [[OTPublisher alloc] initWithDelegate:self name:_publisherName];

    //initWithDelegate:name:
    NSLog(@"start publishing. _publisher is initiated");
    NSLog(@"-----------------!!,(%@)",_publisherName);


    RCTOpenTokSessionManager *globals = [RCTOpenTokSessionManager sharedInstance];
    globals.fName = _publisherName;


    NSLog(@"-----------------!!,(%@)",_publisher.stream);

    OTError *error = nil;

    [_session publish:_publisher error:&error];

    NSLog(@"-----------------!!,(%@)",_publisher.stream);

    if (error) {
        _onPublishError(RCTJSErrorFromNSError(error));
        NSLog(@"publishing error..");
        return;
    }

    NSLog(@"publishing ok..");

    [self attachPublisherView];
}

/**
 * Attaches publisher preview
 */
- (void)attachPublisherView {

    NSLog(@"publishing 뷰를 일단 형성 한 후에.");

    [_publisher.view setFrame:CGRectMake(0, 0, self.bounds.size.width, self.bounds.size.height)];


    // [_publisher.view setFrame:CGRectMake(0, 0, 320, 200)];
    [self addSubview:_publisher.view];

    // publisher = [[OTPublisher alloc] initWithDelegate:self];
    // [self.view addSubview:publisher.view];
    // [publisher.view setFrame:CGRectMake(0, 0, 200, 150)];

}

/**
 * Cleans up publisher
 */
- (void)cleanupPublisher {
    [_publisher.view removeFromSuperview];
    _publisher = nil;
}

#pragma mark - OTSession delegate callbacks

/**
 * When session is created, we start publishing straight away
 */
- (void)sessionDidConnect:(OTSession*)session {
    [self startPublishing];
}

- (void)sessionDidDisconnect:(OTSession*)session {}

/**
 * @todo multiple streams in a session are out of scope
 * for our use-cases. To be implemented later.
 */

- (void)session:(OTSession*)session streamCreated:(OTStream *)stream {

    NSLog(@"여기는 현재 아웃풋이 안나오고 있음용..stream created inside OpenTok Publisher. (%@)",stream);
    NSLog(@"stream created inside OpenTok Publisher.stream id.. (%@)",stream.streamId);

}
- (void)session:(OTSession*)session streamDestroyed:(OTStream *)stream {}

/**
 * Called when another client connects to the session
 */
- (void)session:(OTSession *)session connectionCreated:(OTConnection *)connection {
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];


    NSLog(@"connection created.. ok..");
    NSLog(@"session information... ok..(%@)", session);

    [dateFormatter setDateFormat:@"EEE MMM dd HH:mm:ss ZZZ yyyy"];
    [dateFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
    NSString *creationTimeString = [dateFormatter stringFromDate:connection.creationTime];

    NSLog(@"connectionId (%@)",connection.connectionId);
    NSLog(@"next (%@)",creationTimeString);
    NSLog(@"next (%@)",connection.data);

    _onClientConnected(@{
                         //  @"connectionId": connection.connectionId,
                         //    @"creationTime": creationTimeString
                         });

}

/**
 * Called when client disconnects from the session
 */
- (void)session:(OTSession *)session connectionDestroyed:(OTConnection *)connection {
    _onClientDisconnected(@{
                            @"connectionId": connection.connectionId,
                            });
}

- (void)session:(OTSession*)session didFailWithError:(OTError*)error {
    _onPublishError(RCTJSErrorFromNSError(error));
}

#pragma mark - OTPublisher delegate callbacks

- (void)publisher:(OTPublisherKit*)publisher streamCreated:(OTStream *)stream {

    //퍼블리셔가 먼저 나오고, 그다음 섭스크라입을 함.
    NSLog(@"publisher streamCreated....");
    NSLog(@"publisher stream?...(%@)",stream.name);
    NSLog(@"publisher streamCreated에서 streamid는 ? => (%@)", stream.streamId);



    _onPublishStart(@{});

}

- (void)publisher:(OTPublisherKit*)publisher streamDestroyed:(OTStream *)stream {
    _onPublishStop(@{});
    [self cleanupPublisher];
}

- (void)publisher:(OTPublisherKit*)publisher didFailWithError:(OTError*)error {
    _onPublishError(RCTJSErrorFromNSError(error));
    [self cleanupPublisher];
}

/**
 * Remove session when this component is unmounted
 */
- (void)dealloc {
    [self cleanupPublisher];
    [_session disconnect:nil];

    //added by Ringle.
    _session = nil;

}

@end
