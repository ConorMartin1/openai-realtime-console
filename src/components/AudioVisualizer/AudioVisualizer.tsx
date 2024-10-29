import React from 'react';

interface AudioVisualizerProps {
  audioData: number[];
  isRecording: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioData, isRecording }) => {
  return (
    <div className="w-full max-w-2xl h-32 relative">
      <svg 
        width="100%" 
        height="100%" 
        className="transform"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
      >
        {/* Create gradient definition */}
        <defs>
          <linearGradient id="waveformGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#4338ca' }} />
            <stop offset="100%" style={{ stopColor: '#ec4899' }} />
          </linearGradient>
        </defs>

        {/* Render audio bars */}
        {audioData.map((value, index) => (
          <rect
            key={index}
            x={`${(index / audioData.length) * 100}%`}
            y={`${50 - (value / 2)}%`}
            width={`${90 / audioData.length}%`}
            height={`${value}%`}
            rx="1"
            ry="1"
            fill="url(#waveformGradient)"
            className={`transform transition-all duration-100 ${
              isRecording ? 'opacity-100' : 'opacity-50'
            }`}
          />
        ))}
      </svg>
    </div>
  );
};

export default AudioVisualizer;