import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RealtimeClient } from '@openai/realtime-api-beta';
import { ItemType } from '@openai/realtime-api-beta/dist/lib/client.js';
import { WavRecorder, WavStreamPlayer } from '../lib/wavtools/index.js';
import RecordingCircle from '../components/RecordingCircle/RecordingCircle';
import AudioVisualizer from '../components/AudioVisualizer/AudioVisualizer';

const LOCAL_RELAY_SERVER_URL: string = process.env.REACT_APP_LOCAL_RELAY_SERVER_URL || '';

interface RealtimeEvent {
  time: string;
  source: 'client' | 'server';
  count?: number;
  event: { [key: string]: any };
}

const ConsolePage: React.FC = () => {
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
        text: `Hello! I want you to help me prepare for a presentation. Here are more details about me and the presentation in JSON format for more context:
        
        {
          "presentationContext": {
            "audience": {
              "type": {
                "primary": "secondary school students",
                "specificRole": "GCSE/A-Level Computer Science students",
                "experienceLevel": "beginner to intermediate",
                "technicalBackground": "varied"
              },
              "demographics": {
                "ageRange": {
                  "min": 14,
                  "max": 18
                },
                "size": 30,
                "location": "school computer lab",
                "expectedKnowledgeLevel": "basic understanding of technology and social media, varied programming experience"
              }
            },
            "presentation": {
              "format": "seminar",
              "style": "informative with demonstrations",
              "interactivityLevel": "low-medium",
              "formalityLevel": "casual but educational",
              "presentationTools": [
                "slides with videos",
                "AI demos using ChatGPT",
              ]
            },
            "timeConstraints": {
              "totalDuration": {
                "minutes": 10,
                "seconds": 0
              },
              "segments": [
                {
                  "name": "introduction to AI",
                  "duration": 2
                },
                {
                  "name": "AI in daily life",
                  "duration": 5
                },
                {
                  "name": "Where AI is headed",
                  "duration": 2
                },
                {
                  "name": "Questions",
                  "duration": 1
                }
              ]
            },
            "topic": {
              "mainSubject": "Artificial Intelligence",
              "specificFocus": "AI in Everyday Life",
              "difficulty": "beginner-friendly",
              "prerequisites": [
                "basic computer usage",
                "familiarity with social media",
                "interest in technology"
              ],
              "learningObjectives": [
                "understand what AI is and how it works in simple terms",
                "identify AI in daily applications (social media, gaming, smart devices)",
                "explore ethical considerations of AI use",
                "learn basic interaction with AI tools like ChatGPT",
                "understand potential career paths in AI and technology"
              ]
            }
          },
          "marking-criteria": {
            "speech": "assess enunciation",
            "repetition": "repetitive use of words such as like and um should be avoided',
            "volume": "a monotone voice should be avoided",
            "appropriate": "avoid use of inappropriate language",
            "humour": "jokes should be rewarded"
          }
          "metadata": {
            "version": "1.0",
            "lastUpdated": "2024-10-23",
            "configurationId": "UK-SEC-AI-INTRO-001",
            "templateType": "secondary-education",
            "curriculum": "UK-aligned",
            "relevantSubjects": [
              "Computer Science",
              "ICT",
              "General Studies",
              "Technology"
            ]
          }
        }
        We are currently testing, so presentations provided will be less than 1 minute however assume they are the appropriate length.
        Be prepared to give me feedback on my presentation style and to suggest ways I can improve.
        `,
        // text: `For testing purposes, I want you to list ten car brands. Number each item, e.g. "one (or whatever number you are one): the item name".`
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

  // File upload handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log('Selected file:', file);
      addPdfReference(file);
    }
  };

  function addPdfReference(file: File){
    // ...
  }


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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b">
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

      {/* File Upload Button */}
      <div onClick={() => {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
      }}>Upload your content</div>
      <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileUpload} />

        {/* Transcript Area */}
        {isConnected && (
          <div className="mt-12 w-full max-w-2xl bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Transcript</h2>
            <div className="space-y-4">
              {items.map((item, index) => (
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
          )}
            </div>
        </div>
      )}
      </main>
    </div>
  );
};

export default ConsolePage;