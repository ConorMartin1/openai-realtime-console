import {
    AudioOutlined,
    BulbOutlined,
    FileTextOutlined,
    LaptopOutlined,
    SettingOutlined,
    TeamOutlined,
    VideoCameraOutlined,
  } from "@ant-design/icons";
  import { Card, Col, Row, Typography } from "antd";
  import React from "react";
  
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
  
  const Templates = (): JSX.Element => {
    return (
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "1280px",
            height: "1232px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "1280px",
              height: "190px",
              backgroundColor: "#001529",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <Title
              style={{ color: "white", textAlign: "center", marginTop: "39px" }}
            >
              SpeechCraft
            </Title>
          </div>
  
          <Row justify="center" style={{ marginTop: "72px" }}>
            <Col>
              <Text style={{ fontSize: "24px", textAlign: "center" }}>
                Quick start
                <br />
                Help me prepare for a...
              </Text>
            </Col>
          </Row>
  
          <Row gutter={[16, 16]} justify="center" style={{ marginTop: "100px" }}>
            {templates.slice(0, 6).map((template, index) => (
              <Col key={index} span={6}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={template.title}
                      src={template.image}
                      style={{ height: "126px", objectFit: "cover" }}
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
  
          <Row justify="center" style={{ marginTop: "100px" }}>
            <Col span={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt="Create your own"
                    src="dials-settings-icon-973x1024-1xyc25af-1.png"
                    style={{ height: "99px", objectFit: "cover" }}
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
  