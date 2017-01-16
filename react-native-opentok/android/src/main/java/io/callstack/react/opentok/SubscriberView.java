package io.callstack.react.opentok;

import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.opentok.android.BaseVideoRenderer;
import com.opentok.android.Connection;
import com.opentok.android.OpentokError;
import com.opentok.android.PublisherKit;
import com.opentok.android.Subscriber;
import com.opentok.android.Session;
import com.opentok.android.Stream;
import com.opentok.android.SubscriberKit;

import java.util.Iterator;

import static io.callstack.react.opentok.OpenTokSessionManager.activePublishers;
import static io.callstack.react.opentok.OpenTokSessionManager.activeSubscribers;
import static io.callstack.react.opentok.PublisherView.publisherStream;

public class SubscriberView extends SessionView implements SubscriberKit.SubscriberListener, Session.ConnectionListener {
    private Subscriber mSubscriber = null;
    private Stream tempStream = null;

    public SubscriberView(ThemedReactContext reactContext) {
        super(reactContext);
    }

    private void startSubscribing(Stream stream) {
        mSubscriber = new Subscriber(getContext(), stream);
        Log.i("subscribe", "before putting subs to array");
        mSubscriber.setSubscriberListener(this);
        mSubscriber.getRenderer().setStyle(BaseVideoRenderer.STYLE_VIDEO_SCALE,
                BaseVideoRenderer.STYLE_VIDEO_FILL);
        mSession.subscribe(mSubscriber);
        //do not erase this. put mSubscriber should be followed by mSession.subscribe(mSubscriber)....or
        //right before subscribe(mSubscriber)...(i haven't checked this..)

        //if mSubscriber.getStream   ... so, calculating streamId of.. publisher.. Start subscribing to streamId: " + subscriber.getStream().getStreamId() + " in the session");
        Log.i("subscriber", "attachsubscriberview");
        Log.i("subscriber", String.format("mSUbscriber %s", mSubscriber.toString()));
        attachSubscriberView();

        Log.i("subscriber", "put subsciber with stream..to array..");

        activeSubscribers.put(stream, mSubscriber);
        tempStream = stream;
    }

