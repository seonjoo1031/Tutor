/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RCTOpenTokSessionManager.h"
#import "RCTEventDispatcher.h"
#import <OpenTok/OpenTok.h>

@implementation RCTOpenTokSessionManager {
    OTSession *_session;
}

@synthesize bridge = _bridge;


//I called this from...
@synthesize truckBoxes = _truckBoxes;
@synthesize farmerList = _farmerList;
@synthesize farmerCardNumber = _farmerCardNumber;
@synthesize fName = _fName;


+ (RCTOpenTokSessionManager *)sharedInstance {
    static dispatch_once_t onceToken;
    static RCTOpenTokSessionManager *instance = nil;
    dispatch_once(&onceToken, ^{
        instance = [[RCTOpenTokSessionManager alloc] init];
    });
    return instance;
}

- (id)init {
    self = [super init];
    if (self) {
        _truckBoxes = [[NSMutableArray alloc] init];
        _farmerlist = [[NSMutableArray alloc] init];
        // Note these aren't allocated as [[NSString alloc] init] doesn't provide a useful object
        _farmerCardNumber = nil;
        _fName = @"sungpah1";
    }

    NSLog(@"여기 실행되는거 맞겠지?");
    return self;
}


RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(connect:(NSString *)apiKey sessionId:(NSString *)sessionId token:(NSString *)token)
{
  _session = [[OTSession alloc] initWithApiKey:apiKey sessionId:sessionId delegate:self];

  OTError *error = nil;
  [_session connectWithToken:token error:&error];

  if (error) {
    NSLog(@"connect failed with error: (%@)", error);
  } else {
    NSLog(@"session created");
  }
}

RCT_EXPORT_METHOD(sendMessage:(NSString *)message)
{
  NSLog(@"signal error %@", message);
  OTError* error = nil;
  [_session signalWithType:@"message" string:message connection:nil error:&error];
  if (error) {
      NSLog(@"signal error %@", error);
  } else {
      NSLog(@"signal sent");
  }
}

# pragma mark - OTSession delegate callbacks

- (void)sessionDidConnect:(OTSession*)session {}
- (void)sessionDidDisconnect:(OTSession*)session {}
- (void)session:(OTSession*)session streamCreated:(OTStream *)stream {

  NSLog(@"???????stream created.오잉 이건 RCTOpenTokSEssionManager임.");

  //
  // subscriber = [[OTSubscriber alloc] initWithStream:stream delegate:self];
  //  OTError* error = nil;
  //  [session subscribe:subscriber error:&error]
  //  if (error) {
  //    NSLog(@"subscribe failed with error: (%@)", error);
  //  }
  //

}
- (void)session:(OTSession*)session streamDestroyed:(OTStream *)stream {

    NSLog(@"???????stream destroyed.. session. 오잉 이건 RCTOpenTokSEssionManager임.");

  // NSLog(@"session streamDestroyed (%@)", stream.streamId);
  //
  //     if ([subscriber.stream.streamId isEqualToString:stream.streamId])
  //     {
  //         [_subscriber.view removeFromSuperview];
  //         _subscriber = nil;
  //     }
  //

}

- (void)session:(OTSession*)session didFailWithError:(OTError*)error {}

- (void)session:(OTSession*)session receivedSignalType:(NSString*)type fromConnection:(OTConnection*)connection withString:(NSString*)string {
    NSLog(@"Received signal %@", string);
    [self onMessageRecieved:string data:connection.data];
}

- (void)onMessageRecieved:(NSString *)message data:(NSString *)data
{
  [self.bridge.eventDispatcher sendAppEventWithName:@"onMessageRecieved"
    body:@{
      @"message": message,
      @"data": data,
    }];
}

@end
