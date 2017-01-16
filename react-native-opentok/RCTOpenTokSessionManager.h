/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RCTBridgeModule.h"
#import <OpenTok/OpenTok.h>

@interface RCTOpenTokSessionManager : NSObject <RCTBridgeModule, OTSessionDelegate>
{
    NSMutableArray *_truckBoxes;
    NSMutableArray *_farmerlist;
    NSString *_farmerCardNumber;
    NSString *_fName;
}

+ (RCTOpenTokSessionManager *)sharedInstance;

@property(strong, nonatomic, readwrite) NSMutableArray *truckBoxes;
@property(strong, nonatomic, readwrite) NSMutableArray *farmerList;
@property(strong, nonatomic, readwrite) NSString *farmerCardNumber;
@property(strong, nonatomic, readwrite) NSString *fName;
@end
