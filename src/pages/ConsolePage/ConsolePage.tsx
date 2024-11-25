import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RealtimeClient } from '@openai/realtime-api-beta';
import { ItemType } from '@openai/realtime-api-beta/dist/lib/client.js';
import { WavRecorder, WavStreamPlayer } from '../../lib/wavtools/index.js';
import RecordingCircle from '../../components/RecordingCircle/RecordingCircle';
import AudioVisualizer from '../../components/AudioVisualizer/AudioVisualizer';
import { defaultInstructions } from '../../components/CoachInstructions/defaultInstructions';
import { useNavigate } from 'react-router-dom';
import Banner from '../../components/Banner/Banner';
import { MessageCircle, User } from 'lucide-react';
import SparkAvatar from '../../assets/AvatarStill.png';
import './ConsolePage.scss';

const LOCAL_RELAY_SERVER_URL: string = process.env.REACT_APP_LOCAL_RELAY_SERVER_URL || '';

interface RealtimeEvent {
  time: string;
  source: 'client' | 'server';
  count?: number;
  event: { [key: string]: any };
}

const ConsolePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Get API Key
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
    setIsRecording(false);
    setItems([]);

    const client = clientRef.current;
    client.disconnect();

    const wavRecorder = wavRecorderRef.current;
    await wavRecorder.end();

    const wavStreamPlayer = wavStreamPlayerRef.current;
    await wavStreamPlayer.interrupt();
  }, []);

  // Toggle recording handler
  const handleToggleRecording = useCallback(async () => {
    if (!isConnected) return;

    if (!isRecording) {
      // Start recording
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
    } else {
      // Stop recording
      setIsRecording(false);
      const client = clientRef.current;
      const wavRecorder = wavRecorderRef.current;
      await wavRecorder.pause();
      client.createResponse();
    }
  }, [isConnected, isRecording]);

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
      <Banner />

      <div className="flex flex-col h-[calc(100vh-64px)]"> {/* Subtract banner height */}
        {/* Main Content - Recording Interface */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col items-center">
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900">Chat with Spark</h1>
                <p className="mt-2 text-gray-600">Practice your presentation and get feedback in real-time</p>
              </div>

              <RecordingCircle
                isRecording={isRecording}
                isConnected={isConnected}
                onToggleRecording={handleToggleRecording}
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

              {/* Review Button */}
              {isConnected && items.length > 0 && !isRecording && (
                <button
                  onClick={goToReviewPage}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  View Results & Transcript
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Fixed Transcript Section */}
        {isConnected && (
          <div className="flex-none border-t border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto w-full">
              <div className="border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 p-4">Transcript</h2>
              </div>
              
              <div className="h-64 overflow-y-auto p-4 space-y-4">
                {items
                  .filter(item =>
                    !item.formatted?.text?.includes('You are an AI Speech Coach')
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg ${
                        item.role === 'assistant' ? 'bg-white' : 'bg-indigo-50'
                      }`}
                    >
                      {/* Avatar/User Icon */}
                      {item.role === 'assistant' ? (
                        <img
                          src={SparkAvatar}
                          alt="Spark"
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-indigo-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <span className="font-medium">
                          {item.role === 'user' ? 'You: ' : 'Spark: '}
                        </span>
                        {item.formatted.transcript || item.formatted.text || 'Processing...'}
                      </div>
                    </div>
                  ))}
                {items.length === 0 && (
                  <div className="text-gray-500 text-center">
                    Start the conversation to begin
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsolePage;