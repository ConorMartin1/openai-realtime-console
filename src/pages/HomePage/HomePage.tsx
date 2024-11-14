import { Card, Col, Image, Row, Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;

const Home = (): JSX.Element => {
  return (
    <Row justify="center" style={{ backgroundColor: "white", width: "100%" }}>
      <Col
        style={{
          backgroundColor: "white",
          width: 1280,
          height: 1432,
          position: "relative",
        }}
      >
        <Row
          style={{
            backgroundColor: "var(--primary-color)",
            width: 1280,
            height: 190,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Col style={{ width: 652, position: "absolute", top: 39, left: 42 }}>
            <Title
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "var(--page-header-font-size)",
                fontWeight: "var(--page-header-font-weight)",
                letterSpacing: "var(--page-header-letter-spacing)",
                lineHeight: "var(--page-header-line-height)",
                fontStyle: "var(--page-header-font-style)",
              }}
            >
              SpeechCraft
            </Title>
          </Col>
        </Row>

        <Image
          style={{
            width: 120,
            height: 160,
            position: "absolute",
            top: 264,
            left: 42,
          }}
          alt="Image"
          src="image-2.png"
          preview={false}
        />

        <Title
          level={2}
          style={{
            position: "absolute",
            top: 277,
            left: 271,
            textAlign: "center",
            fontSize: "var(--m3-headline-large-font-size)",
            fontWeight: "var(--m3-headline-large-font-weight)",
            letterSpacing: "var(--m3-headline-large-letter-spacing)",
            lineHeight: "var(--m3-headline-large-line-height)",
            fontStyle: "var(--m3-headline-large-font-style)",
          }}
        >
          Meet Liam’s Eye
        </Title>

        <Image
          style={{
            width: 225,
            height: 225,
            position: "absolute",
            top: 278,
            left: 609,
          }}
          alt="Image"
          src="image-11.png"
          preview={false}
        />

        <Row
          style={{
            width: 1102,
            height: 597,
            position: "absolute",
            top: 517,
            left: 89,
          }}
        >
          <Col span={24} style={{ textAlign: "center", marginBottom: 20 }}>
            <Title
              level={3}
              style={{
                fontSize: "var(--h3-font-size)",
                fontWeight: "var(--h3-font-weight)",
                letterSpacing: "var(--h3-letter-spacing)",
                lineHeight: "var(--h3-line-height)",
                fontStyle: "var(--h3-font-style)",
              }}
            >
              How it works
            </Title>
          </Col>

          {[...Array(3)].map((_, index) => (
            <Col key={index} span={8} style={{ padding: "0 10px" }}>
              <Card style={{ backgroundColor: "#c0d6df", borderRadius: 10 }}>
                <Title
                  level={5}
                  style={{
                    color: "#000537",
                    textAlign: "center",
                    fontSize: "var(--h5-bold-font-size)",
                    fontWeight: "var(--h5-bold-font-weight)",
                    letterSpacing: "var(--h5-bold-letter-spacing)",
                    lineHeight: "var(--h5-bold-line-height)",
                    fontStyle: "var(--h5-bold-font-style)",
                  }}
                >
                  How it works
                </Title>
                <Paragraph
                  style={{
                    textAlign: "center",
                    fontSize: "var(--body-bold-font-size)",
                    fontWeight: "var(--body-bold-font-weight)",
                    letterSpacing: "var(--body-bold-letter-spacing)",
                    lineHeight: "var(--body-bold-line-height)",
                    fontStyle: "var(--body-bold-font-style)",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        <Image
          style={{
            width: 608,
            height: 202,
            position: "absolute",
            top: 1156,
            left: 356,
          }}
          alt="Image"
          src="image-12.png"
          preview={false}
        />
      </Col>
    </Row>
  );
};

export default Home;
