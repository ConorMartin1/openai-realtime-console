// components/BentoGrid/BentoGrid.tsx
import React from 'react';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-12 gap-8 ${className}`}>
      {children}
    </div>
  );
};