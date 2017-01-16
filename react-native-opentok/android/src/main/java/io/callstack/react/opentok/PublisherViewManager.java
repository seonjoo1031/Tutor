package io.callstack.react.opentok;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class PublisherViewManager extends SessionViewManager<PublisherView> {
    @Override
    public String getName() {
        return "RCTOpenTokPublisherView";
    }

    @Override
    protected PublisherView createViewInstance(ThemedReactContext reactContext) {
        return new PublisherView(reactContext);
    }

    @ReactProp(name = "publisherName")
    public void setPublisherName(PublisherView view, String publisherName) { view.setPublisherName(publisherName);}
}
