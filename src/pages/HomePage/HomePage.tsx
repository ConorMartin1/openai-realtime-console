import { Card, Col, Image, Row, Typography } from "antd";
import React from "react";
import avatar from '../../assets/AvatarStill.png';
import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import Banner2 from "../../components/Banner2/banner2";

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate('/console');
  };

  return (
    <div className="w-full flex flex-col items-center bg-white">
      <Banner2/>
      <div className="w-full flex justify-center mt-24">
        <Image
          alt="Centered Image"
          src={avatar}
          preview={false}
          onClick={handleAvatarClick}
          className="w-[30%] max-w-[160px] aspect-square rounded-full hover:scale-105 transition-transform"
          style={{ 
            objectFit: 'cover',
            cursor: 'pointer',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            width: '160px',
            height: '160px'
          }}
        />
      </div>

      <Title 
        level={2} 
        className="mt-5 text-center"
        style={{ color: '#333' }}
      >
        Click the Avatar to Begin
      </Title>

      <div className="w-[70%] mt-10">
        <Title 
          level={2} 
          className="text-center"
          style={{ color: '#333' }}
        >
          How It Works
        </Title>
        <Row gutter={[16, 16]} className="flex justify-around">
          <Col 
            xs={24} 
            sm={12} 
            md={8} 
            className="flex justify-center"
          >
            <Card 
              className="w-full text-center"
              style={{ backgroundColor: '#c0d8e0' }}
            >
              <Title 
                level={5} 
                style={{ color: '#000000' }}
              >
                Upload Your Content
              </Title>
              <Paragraph 
                style={{ color: '#555' }}
              >
                Start by uploading your content directly to the platform
              </Paragraph>
            </Card>
          </Col>

          <Col 
            xs={24} 
            sm={12} 
            md={8} 
            className="flex justify-center"
          >
            <Card 
              className="w-full text-center"
              style={{ backgroundColor: '#c0d8e0' }}
            >
              <Title 
                level={5} 
                style={{ color: '#000000' }}
              >
                Train Your Avatar
              </Title>
              <Paragraph 
                style={{ color: '#555' }}
              >
                Your avatar learns from your content and matches your style
              </Paragraph>
            </Card>
          </Col>

          <Col 
            xs={24} 
            sm={12} 
            md={8} 
            className="flex justify-center"
          >
            <Card 
              className="w-full text-center"
              style={{ backgroundColor: '#c0d8e0' }}
            >
              <Title 
                level={5} 
                style={{ color: '#000000' }}
              >
                Start Chatting
              </Title>
              <Paragraph 
                style={{ color: '#555' }}
              >
                Begin interacting with your personalised AI avatar
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;