import {
  AudioOutlined,
  BulbOutlined,
  FileTextOutlined,
  LaptopOutlined,
  SettingOutlined,
  TeamOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Dropdown, Card, Col, Row, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React from "react";
import './TemplatesPage.scss';
import '../../utils/styling.scss';
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import cardImage from '../../assets/cardImage.webp';
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const templates = [
  { title: "PRESENTATION", icon: <FileTextOutlined />, image: "image-8.png" },
  { title: "INTERVIEW", icon: <TeamOutlined />, image: "image-8-2.png" },
  { title: "DEBATE", icon: <VideoCameraOutlined />, image: "image-8-4.png" },
  { title: "ELEVATOR PITCH", icon: <AudioOutlined />, image: "image.png" },
  {
    title: "CONFERENCE TALK",
    icon: <LaptopOutlined />,
    image: "image-8-3.png",
  },
  { title: "TV INTERVIEW", icon: <BulbOutlined />, image: "image-8-5.png" },
  {
    title: "CREATE YOUR OWN...",
    icon: <SettingOutlined />,
    image: "dials-settings-icon-973x1024-1xyc25af-1.png",
  },
];

const Templates: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/console');
  };
  return (
    <div className="templates-container">
      <div className="banner templateBanner">
        <Title level={1} className="bannerTitle">SpeechCraft</Title>
        <Dropdown overlay={<DropdownMenu />}>
        <a className="ant-dropdown-link dropdownLink" href="#">
            Pages <DownOutlined />
          </a>
        </Dropdown>

      </div>
      <div className="templates-inner">
        <Row justify="center" className="templates-quick-start">
          <Col>
            <Text className="templates-quick-start-text">
              Quick start
              <br />
              Help me prepare for a...
            </Text>
          </Col>
        </Row>

        <Row gutter={[16, 16]} justify="center" className="templates-cards">
          {templates.slice(0, 6).map((template, index) => (
            <Col key={index} span={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={template.title}
                    src={cardImage}
                    className="templates-card-image"
                    onClick={handleCardClick}
                  />
                }
              >
                <Card.Meta
                  title={template.title}
                  style={{ textAlign: "center" }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Row justify="center" className="templates-custom-card">
          <Col span={6}>
            <Card
              hoverable
              cover={
                <img
                  alt="Create your own"
                  src={cardImage}
                  className="templates-custom-image"
                />
              }
            >
              <Card.Meta
                title="CREATE YOUR OWN..."
                style={{ textAlign: "center" }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Templates;
