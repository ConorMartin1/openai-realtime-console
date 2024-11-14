import React, { useState } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import avatar from '../../assets/AvatarActive2.gif';
import avatarStill from '../../assets/Avatar1Still.png';
import avatarStill2 from '../../assets/avatarframe1.gif';
import astronautStill from '../../assets/AvatarStill.png';
import astronaut from '../../assets/Avatargif.gif';

interface RecordingCircleProps {
  isRecording: boolean;
  isConnected: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

const RecordingCircle: React.FC<RecordingCircleProps> = ({
  isRecording,
  isConnected,
  onStartRecording,
  onStopRecording,
  onConnect,
  onDisconnect
}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main Circle */}
      <button
        onMouseDown={onStartRecording}
        onMouseUp={onStopRecording}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        disabled={!isConnected}
        className={`
          relative
          w-48 h-48
          rounded-full
          flex items-center justify-center
          transition-all duration-300
          ${isConnected ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
          ${isRecording 
            ? 'bg-white hover:white border border-indigo-600' 
            : 'bg-indigo-600 hover:bg-indigo-700'
          }
        `}
      >
        <img 
        src={isRecording ? astronaut : astronautStill} 
        alt="Recording indicator"
        className={`
          w-full h-full
    object-cover
    rounded-full
        `}
    />
        {/* Pulsing ring when recording */}
        {isRecording && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 rounded-full border-4 border-red-500/50 animate-ping" />
          </div>
        )}
        
        {/* Hover ring */}
        {isHovering && !isRecording && isConnected && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-400/30" />
          </div>
        )}

        {/* Icon */}
        {/* <div className="text-white">
          {isRecording ? (
            <Square className="w-12 h-12" />
          ) : (
            <Mic className="w-12 h-12" />
          )}
        </div> */}
      </button>

      {/* Connect/Disconnect Button */}
      <button
        onClick={isConnected ? onDisconnect : onConnect}
        className={`
          px-6 py-2 rounded-full
          flex items-center gap-2
          transition-all duration-300
          ${isConnected 
            ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }
        `}
      >
        {isConnected ? (
          'Disconnect'
        ) : (
          <>
            Connect
            <Loader2 className="w-4 h-4 animate-spin" />
          </>
        )}
      </button>

      {/* Status Text */}
      <div className="text-sm font-medium text-gray-500">
        {!isConnected && 'Not connected'}
        {isConnected && !isRecording && 'Ready to record'}
        {isConnected && isRecording && 'I\'m listening...'}
      </div>
    </div>
  );
};

export default RecordingCircle;