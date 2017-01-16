/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

@import UIKit;
#import "RCTOpenTokSubscriberView.h"

//added to test..
#import "RCTOpenTokSessionManager.h"

#import "RCTEventDispatcher.h"
#import "RCTUtils.h"
#import <OpenTok/OpenTok.h>

@interface RCTOpenTokSubscriberView () <OTSessionDelegate, OTSubscriberDelegate>

@end

@implementation RCTOpenTokSubscriberView {
    OTSession *_session;
    OTSubscriber *_subscriber;
}

/**
 * Mounts component after all props were passed
 */

- (void)didMoveToWindow {
    
    NSLog(@"언제 이부분이 실행되는가? 이 때, subscriber가 존재 하면 동작 안하도록..?");
    if (_subscriber == nil){
        NSLog(@"여기서 subscirber가 nil인 경우 여기가 실행");
        [super didMoveToSuperview];
        
        if(_session != nil){
            //do nothing?
        }else{
            [self mount];
        }
    
    }else{
        NSLog(@"here subscriber not nil");
    }
}

/**
 * Creates a new session with a given apiKey, sessionID and token
 *
 * Calls `onSubscribeError` in case an error happens during initial creation.
 */

- (void)mount {
    
    NSLog(@"ns log mount?... (%@)",_subscriber);
    [self cleanupSubscriber];
    if(_session != nil ){
    //previously the below code was a part of dealloc.
        // It turns out that this triggers deallocated memory issue with the previous setting.
        // on 12/24, moved to mount.
        // assumption: when session != nil => operating mount means moving back to preparation view in react native.
        
            NSLog(@"Is dealloc working?");
            if(_subscriber != nil){
                [self cleanupSubscriber];
            }
            NSLog(@"sessionis already nil? (%@)", _session);
            if(_session != nil){
                NSLog(@"what is the session. it should'nt be nil (%@)",_session);
                [_session disconnect:nil]; ///// 요가 하나.
                NSLog(@"Let's make session nil");
                _session = nil;
                _session.delegate = nil;
                NSLog(@"session nil? (%@)", _session);
            }
        

        
        
        
    }else{
        NSLog(@"_session is nil..");
        _session = [[OTSession alloc] initWithApiKey:_apiKey sessionId:_sessionId delegate:self];
        NSLog(@"inside mount, after cleanup, subscriber is..(%@)",_subscriber);
        OTError *error = nil;
        NSLog(@"session before....(%@)",_session);
        [_session connectWithToken:_token error:&error];
        NSLog(@"session After....(%@)",_session);
        if (error) {
            _onSubscribeError(RCTJSErrorFromNSError(error));
        }
    }
    
    
    
}

/**
 * Creates an instance of `OTSubscriber` and subscribes to stream in current
 * session
 */

- (void)doSubscribe:(OTStream*)stream {
    
    NSLog(@"start do subscribe...");
    NSLog(@"do subscribe...with streamId:(%@)", stream.streamId);
    RCTOpenTokSessionManager *globals = [RCTOpenTokSessionManager sharedInstance];
    NSLog(@"can we access to Publisher from subscriberview? (%@)",globals.fName);
    
    
    if ([stream.streamId isEqualToString:globals.fName]){
        return;
    }else{
        _subscriber = [[OTSubscriber alloc] initWithStream:stream delegate:self];
        OTError *error = nil;
        [_session subscribe:_subscriber error:&error];
        if (error)
        {
            _onSubscribeError(RCTJSErrorFromNSError(error));
            return;
        }
        [self attachSubscriberView];
        
    }
    
    
}

/**
 * Attaches subscriber preview
 */


- (void)attachSubscriberView {
    [_subscriber.view setFrame:CGRectMake(0, 0, self.bounds.size.width, self.bounds.size.height)];
    [self addSubview:_subscriber.view];
}

/**
 * Cleans subscriber
 */
