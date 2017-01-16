/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RCTOpenTokSubscriberViewManager.h"
#import "RCTOpenTokSubscriberView.h"

@implementation RCTOpenTokSubscriberViewManager

- (UIView *)view {
    return [RCTOpenTokSubscriberView new];
}

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(apiKey, NSString)
RCT_EXPORT_VIEW_PROPERTY(sessionId, NSString)
RCT_EXPORT_VIEW_PROPERTY(token, NSString)

RCT_EXPORT_VIEW_PROPERTY(onSubscribeStart, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSubscribeError, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSubscribeStop, RCTDirectEventBlock)

@end
