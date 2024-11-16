import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface FeaturedNewsProps {
  icon: React.ReactNode;
  title: string;
  textColor?: string;
  bgColor?: string;
}

export const TemplateCard: React.FC<FeaturedNewsProps> = ({ 
  icon, 
  title,
  textColor = 'black',
  bgColor = 'white'
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/settings2');
  };

  return (
    <div 
      onClick={handleClick}
      className="h-full flex flex-col cursor-pointer hover:opacity-90 transition-opacity rounded-lg overflow-hidden"
    >
      <div 
        className="flex-grow p-8 flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex justify-center w-full">
          {React.cloneElement(icon as React.ReactElement, { size: 96 })}
        </div>
      </div>
      <div className="bg-white px-8 py-10">
        <p className={`text-sm text-${textColor} mb-2`}>Template</p>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black line-clamp-2">
            {title}
          </h2>
          <ArrowRight className="w-7 h-7 text-gray-600" />
        </div>
      </div>
    </div>
  );
};