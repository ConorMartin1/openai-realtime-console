import { Button, Col, Row, Select, Typography } from "antd";
import React from "react";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const SettingsPage = (): JSX.Element => {
  return (
    <Row justify="center" style={{ backgroundColor: "white", width: "100%" }}>
      <Col
        style={{
          backgroundColor: "white",
          width: 1280,
          height: 1522,
          position: "relative",
        }}
      >
        <Row
          style={{
            width: 1280,
            height: 110,
            backgroundColor: "#004d00",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Col style={{ width: 955, marginTop: 17, marginLeft: 23 }}>
            <Title level={2} style={{ color: "white" }}>
              Configure you AI coach
            </Title>
          </Col>
        </Row>

        <Paragraph
          style={{ width: 806, position: "absolute", top: 129, left: 25 }}
        >
          For better outcomes, please make selections that best describe the
          training you are after.
          <br />
          This is to help with scoring and outcomes.
          <br />
          <br />
          You do not have to fill out all values
        </Paragraph>

        <Title level={5} style={{ position: "absolute", top: 251, left: 25 }}>
          Firstly, tell me about your presentation
        </Title>

        <Row
          style={{
            width: 844,
            height: 259,
            position: "absolute",
            top: 289,
            left: 23,
          }}
        >
          <Col
            style={{
              width: 840,
              height: 259,
              position: "relative",
              backgroundColor: "#e8dab2",
              borderRadius: 10,
            }}
          >
            <Row
              style={{
                width: 834,
                height: 259,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <Col span={12} style={{ padding: 20 }}>
                <Text>I'm a ...</Text>
                <Select
                  defaultValue="Value"
                  style={{ width: "100%", marginTop: 10 }}
                >
                  <Option value="Value">Value</Option>
                </Select>
              </Col>
              <Col span={12} style={{ padding: 20 }}>
                <Paragraph>
                  Describe who you are to better assist the AI coach creating
                  the appropriate training session.
                </Paragraph>
              </Col>
            </Row>
            <Row
              style={{
                width: 834,
                height: 259,
                position: "absolute",
                top: 136,
                left: 0,
              }}
            >
              <Col span={12} style={{ padding: 20 }}>
                <Text>Preparing for</Text>
                <Select
                  defaultValue="Value"
                  style={{ width: "100%", marginTop: 10 }}
                >
                  <Option value="Value">Value</Option>
                </Select>
              </Col>
              <Col span={12} style={{ padding: 20 }}>
                <Paragraph>
                  Pick a task that is most appropriate to your training
                </Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>

        <Title level={5} style={{ position: "absolute", top: 594, left: 25 }}>
          Now tell me about your audience
        </Title>

        <Row
          style={{
            width: 842,
            height: 390,
            position: "absolute",
            top: 632,
            left: 23,
          }}
        >
          <Col
            style={{
              width: 840,
              height: 390,
              position: "relative",
              backgroundColor: "#e8dab2",
              borderRadius: 10,
            }}
          >
            <Row
              style={{
                width: 834,
                height: 390,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <Col span={12} style={{ padding: 20 }}>
                <Text>Type</Text>
                <Select
                  defaultValue="Value"
                  style={{ width: "100%", marginTop: 10 }}
                >
                  <Option value="Value">Value</Option>
                </Select>
              </Col>
              <Col span={12} style={{ padding: 20 }}>
                <Paragraph>The type of the audience</Paragraph>
              </Col>
            </Row>
            <Row
              style={{
                width: 834,
                height: 390,
                position: "absolute",
                top: 136,
                left: 0,
              }}
            >
              <Col span={12} style={{ padding: 20 }}>
                <Text>Age</Text>
                <Select
                  defaultValue="Value"
                  style={{ width: "100%", marginTop: 10 }}
                >
                  <Option value="Value">Value</Option>
                </Select>
              </Col>
              <Col span={12} style={{ padding: 20 }}>
                <Paragraph>Age range</Paragraph>
              </Col>
            </Row>
            <Row
              style={{
                width: 834,
                height: 390,
                position: "absolute",
                top: 229,
                left: 0,
              }}
            >
              <Col span={12} style={{ padding: 20 }}>
                <Text>Size</Text>
                <Select
                  defaultValue="Value"
                  style={{ width: "100%", marginTop: 10 }}
                >
                  <Option value="Value">Value</Option>
                </Select>
              </Col>
              <Col span={12} style={{ padding: 20 }}>
                <Paragraph>Expected number attending</Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>

        <Title level={5} style={{ position: "absolute", top: 1065, left: 25 }}>
          Now some further details
        </Title>

        <Row
          style={{
            width: 844,
            height: 146,
            position: "absolute",
            top: 1103,
            left: 23,
          }}
        >
          <Col
            style={{
              width: 840,
              height: 146,
              position: "relative",
              backgroundColor: "#e8dab2",
              borderRadius: 10,
            }}
          >
            <Row
              style={{
                width: 834,
                height: 146,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <Col span={12} style={{ padding: 20 }}>
                <Text>Time limit</Text>
                <Select
                  defaultValue="Value"
                  style={{ width: "100%", marginTop: 10 }}
                >
                  <Option value="Value">Value</Option>
                </Select>
              </Col>
              <Col span={12} style={{ padding: 20 }}>
                <Paragraph>
                  Set this value if you have a time limit. Otherwise leave blank
                </Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row style={{ position: "absolute", top: 1374, left: 48 }}>
          <Button
            type="primary"
            style={{ backgroundColor: "#371600", borderColor: "#371600" }}
          >
            File upload
          </Button>
        </Row>
        <Row style={{ position: "absolute", top: 1374, left: 396 }}>
          <Button
            type="primary"
            style={{ backgroundColor: "#371600", borderColor: "#371600" }}
          >
            Reset
          </Button>
        </Row>
        <Row style={{ position: "absolute", top: 1374, left: 568 }}>
          <Button
            type="primary"
            style={{ backgroundColor: "#371600", borderColor: "#371600" }}
          >
            Start session
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default SettingsPage;
