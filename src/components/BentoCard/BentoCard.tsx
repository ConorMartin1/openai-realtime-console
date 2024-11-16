// components/BentoCard/BentoCard.tsx
import React from 'react';
import { CardProps, CardWidth } from '../../types/card';
import { FeaturedNewsProps } from '../CardContents/TemplateCard';

const widthClasses: Record<CardWidth, string> = {
  full: 'col-span-12',
  half: 'col-span-6',
  third: 'col-span-4',
  'two-thirds': 'col-span-8'
};

const heightClasses = {
  default: 'h-72',  // 18rem = 288px
  tall: 'h-96'      // 24rem = 384px
};

export const BentoCard: React.FC<CardProps> = ({ 
  children, 
  width = 'half',
  height = 'default',
  bgColor = 'white',
  className = ''
}) => {
  // Clone the child element with proper typing
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement<FeaturedNewsProps>(child)) {
      return React.cloneElement(child, {
        ...child.props,
        bgColor
      });
    }
    return child;
  });

  return (
    <div 
      className={`
        ${widthClasses[width]}
        ${heightClasses[height]}
        rounded-3xl
        overflow-hidden
        flex
        flex-col
        ${className}
      `}
    >
      {childrenWithProps}
    </div>
  );
};