    private void attachSubscriberView() {
        //how many subscriber...?
        addView(mSubscriber.getView(), new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
    }

    private void cleanUpSubscriber() {
        removeView(mSubscriber.getView());
        mSubscriber.destroy();
        mSubscriber = null;

    }

    /**
     * Session listener
     **/

    @Override
    public void onStreamReceived(Session session, Stream stream) {
        if (mSubscriber == null) {
//            Log.i("subscriber", publisherStream.toString());
//            Log.i("subscriber", publisherStream.getSession().toString());
//            Log.i("subscriber", publisherStream.getName().toString());
//            Log.i("subscriber", stream.toString());
//            Log.i("subscriber", stream.getSession().toString());
//            Log.i("subscriber", stream.getName().toString());
//            Log.i("subscriber", ""+publisherStream.compareTo(stream));
            if(publisherStream == null) {
                Log.i("subscriber", "퍼블리셔스트림이 널임.");
                return;
            }else {
                if(publisherStream.equals(stream)) {
                    Log.i("subscriber", "자기 얼굴 보이기 방지.");
                    return;
                } else {
                    Log.i("subscriber", "튜터 만들기.");
                    startSubscribing(stream);
                    sendEvent(Events.EVENT_SUBSCRIBE_START, Arguments.createMap());
                }
            }
        } else {
            Log.i("subscriber", "튜터있음");
            return;
        }

//        if (mSubscriber == null) {
//            Iterator retCode = activePublishers.iterator();
//            Log.i("subscriber", "inside iterator");
//            Log.i("subscriber", "" + retCode.hasNext());
//
//            while (retCode.hasNext()) {
//                PublisherKit p1 = (PublisherKit) retCode.next();
//
//                Log.i("subscriber", p1.toString());
//                if (p1 != null) {
//                    if (p1.getStream() != null) {
//                        Log.i("subscriber", p1.getStream().toString());
//                        Log.i("subscriber", stream.toString());
//                        if (p1.getName() != null) {
//                            Log.i("subscriber", String.format("p1's name is equal to %s", p1.getName().toString()));
//                        } else {
//                            Log.i("subscriber", "p1 name is null???");
//                        }
//
//                    } else {
//                        Log.i("subsceriber", "p1.getStream is null..");
//                        startSubscribing(stream);
//                        sendEvent(Events.EVENT_SUBSCRIBE_START, Arguments.createMap());
//                    }
//                } else {
//                    Log.i("subscriber", "p1 is null. But it shouldn't be null...");
//                }
//
//                if (p1.getName() != null) {
//                    Log.i("subscriber", "p1.getName is not null");
//                    Log.i("subscriber", p1.getName().toString());
//                    Log.i("subscriber", stream.getName().toString());
//                    if (p1.getName().equals(stream.getName())) {
//                        if (p1.getStream().equals(stream)) {
//                            return;
//                        } else {
//                            Log.i("subscriber", "when getStream is equal to Stream.");
//                            startSubscribing(stream);
//                            sendEvent(Events.EVENT_SUBSCRIBE_START, Arguments.createMap());
//                        }
//                    }
//                } else {//get ..
//                    Log.i("subscriber", "p1.getName is null....");
//                    Toast.makeText(getContext(), stream.getName(), Toast.LENGTH_SHORT).show();
//                    Log.i("videoType", stream.getName());
//                    // 튜터가 있는데 우리한테 섭스크라이버는 널이야 그래서 이리 오는데, 이쪽은 우리가 자기 얼굴 안보이려고 리턴을 해준거란 말이지
////                    if(stream.getStreamVideoType().getVideoType() == 1) {
////                        return;
////                    }
//                }
//                Log.i("subscriber", "out1");
//            }
//            Log.i("subscriber", "out2");
//            if (stream.equals(tempStream)) {
//                Log.i("subscriber", "out122");
//                return;
//            } else {
//                Log.i("subscriber", "out241235123123");
//                startSubscribing(stream);
//                sendEvent(Events.EVENT_SUBSCRIBE_START, Arguments.createMap());
//            }
//        } else {
//            // 일단 하나라고 하면 여기서 리턴시키면 자기 얼굴이 안보임.
//            Log.i("subscriber", "out33333333333");
//            return;
//        }
    }

    @Override
    public void onStreamDropped(Session session, Stream stream) {
        Log.i("subscriber", "onStreamDropped...");

        if (mSubscriber != null) {
            if (mSubscriber.getStream().equals(stream)) {
                cleanUpSubscriber();
            }
        }

        if (mSubscriber != null) {
            Log.i("subscirber", String.format("now at onStreamDroped, mSubscriber is, %s", mSubscriber.toString()));

        } else {
            Log.i("subscirber", String.format("now at onStreamDroped, mSubscriber is null"));

        }
        sendEvent(Events.EVENT_SUBSCRIBE_STOP, Arguments.createMap());
    }

    /**
     * Subscribe listener
     **/

    @Override
    public void onConnected(SubscriberKit subscriberKit) {
    }

    @Override
    public void onDisconnected(SubscriberKit subscriberKit) {
        Log.i("subscriber", "onDisconnected");

        if (mSubscriber != null) {
            cleanUpSubscriber();
        }

        if (mSubscriber != null) {
            Log.i("subscirber", String.format("now at onDisconnected, mSubscriber is, %s", mSubscriber.toString()));

        } else {
            Log.i("subscirber", String.format("now at onDisconnected, mSubscriber is null"));
        }

    }

    @Override
    public void onError(SubscriberKit subscriberKit, OpentokError opentokError) {
        onError(opentokError);
        if (mSubscriber != null) {
            cleanUpSubscriber();
        }
        Log.i("subscriber", "onError......");
        Log.i("subscriber", opentokError.getMessage());
        Log.i("subscriber", opentokError.getErrorCode().toString());
    }

    /**
     * Connection listener
     **/
    @Override
    public void onConnectionCreated(Session session, Connection connection) {
        WritableMap payload = Arguments.createMap();

        payload.putString("connectionId", connection.getConnectionId());
        payload.putString("creationTime", connection.getCreationTime().toString());
        payload.putString("data", connection.getData());

        sendEvent(Events.EVENT_CLIENT_CONNECTED, payload);
    }

    @Override
    public void onConnectionDestroyed(Session session, Connection connection) {
        WritableMap payload = Arguments.createMap();

        payload.putString("connectionId", connection.getConnectionId());

        Log.i("subscriber", "onConnectionDestroyed......");


        Log.i("subscirber", String.format("currently mSubscriber is, %s", mSubscriber.toString()));

        if (mSubscriber != null) {
            cleanUpSubscriber();
        }

        if (mSubscriber != null) {
            Log.i("subscirber", String.format("now at onStreamDroped, mSubscriber is, %s", mSubscriber.toString()));

        } else {
            Log.i("subscirber", String.format("now at onStreamDroped, mSubscriber is null"));

        }

        sendEvent(Events.EVENT_CLIENT_DISCONNECTED, payload);
    }
}
