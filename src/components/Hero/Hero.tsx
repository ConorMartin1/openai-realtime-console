import React from 'react';
import { Typography, Image } from 'antd';

const { Title, Text } = Typography;

interface HeroSectionProps {
  title: string;
  description: string;
  backgroundColor?: string;
  imageSrc: string;
  imageAlt?: string;
  titleColor?: string;
  descriptionColor?: string;
  paddingTop?: string | number;
  paddingBottom?: string | number;
  imageSize?: number;
  maxWidth?: number | string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  backgroundColor = '#f0efea',
  imageSrc,
  imageAlt = 'Hero Image',
  titleColor = '#000000',
  descriptionColor = '#000000',
  paddingTop = '140px',
  paddingBottom = '100px',
  imageSize = 120,
  maxWidth = '600px',
}) => {
  // Function to split text by newlines and create JSX with line breaks
  const renderTextWithBreaks = (text: string) => {
    return text.split('\\n').map((line, index, array) => (
      <React.Fragment key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${paddingTop} 20px ${paddingBottom}`,
        textAlign: 'center',
        backgroundColor
      }}
    >
      <div style={{ maxWidth }}>
        <Image
          alt={imageAlt}
          src={imageSrc}
          preview={false}
          style={{
            objectFit: 'cover',
            cursor: 'pointer',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            width: `${imageSize}px`,
            height: `${imageSize}px`,
            borderRadius: '50%',
            transition: 'transform 0.2s',
            marginBottom: '1rem'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />

        <Title
          level={1}
          style={{
            fontSize: '48px',
            fontWeight: 600,
            marginBottom: '16px',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: titleColor
          }}
        >
          {renderTextWithBreaks(title)}
        </Title>

        <Text
          style={{
            fontSize: '20px',
            color: descriptionColor,
            fontWeight: 400,
            marginTop: '8px',
            whiteSpace: 'pre-line'
          }}
        >
          {renderTextWithBreaks(description)}
        </Text>
      </div>
    </div>
  );
};

export default HeroSection;