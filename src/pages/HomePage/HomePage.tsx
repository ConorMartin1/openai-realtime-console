import { Card, Col, Image, Row, Typography } from "antd";
import React from "react";
import './HomePage.scss';
import avatar from '../../assets/AvatarStill.png';
import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import '../../utils/styling.scss';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate('/console');
  };

  return (
    <div className="homeContainer">
      <Banner/>
      <div className="centeredImage">
        <Image
          className="profileImage"
          alt="Centered Image"
          src={avatar}
          preview={false}
          onClick={handleAvatarClick}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <Title level={2} className="centeredHeader">Click the Avatar to Begin</Title>

      <div className="cardsSection">
        <Title level={2} className="centeredHeader">How It Works</Title>
        <Row gutter={[16, 16]} className="cardsRow">
          {[...Array(3)].map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8} className="cardCol">
              <Card className="card">
                <Title level={5} className="cardTitle">
                  How it works
                </Title>
                <Paragraph className="cardParagraph">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
