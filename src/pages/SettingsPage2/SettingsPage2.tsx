import React from 'react';
import {
  Layout,
  Typography,
  Form,
  Select,
  Card,
  Input,
  Button,
  Space,
  Divider
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  FundProjectionScreenOutlined,
  SettingOutlined,
  AudioOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Banner2 from "../../components/Banner2/banner2";
import HeroSection from '../../components/Hero/Hero';
import Footer from '../../components/Footer/Footer'

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const SettingsPage2 = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/console');
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Banner2 />
      <HeroSection />
      <Content className="p-8">
        <div className="max-w-4xl mx-auto">

          {/* About your background */}
          <Space className="mt-12 mb-6" align="center">
            <UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={2} style={{ margin: 0 }}>About your background</Title>
          </Space>

          <Form
            form={form}
            layout="vertical"
            size="large"
            initialValues={{ remember: true }}
          >
            {/* Presenter Context Section */}
            <Card
              className="mb-6"
            >
              <Form.Item
                name="role"
                label="Role"
                tooltip="Your current professional role helps tailor feedback to your context"
              >
                <Select placeholder="Select your role">
                  <Option value="student">Student</Option>
                  <Option value="employee">Employee</Option>
                  <Option value="executive">Executive</Option>
                  <Option value="conference-speaker">Conference Speaker</Option>
                  <Option value="teacher">Teacher/Professor</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="presentationType"
                label="Presentation Type"
                tooltip="Different types of presentations require different approaches"
              >
                <Select placeholder="Select presentation type">
                  <Option value="presentation">General Presentation</Option>
                  <Option value="board-meeting">Board Meeting</Option>
                  <Option value="conference">Conference Talk</Option>
                  <Option value="job-interview">Job Interview</Option>
                  <Option value="sales-pitch">Sales Pitch</Option>
                  <Option value="teaching">Teaching Session</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="experienceLevel"
                label="Experience Level"
                tooltip="This helps adjust the complexity of feedback"
              >
                <Select placeholder="Select your experience level">
                  <Option value="beginner">Beginner</Option>
                  <Option value="intermediate">Intermediate</Option>
                  <Option value="advanced">Advanced</Option>
                  <Option value="expert">Expert</Option>
                </Select>
              </Form.Item>
            </Card>

            {/* About your audience */}
            <Space className="mt-12 mb-6" align="center">
              <TeamOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <Title level={2} style={{ margin: 0 }}>Details about your audience</Title>
            </Space>

            <Card
              className="mb-6"
            >
              <Form.Item
                name="audienceType"
                label="Audience Type"
                tooltip="Different audiences require different communication styles"
              >
                <Select placeholder="Select audience type">
                  <Option value="school-students">School Students</Option>
                  <Option value="university-students">University Students</Option>
                  <Option value="professionals">Professionals</Option>
                  <Option value="executives">Executives</Option>
                  <Option value="mixed">Mixed Audience</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="audienceSize"
                label="Audience Size"
                tooltip="Size affects presentation dynamics and engagement strategies"
              >
                <Select placeholder="Select audience size">
                  <Option value="small">Small (1-20)</Option>
                  <Option value="medium">Medium (21-50)</Option>
                  <Option value="large">Large (51-100)</Option>
                  <Option value="very-large">Very Large (100+)</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="technicalLevel"
                label="Technical Knowledge Level"
                tooltip="Helps adjust terminology and explanation depth"
              >
                <Select placeholder="Select technical knowledge level">
                  <Option value="basic">Basic</Option>
                  <Option value="intermediate">Intermediate</Option>
                  <Option value="advanced">Advanced</Option>
                  <Option value="expert">Expert</Option>
                </Select>
              </Form.Item>
            </Card>

            {/* About your presentation */}
            <Space className="mt-12 mb-6" align="center">
              <FundProjectionScreenOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <Title level={2} style={{ margin: 0 }}>Focus of the presentation</Title>
            </Space>

            <Card
              className="mb-6"
            >
              <Form.Item
                name="timeLimit"
                label="Time Limit"
                tooltip="Helps monitor pacing and content distribution"
              >
                <Select placeholder="Select time limit">
                  <Option value="5">5 minutes</Option>
                  <Option value="10">10 minutes</Option>
                  <Option value="15">15 minutes</Option>
                  <Option value="30">30 minutes</Option>
                  <Option value="45">45 minutes</Option>
                  <Option value="60">60 minutes</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="topic"
                label="Presentation Topic"
                tooltip="Main subject of your presentation"
              >
                <Input placeholder="Enter your presentation topic" />
              </Form.Item>

              <Form.Item
                name="objectives"
                label="Key Objectives"
                tooltip="What do you want your audience to learn or do?"
              >
                <Input.TextArea
                  placeholder="What are the main goals of your presentation?"
                  rows={4}
                />
              </Form.Item>
            </Card>

            {/* Preferences for the AI assistant */}
            <Space className="mt-12 mb-6" align="center">
              <AudioOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <Title level={2} style={{ margin: 0 }}>Preferences for the AI assistant</Title>
            </Space>

            <Card
              className="mb-6"
            >
              <Form.Item
                name="feedbackStyle"
                label="Feedback Style"
                tooltip="How detailed should the feedback be?"
              >
                <Select placeholder="Select feedback style">
                  <Option value="detailed">Detailed</Option>
                  <Option value="concise">Concise</Option>
                  <Option value="balanced">Balanced</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="focusAreas"
                label="Focus Areas"
                tooltip="What aspects should the AI focus on?"
              >
                <Select
                  placeholder="Select focus areas"
                  mode="multiple"
                >
                  <Option value="content">Content Structure</Option>
                  <Option value="delivery">Delivery Style</Option>
                  <Option value="timing">Timing and Pacing</Option>
                  <Option value="engagement">Audience Engagement</Option>
                  <Option value="body-language">Body Language</Option>
                </Select>
              </Form.Item>
            </Card>

            <div className="pb-24">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  type="primary"
                  size="large"
                  style={{ background: '#000000' }}
                  onClick={handleClick}
                >
                  Get started with Spark <ArrowRightOutlined />
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Content>
      {/* Footer Section */}
      <Footer />
    </Layout>
  );
};

export default SettingsPage2;