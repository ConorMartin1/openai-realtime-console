import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Card, Layout, Row, Col, Space, Image, Spin } from "antd";
import avatar from '../../assets/AvatarYellow.png';
import Banner2 from "../../components/Banner2/banner2";
import { CheckCircleOutlined, WarningOutlined, CloseCircleOutlined } from '@ant-design/icons';
import FeedbackCard from "../../components/FeedbackCard/FeedbackCard";
import Footer from "../../components/Footer/Footer";

const ReviewPage: React.FC = () => {
  const location = useLocation();
  const { items } = location.state || {};
  const lastItem = items && items.length > 0 ? items[items.length - 1] : null;
  const lastItemTranscript = lastItem?.formatted?.transcript || "";
  console.log(lastItemTranscript);
  const hasFetched = useRef(false);

  const { Title, Text } = Typography;
  const { Content } = Layout;

  const [feedback, setFeedback] = useState<{
    summary?: string;
    score?: string;
    breakdown?: { [key: string]: string };
  }>({});
  const [loading, setLoading] = useState(true);

  const callOpenAI = async () => {
    const apiKey = localStorage.getItem("tmp::voice_api_key");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "Your job is to format the feedback of an AI Speech Coach. The coach has generated detailed feedback and finished it with a score. The user will provide that feedback in their message. Your response must ONLY be a JSON which contains a summary feedback paragraph and a breakdown of the key areas of the feedback with values on how the student did (Good, Great, Could be better: Following by a short paragraph explaining this further with constructive feedback). Label this part as 'breakdown' Include the score, labelled 'score'",
            },
            { role: "user", content: lastItemTranscript },
          ],
        }),
      });

      const data = await res.json();

      if (data.choices && data.choices.length > 0) {
        const rawContent = data.choices[0].message.content;
        const jsonContent = rawContent.replace(/^```json\s*|```$/g, "");
        const content = JSON.parse(jsonContent);
        console.log('This is the json returned');
        console.log(content);

        setFeedback(content);
      } else {
        console.error("No response from API");
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      callOpenAI();
      hasFetched.current = true;
    }
  }, []);

  const { summary, breakdown, score } = feedback;

  return (
    <Layout style={{ background: "#ffffff", minHeight: "100vh" }}>
      <Content>
        <Banner2 />
        {/* Feedback Summary Section */}
        <section
          style={{
            borderBottom: "1px solid #eaeaea",
            padding: "120px 24px 96px 24px",
            background: "#f0efea",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
            <Space direction="horizontal" size={16} style={{ width: "100%", alignItems: "center" }}>
              <div style={{ flex: "0 0 auto" }}>
                <Image
                  alt="Centered Image"
                  src={avatar}
                  preview={false}
                  style={{
                    objectFit: "cover",
                    cursor: "pointer",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    width: "250px",
                    height: "250px",
                    borderRadius: "50%",
                    transition: "transform 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
              <div style={{ flex: "1", maxWidth: "700px", marginLeft: "10%" }}>
                <Title level={1} style={{ fontSize: 48, marginBottom: 24 }}>
                  Feedback Summary
                </Title>
                {loading ? (
                  <Spin size="large" />
                ) : (
                  <>
                    <Text style={{ fontSize: 18, color: "#666" }}>Score: {score}</Text>
                    <br />
                    <Text style={{ fontSize: 16, color: "#333" }}>{summary}</Text>
                  </>
                )}
              </div>
            </Space>
          </div>
        </section>

        {/* Breakdown Cards Section */}
        <div style={{ maxWidth: 1200, margin: "48px auto", textAlign: "center" }}>
          <Title
            level={3}
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "16px",
            }}
          >
            Detailed Breakdown
          </Title>
          <Row gutter={[24, 24]} justify="center">
            {loading ? (
              <div style={{ textAlign: "center", width: "100%" }}>
                <Spin size="large" />
              </div>
            ) : (
              breakdown &&
              Object.entries(breakdown).map(([key, value], index) => (
                <Col xs={24} sm={12} md={8} lg={8} key={index} style={{ display: "flex" }}>
                  <FeedbackCard title={key} value={value} />
                </Col>
              ))
            )}
          </Row>
        </div>
        <Footer />
      </Content>
    </Layout>
  );
};

export default ReviewPage;
