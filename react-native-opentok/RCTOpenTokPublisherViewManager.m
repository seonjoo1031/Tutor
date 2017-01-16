/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RCTOpenTokPublisherViewManager.h"
#import "RCTOpenTokPublisherView.h"
#import "RCTComponent.h"

@implementation RCTOpenTokPublisherViewManager

- (UIView *)view {
    return [RCTOpenTokPublisherView new];
}

RCT_EXPORT_MODULE()

//혹시, publisher의 streamId를 찾을 수 있을까? 그러면 그걸 다시 넣고 하겠지만?

RCT_EXPORT_VIEW_PROPERTY(apiKey, NSString)
RCT_EXPORT_VIEW_PROPERTY(sessionId, NSString)
RCT_EXPORT_VIEW_PROPERTY(token, NSString)
RCT_EXPORT_VIEW_PROPERTY(publisherName, NSString)

RCT_EXPORT_VIEW_PROPERTY(onPublishStart, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPublishError, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPublishStop, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onClientConnected, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onClientDisconnected, RCTDirectEventBlock)

@end