- (void)cleanupSubscriber {
    
    NSLog(@"cleanupSubscriber");
    if(_subscriber == nil){
        NSLog(@"Already Nil");
        
    }else{
        NSLog(@"Remove Subscriber");
        NSLog(@"-----(%@)", _subscriber);
        [_subscriber.view removeFromSuperview];
        _subscriber = nil;
        _subscriber.delegate = nil;
        
    }
}

#pragma mark - OTSession delegate callbacks

/**
 * Called when session is created
 */
- (void)sessionDidConnect:(OTSession*)session {}

/**
 * Called when session is destroyed
 */
- (void)sessionDidDisconnect:(OTSession*)session {
    NSLog(@"session Did Disconnect.."); //not operating..
    
}

/**
 * When stream is created we start subscribtion
 *
 * @todo we only support subscribing to a single stream, multiple streams
 * are out of scope for our use-cases. Contributions welcome.
 */
- (void)session:(OTSession*)session streamCreated:(OTStream*)stream {
    
    NSLog(@"subscriberview.m => stream created...stream id is..(%@)", stream.name);
    NSLog(@"do subscribe...with streamId:(%@)", stream.streamId);
    RCTOpenTokSessionManager *globals = [RCTOpenTokSessionManager sharedInstance];
    NSLog(@"can we access to Publisher from subscriberview? (%@)",globals.fName);
    
    
    if ([stream.name isEqualToString:globals.fName]){
        return;
    }
    
    if (_subscriber == nil) {
        [self doSubscribe:stream];
    }
}

/**
 * Called when stream is destroyed
 */
- (void)session:(OTSession*)session streamDestroyed:(OTStream*)stream {
    
    NSLog(@"subscriber: trying to destroy...");
    
    _onSubscribeStop(@{});
    
    //added to distroy the session.. <!---- edited by Sungpah.
    NSLog(@"session streamDestroyed (%@)", stream.streamId);
    if ([_subscriber.stream.streamId isEqualToString:stream.streamId])
    {
        [_subscriber.view removeFromSuperview];
        _subscriber = nil;
    }
}

/**
 * Called when session error occurs
 */
- (void)session:(OTSession*)session didFailWithError:(OTError*)error {
    NSLog(@"subscriber error..");
    
    _onSubscribeError(RCTJSErrorFromNSError(error));
}

#pragma mark - OTSubscriber delegate callbacks

- (void)subscriber:(OTSubscriberKit*)subscriber didFailWithError:(OTError*)error {
    NSLog(@"여기가 문제인가 didFailWithError");
    _onSubscribeError(RCTJSErrorFromNSError(error));
    
    [self cleanupSubscriber];
    
}

- (void)subscriberDidConnectToStream:(OTSubscriberKit*)subscriber {
    NSLog(@"subscriber did connect to stream..");
    
    _onSubscribeStart(@{});
}

- (void)subscriberDidDisconnectFromStream:(OTSubscriberKit*)subscriber {
    NSLog(@"여기가 did disconnectFrom Stream..");
    _onSubscribeStop(@{});
    [self cleanupSubscriber];
}

- (void)subscriberDidReconnectToStream:(OTSubscriberKit*)subscriber {
    NSLog(@"여기가 did subscriberDidReconnectToStream Stream..");
    _onSubscribeStart(@{});
}

/**
 * Remove session when this component is unmounted
 */
- (void)dealloc {
    
//    NSLog(@"Is dealloc working?");
//    if(_subscriber != nil){
//        [self cleanupSubscriber];
//    }
//    NSLog(@"sessionis already nil? (%@)", _session);
//    if(_session != nil){
//        NSLog(@"what is the session. it should'nt be nil (%@)",_session);
//        [_session disconnect:nil]; ///// 요가 하나.
//        NSLog(@"Let's make session nil");
//        _session = nil;
//        _session.delegate = nil;
//        NSLog(@"session nil? (%@)", _session);
//    }
    
//    [self dealloc];
}

@end
