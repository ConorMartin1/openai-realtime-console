import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RealtimeClient } from '@openai/realtime-api-beta';
import { ItemType } from '@openai/realtime-api-beta/dist/lib/client.js';
import { WavRecorder, WavStreamPlayer } from '../../lib/wavtools/index.js';
import RecordingCircle from '../../components/RecordingCircle/RecordingCircle';
import AudioVisualizer from '../../components/AudioVisualizer/AudioVisualizer';
import {defaultInstructions} from '../../components/CoachInstructions/defaultInstructions';
import { useNavigate } from 'react-router-dom';

const LOCAL_RELAY_SERVER_URL: string = process.env.REACT_APP_LOCAL_RELAY_SERVER_URL || '';

interface RealtimeEvent {
  time: string;
  source: 'client' | 'server';
  count?: number;
  event: { [key: string]: any };
}

const ConsolePage: React.FC = () => {
  // Get API Key
  const navigate = useNavigate();
  const apiKey = LOCAL_RELAY_SERVER_URL
    ? ''
    : localStorage.getItem('tmp::voice_api_key') ||
      prompt('OpenAI API Key') ||
      '';
  if (apiKey !== '') {
    localStorage.setItem('tmp::voice_api_key', apiKey);
  }

  // State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [items, setItems] = useState<ItemType[]>([]);
  const [audioData, setAudioData] = useState<number[]>(Array(50).fill(0));

  // Refs
  const wavRecorderRef = useRef<WavRecorder>(
    new WavRecorder({ sampleRate: 24000 })
  );
  const wavStreamPlayerRef = useRef<WavStreamPlayer>(
    new WavStreamPlayer({ sampleRate: 24000 })
  );
  const clientRef = useRef<RealtimeClient>(
    new RealtimeClient(
      LOCAL_RELAY_SERVER_URL
        ? { url: LOCAL_RELAY_SERVER_URL }
        : {
            apiKey: apiKey,
            dangerouslyAllowAPIKeyInBrowser: true,
          }
    )
  );

  // Audio visualization effect
  useEffect(() => {
    let animationFrameId: number;
    
    const updateAudioData = () => {
      if (isRecording) {
        const frequencies = wavRecorderRef.current.getFrequencies('voice');
        if (frequencies?.values) {
          const normalizedData = Array.from(frequencies.values)
            .slice(0, 50)
            .map(value => (value * 100));
          setAudioData(normalizedData);
        }
        animationFrameId = requestAnimationFrame(updateAudioData);
      }
    };

    if (isRecording) {
      animationFrameId = requestAnimationFrame(updateAudioData);
    } else {
      setAudioData(Array(50).fill(0));
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRecording]);

  // Connect handler
  const handleConnect = useCallback(async () => {
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;

    setIsConnected(true);
    setItems(client.conversation.getItems());

    await wavRecorder.begin();
    await wavStreamPlayer.connect();
    await client.connect();
    client.sendUserMessageContent([
      {
        type: `input_text`,
        text: defaultInstructions
      },
    ]);

    client.updateSession({ input_audio_transcription: { model: 'whisper-1' } });
  }, []);

  // Disconnect handler
  const handleDisconnect = useCallback(async () => {
    setIsConnected(false);
    setItems([]);

    const client = clientRef.current;
    client.disconnect();

    const wavRecorder = wavRecorderRef.current;
    await wavRecorder.end();

    const wavStreamPlayer = wavStreamPlayerRef.current;
    await wavStreamPlayer.interrupt();
  }, []);

  // Recording handlers
  const handleStartRecording = useCallback(async () => {
    if (!isConnected) return;
    
    setIsRecording(true);
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;
    
    const trackSampleOffset = await wavStreamPlayer.interrupt();
    if (trackSampleOffset?.trackId) {
      const { trackId, offset } = trackSampleOffset;
      await client.cancelResponse(trackId, offset);
    }
    await wavRecorder.record((data) => client.appendInputAudio(data.mono));
  }, [isConnected]);

  const handleStopRecording = useCallback(async () => {
    setIsRecording(false);
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    await wavRecorder.pause();
    client.createResponse();
  }, []);

  // Setup effect
  useEffect(() => {
    const client = clientRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;

    client.on('conversation.updated', async ({ item, delta }: any) => {
      const items = client.conversation.getItems();
      if (delta?.audio) {
        wavStreamPlayer.add16BitPCM(delta.audio, item.id);
      }
      setItems(items);
    });

    return () => {
      client.reset();
    };
  }, []);

  const goToReviewPage = () => {
    navigate('/review', { state: { items } });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b">
      <button onClick={goToReviewPage} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">
        Go to Review Page
      </button>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="ml-4 text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                SpeechCraft
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">AI Speech Coach</h1>
          <p className="mt-2 text-gray-600">Practice your presentation with real-time AI feedback</p>
        </div>

        <RecordingCircle
          isRecording={isRecording}
          isConnected={isConnected}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />

        {/* Audio Visualizer */}
        <div className="mt-8 w-full max-w-2xl">
          <AudioVisualizer 
            audioData={audioData}
            isRecording={isRecording}
          />
        </div>

        {/* Transcript Area */}
        {isConnected && (
          <div className="mt-12 w-full max-w-2xl bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Transcript</h2>
            <div className="space-y-4">
              {items
                .filter(item => 
                  !item.formatted?.text || ''.includes('You are an AI Speech Coach')
                )
                .map((item, index) => (
                  <div key={index} className="text-gray-600">
                    <span className="font-medium">
                      {item.role === 'user' ? 'You: ' : 'Assistant: '}
                    </span>
                    {item.formatted.transcript || item.formatted.text || 'Processing...'}
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="text-gray-500">
                    Press and hold the button to start recording
                  </div>
                )
              }
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ConsolePage;