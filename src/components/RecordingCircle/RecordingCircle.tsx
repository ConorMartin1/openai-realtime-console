import React, { useState } from 'react';
import { Mic, Square, Loader2, MessageSquareMoreIcon } from 'lucide-react';
import astronautStill from '../../assets/AvatarStill.png';
import astronaut from '../../assets/Avatargif.gif';

interface RecordingCircleProps {
  isRecording: boolean;
  isConnected: boolean;
  onToggleRecording: () => void;  // Changed from separate start/stop handlers
  onConnect: () => void;
  onDisconnect: () => void;
}

const RecordingCircle: React.FC<RecordingCircleProps> = ({
  isRecording,
  isConnected,
  onToggleRecording,
  onConnect,
  onDisconnect
}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main Circle */}
      <button
        onClick={onToggleRecording}  // Changed from mouseDown/mouseUp to onClick
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
      </button>

      {/* Connect/Disconnect Button */}
      <button
        onClick={isConnected ? onDisconnect : onConnect}
        className={`
          px-6 py-3 rounded-full
          flex items-center gap-2
          transition-all duration-300
          text-base font-medium
          ${isConnected 
            ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }
        `}
      >
        {isConnected ? (
          <>
            <MessageSquareMoreIcon className="w-5 h-5" />
            Disconnect
          </>
        ) : (
          <>
            <MessageSquareMoreIcon className="w-5 h-5" />
            Start the conversation
          </>
        )}
      </button>

      {/* Status Text */}
      <div className="text-sm font-medium text-gray-500">
        {!isConnected && 'Not connected'}
        {isConnected && !isRecording && 'Click to start recording'}
        {isConnected && isRecording && 'Click to stop recording'}
      </div>
    </div>
  );
};

export default RecordingCircle;