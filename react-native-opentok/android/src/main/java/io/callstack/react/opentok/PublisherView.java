package io.callstack.react.opentok;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.opentok.android.Connection;
import com.opentok.android.OpentokError;
import com.opentok.android.Publisher;
import com.opentok.android.PublisherKit;
import com.opentok.android.Session;
import com.opentok.android.Stream;

import java.util.Iterator;
import java.util.concurrent.CopyOnWriteArraySet;

import static io.callstack.react.opentok.OpenTokSessionManager.activePublishers;

/**
 * PublisherView
 *
 * React Component extending SessionView that publishes stream of video and audio to the stream
 */
public class PublisherView extends SessionView implements PublisherKit.PublisherListener, Session.ConnectionListener {

    /** {Publisher} active instance of a publisher **/
    private Publisher mPublisher;
    private String mPublisherName;
    public static Stream publisherStream;
    //publisher => publisherKit?

    public PublisherView(ThemedReactContext reactContext) {
        super(reactContext);
    }

    public void setPublisherName(String publisherName) { mPublisherName = publisherName; }

    private void startPublishing() {
        mPublisher = new Publisher(getContext());
        mPublisher.setName(mPublisherName);


            Log.i("publisherview", "set publisher listener");
            mPublisher.setPublisherListener(this);
            mSession.publish(mPublisher);
            activePublishers.add(mPublisher);
            attachPublisherView();

    }

    private void attachPublisherView() {
        addView(mPublisher.getView(), new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
    }

    private void cleanUpPublisher() {
        if(mPublisher!= null){
            if(mPublisher.getView() != null){
                removeView(mPublisher.getView());
            }
        }
        mPublisher = null;
    }

    @Override
    protected void onSessionCreated(Session session) {
        session.setConnectionListener(this);
        Log.i("testSession", session.getSessionId());
        if(session.getConnection()!=null){
            Log.i("what?",session.getConnection().toString());
        }
        //by doing so, I want to catch connection of this session.
    }

    /** Session listener **/

    @Override
    public void onConnected(Session session) {
        Log.i("publisher", "Invoked when the client connects to the OpenTok session.");


        startPublishing();
        Log.i("publisher", "on connected publisher");
        Log.i("publisher", session.getConnection().getConnectionId().toString());
    }

    /** Publisher listener **/

    @Override
    public void onStreamCreated(PublisherKit publisherKit, Stream stream) {
        publisherStream = stream;
        sendEvent(Events.EVENT_PUBLISH_START, Arguments.createMap());
        Log.i("publisher", "stream created.");
        Log.i("publisher", stream.getConnection().getConnectionId().toString());
    }

    @Override
    public void onStreamDestroyed(PublisherKit publisherKit, Stream stream) {
        sendEvent(Events.EVENT_PUBLISH_STOP, Arguments.createMap());
        Log.i("publisher", "stream destroyed.");

        cleanUpPublisher();
    }

    @Override
    public void onError(PublisherKit publisherKit, OpentokError opentokError) {
        onError(opentokError);
        cleanUpPublisher();
    }

    /** Connection listener **/
    @Override
    public void onConnectionCreated(Session session, Connection connection) {
        WritableMap payload = Arguments.createMap();

        payload.putString("connectionId", connection.getConnectionId());
        payload.putString("creationTime", connection.getCreationTime().toString());
        payload.putString("data", connection.getData());

        sendEvent(Events.EVENT_CLIENT_CONNECTED, payload);

        Log.i("Publisher", "connectioncreated");
        Log.i("Publisher", connection.getConnectionId().toString());

    }

    @Override
    public void onConnectionDestroyed(Session session, Connection connection) {
        WritableMap payload = Arguments.createMap();

        payload.putString("connectionId", connection.getConnectionId());

        sendEvent(Events.EVENT_CLIENT_DISCONNECTED, payload);
    }

}
