package com.Speechprocess;
import android.content.Context;
import android.os.Handler;
import android.content.Intent;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;

import java.util.ArrayList;
import android.util.Log;

import com.facebook.react.bridge.*;

public class MySpeechModule extends ReactContextBaseJavaModule {
    private static final String TAG = "ReactNativeJS";
    private static final String TAG1 = "ReactNativeJS";
    private SpeechRecognizer sr = null;


    public MySpeechModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "ListenToSpeech";
    }

    @ReactMethod
    public void startSpeech(final Callback callback) {
        Log.d(TAG, "running speech recognizer: " + this.hashCode());
        final Context context = getCurrentActivity();
        Handler mainHandler = new Handler( context.getMainLooper() );
        Log.d( TAG, "running speech recognizer" + mainHandler );
        final SpListener listener = new SpListener( context, callback, mainHandler, new Handler() );
        mainHandler.post( getStartSpeechTask( context, listener ) );
        //private SpeechRecognizer sr;
    }

    @ReactMethod
    public void endSpeech() {
        Log.d(TAG, "stopping speech recognizer");
        final Context context = getCurrentActivity();
        Handler mainHandler = new Handler( context.getMainLooper() );
        Log.d( TAG, "stopping speech recognizer" + mainHandler );
        mainHandler.post( getStopSpeechTask( context ) );
    }

    private Runnable getStopSpeechTask(final Context context) {
        return new Runnable() {
            @Override
            public void run() {
                SpeechRecognizer recognizer = MySpeechModule.this.sr;
                MySpeechModule.this.sr = null;
                try {
                    if (recognizer != null) {
                        recognizer.stopListening();
                        Log.d( TAG, "Stopped listening!" );
                    }
                } finally {
                    recognizer.cancel();
                    recognizer.destroy();
                }
            }
        };
    }

    private Intent getIntent() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        //intent.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS, 30000);
        //intent.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS,new Long(10000));
        //intent.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS, 30000);

        //intent.putExtra(RecognizerIntent.EXTRA_SECURE, 30000);
        intent.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE,"MySpeechModule");
        intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS,5);
        intent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true );
        return intent;
    }

    private Runnable getStartSpeechTask(final Context context, final SpListener listener) {
        return new Runnable() {
            @Override
            public void run() {
                MySpeechModule.this.sr = SpeechRecognizer.createSpeechRecognizer( context );
                listener.setRecognizer( sr );
                sr.setRecognitionListener( listener );
                //}
                sr.startListening( getIntent() );
                Log.d( TAG, "Done listening!" );
            }
        };
    }

    class SpListener implements RecognitionListener {

        private final Callback callback;
        private SpeechRecognizer recognizer;

        private SpListener(Context context, Callback callback, Handler mainHandler, Handler original) {
            this.callback = callback;
        }

        public void onReadyForSpeech(Bundle params)
        {
            Log.d(TAG, "onReadyForSpeech");
        }
        public void onBeginningOfSpeech()
        {
            Log.d(TAG, "onBeginningOfSpeech");
        }
        public void onRmsChanged(float rmsdB)
        {
            //Log.d(TAG, "onRmsChanged");
        }
        public void onBufferReceived(byte[] buffer)
        {
            Log.d(TAG, "onBufferReceived");

        }
        public void onEndOfSpeech()

        {

            Log.d(TAG, "onEndofSpeech");
            //callback.invoke("endOfSpeech");
        }
        public void onError(int error)
        {
            Log.d(TAG,  "error " +  error);
            //final String errorthrown = "speechisended";
            callback.invoke("error" + error);

        }
        public void onResults(Bundle results)
        {
            String str = new String();
            ArrayList data = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
            for (int i = 0; i < data.size(); i++)
            {
               // Log.d(TAG, "result " + data.get(i));
                str += data.get(i);
            }
            final String userInput = (String) data.get(0);

            Log.d(TAG, "user input from java = " + userInput);
            if (userInput != null) {
                callback.invoke(userInput.toString());
            }
            Log.d(TAG, "onResults = " + results);

        }
        public void onPartialResults(Bundle partialResults)
        {
            //Log.d(TAG, "onPartialResults" +partialResults);
            String str = new String();
            ArrayList data = partialResults.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
            for (int i = 0; i < data.size(); i++)
            {
                Log.d(TAG, "partialresult " + data.get(i));
                str += data.get(i);
            }
        }
        public void onEvent(int eventType, Bundle params)
        {
            Log.d(TAG, "onEvent " + eventType);
        }

        public SpeechRecognizer getRecognizer() {
            return recognizer;
        }

        public void setRecognizer(SpeechRecognizer recognizer) {
            this.recognizer = recognizer;
        }
    }
}
