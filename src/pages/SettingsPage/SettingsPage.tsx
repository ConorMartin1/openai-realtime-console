import { Button, Col, Row, Select, Typography, Dropdown, Menu } from "antd";
import React from "react";
import './SettingsPage.scss';
import Banner from '../../components/Banner/Banner';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const menu = (
  <Menu>
    <Menu.Item key="1"><a href="/console">Console</a></Menu.Item>
    <Menu.Item key="2"><a href="/template">Templates</a></Menu.Item>
    <Menu.Item key="3"><a href="/settings">Settings</a></Menu.Item>
  </Menu>
);

const SettingsPage: React.FC = () => {
  return (
    <div className="settings-container">
      <Banner />

      <div className="form-section">
        <Title level={5} className="section-title">Firstly, tell me about your presentation</Title>
        <div className="form-content">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text>I'm a ...</Text>
              <Select defaultValue="Value" className="settings-select">
                <Option value="Value">Value</Option>
              </Select>
            </Col>
            <Col span={12}>
              <Paragraph>
                Describe who you are to better assist the AI coach in creating the appropriate training session.
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text>Preparing for</Text>
              <Select defaultValue="Value" className="settings-select">
                <Option value="Value">Value</Option>
              </Select>
            </Col>
            <Col span={12}>
              <Paragraph>Pick a task that is most appropriate to your training.</Paragraph>
            </Col>
          </Row>
        </div>
      </div>

      <div className="form-section">
        <Title level={5} className="section-title">Now tell me about your audience</Title>
        <div className="form-content">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text>Type</Text>
              <Select defaultValue="Value" className="settings-select">
                <Option value="Value">Value</Option>
              </Select>
            </Col>
            <Col span={12}>
              <Paragraph>The type of the audience.</Paragraph>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text>Age</Text>
              <Select defaultValue="Value" className="settings-select">
                <Option value="Value">Value</Option>
              </Select>
            </Col>
            <Col span={12}>
              <Paragraph>Age range.</Paragraph>
            </Col>
          </Row>
        </div>
      </div>

      <div className="form-section">
        <Title level={5} className="section-title">Now some further details</Title>
        <div className="form-content">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text>Time limit</Text>
              <Select defaultValue="Value" className="settings-select">
                <Option value="Value">Value</Option>
              </Select>
            </Col>
            <Col span={12}>
              <Paragraph>Set this value if you have a time limit. Otherwise, leave blank.</Paragraph>
            </Col>
          </Row>
        </div>
      </div>

      <Row justify="center" className="button-row">
        <Button type="primary" className="settings-button">File Upload</Button>
        <Button type="primary" className="settings-button">Reset</Button>
        <Button type="primary" className="settings-button">Start Session</Button>
      </Row>
    </div>
  );
};

export default SettingsPage;
