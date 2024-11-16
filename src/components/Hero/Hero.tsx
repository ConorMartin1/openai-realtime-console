import React from 'react';
import { Typography, Image } from 'antd';
import avatar from '../../assets/AvatarStill.png';

const { Title, Text } = Typography;

const HeroSection = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '140px 20px 100px',
        textAlign: 'center',
        backgroundColor: '#f0efea'
      }}
    >
      <div style={{ maxWidth: '600px' }}>
        <Image
          alt="Centered Image"
          src={avatar}
          preview={false}
          style={{
            objectFit: 'cover',
            cursor: 'pointer',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            width: '120px',
            height: '120px',
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
            color: '#000000'
          }}
        >
          Customise your AI coach
        </Title>

        <Text
          style={{
            fontSize: '20px',
            color: '#000000',
            fontWeight: 400,
            marginTop: '8px'
          }}
        >
          Adjust the coach settings and make it
          <br />
          more specific for your presentation
        </Text>
      </div>
    </div>
  );
};

export default HeroSection;