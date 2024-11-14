import { HomeOutlined, RedoOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Col, Image, Row, Typography } from "antd";
import React from "react";
import image3 from "../../images/image-3.png";
import image8 from "../../images/image-8.png";
import image9 from "../../images/image-9.png";
import image10 from "../../images/image-10.png";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ReviewPage.scss';

const { Title, Paragraph } = Typography;

const ReviewPage: React.FC = () => {
    const location = useLocation();
    const { items } = location.state || {};
    const [response, setResponse] = useState<string | null>(null);
    const lastItem = items.length > 0 ? items[items.length - 1] : null;
    const lastItemTranscript = lastItem['formatted']['transcript'];

    const speechCraftFeedback = {
      summary: "Your presentation demonstrated clear enunciation and consistent volume, contributing to effective delivery. To enhance your impact further, consider using a more varied tone to capture audience interest and reduce the use of filler words.",
      feedback_breakdown: {
        Enunciation: "Good",
        Volume: "Good",
        "Tone Variation": "Could be better",
        "Use of Filler Words": "Could be better"
      }
    };

    const callOpenAI = async () => {
        const apiKey = localStorage.getItem('tmp::voice_api_key');
    
        try {
          const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: 'gpt-4o',
              messages: [
                { role: 'system', content: 'Your job is to format the feedback of an AI Speech Coach. The coach has generated detailed feedback and finished it with a score. The user will provide that feedback in their message. Your response must ONLY be a JSON which contains a summary feedback paragraph and a breakdown of the key areas of the feedback with values on how the student did (Good, Great, Could be better etc) ' },
                { role: 'user', content: lastItemTranscript },
              ],
            }),
          });
    
          const data = await res.json();
          console.log(data);
          console.log('message that I need to output on the frontend');
          console.log(data['choices'][0]['message']['content']);
          
          if (data.choices && data.choices.length > 0) {
            setResponse(data.choices[0].message.content);
          } else {
            console.error('No response from API');
          }
        } catch (error) {
          console.error('Error calling OpenAI API:', error);
        }
      };

useEffect(() => {
    callOpenAI();
}, []);

  return (
    <Row justify="center" className="bg-white w-full">
      <Col
        className="bg-white"
        style={{ width: 1280, height: 866, position: "relative" }}
      >
        <header
          style={{
            width: 1280,
            height: 110,
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "#371600",
          }}
        >
          <div
            style={{
              width: 955,
              position: "absolute",
              top: 13,
              left: 23,
              color: "white",
              fontSize: "var(--page-header-2-font-size)",
              fontWeight: "var(--page-header-2-font-weight)",
            }}
          >
            Configure you AI coach
          </div>
        </header>

        <div
          style={{
            width: 710,
            height: 294,
            position: "absolute",
            top: 200,
            left: 37,
          }}
        >
          <Paragraph
            style={{
              width: 710,
              position: "absolute",
              top: 18,
              left: 0,
              color: "black",
              fontSize: "var(--body-font-size)",
              fontWeight: "var(--body-font-weight)",
            }}
          >
            Overall feedback
            <br />
            <br />
            You demonstrated strong passion and clarity in your presentation,
            which is commendable. However, there are a few areas where you can
            improve to enhance your delivery and audience engagement.
            <br />
            <br />
            First, I noticed the overuse of filler words like “umm” and “you
            know.” These can be distracting and disrupt the flow of your speech.
            Working on reducing these will help maintain your audience's focus
            on your message.
            <br />
            <br />
            In terms of vocabulary, it’s important to tailor your language to
            resonate with your audience. While some phrases were effective, a
            few technical terms may have alienated listeners who might not be
            familiar with them. Aim for a balance that engages everyone.
          </Paragraph>

          <Image
            style={{
              width: 46,
              height: 37,
              position: "absolute",
              top: 0,
              left: 160,
            }}
            alt="Image"
            src={image3}
          />

          <Title
            level={5}
            style={{ position: "absolute", top: 265, left: 0, color: "black" }}
          >
            Key points
          </Title>
        </div>

        <Title
          level={5}
          style={{
            width: 226,
            position: "absolute",
            top: 145,
            left: 790,
            color: "black",
          }}
        >
          Overall score against your selected criteria
        </Title>

        <Button
          type="primary"
          icon={<HomeOutlined />}
          style={{
            width: 78,
            position: "absolute",
            top: 816,
            left: 369,
            backgroundColor: "#371600",
            borderRadius: "var(--button-shape-button-corner-radius)",
          }}
        >
          Home
        </Button>

        <Button
          type="primary"
          icon={<SettingOutlined />}
          style={{
            width: 89,
            position: "absolute",
            top: 816,
            left: 670,
            backgroundColor: "#371600",
            borderRadius: "var(--button-shape-button-corner-radius)",
          }}
        >
          Settings
        </Button>

        <Button
          type="primary"
          icon={<RedoOutlined />}
          style={{
            width: 95,
            position: "absolute",
            top: 816,
            left: 510,
            backgroundColor: "#371600",
            borderRadius: "var(--button-shape-button-corner-radius)",
          }}
        >
          Try again
        </Button>

        <div
          style={{
            width: 538,
            height: 304,
            position: "absolute",
            top: 503,
            left: 37,
          }}
        >
          <Image
            style={{
              width: 35,
              height: 35,
              position: "absolute",
              top: 269,
              left: 354,
            }}
            alt="Image"
            src={image8}
          />

          <Image
            style={{
              width: 35,
              height: 35,
              position: "absolute",
              top: 269,
              left: 503,
            }}
            alt="Image"
            src={image10}
          />

          <Paragraph
            style={{
              width: 529,
              height: 297,
              position: "absolute",
              top: 0,
              left: 0,
              color: "black",
              fontSize: "var(--body-font-size)",
              fontWeight: "var(--body-font-weight)",
            }}
          >
            Pitch 🤩 <br />
            Your pitch was excellent
            <br />
            Pace 🙂<br />
            Your word count was stable at a comfortable x words per minute
            <br />
            Filler words 😩<br />
            Try taking your time when talking and pause as needed. More practice
            will also help
            <br />
            Vocabulary 🙂<br />
            You have an impressive and wide vocabulary with good use of words
            <br />
            Tone 😐<br />
            Your tone sounded firm
            <br />
            Clarity 🙁<br />
            Some breathing practices can improve clarity
            <br />
            <br />
            <br />
            Please remember that I’m just a language model
          </Paragraph>
        </div>

        <Image
          style={{
            width: 35,
            height: 35,
            position: "absolute",
            top: 772,
            left: 697,
          }}
          alt="Image"
          src={image9}
        />

        <Paragraph
          style={{
            width: 223,
            height: 96,
            position: "absolute",
            top: 486,
            left: 790,
            color: "black",
            fontSize: "var(--body-font-size)",
            fontWeight: "var(--body-font-weight)",
          }}
        >
          🤩 Outstanding
          <br />🙂 Good
          <br />😐 Fair
          <br />🙁 Can do with improvements
          <br />😩 Needs reworking
        </Paragraph>

        <Title
          level={5}
          style={{ position: "absolute", top: 449, left: 790, color: "black" }}
        >
          Legend
        </Title>

        <Title
          level={1}
          style={{ position: "absolute", top: 207, left: 834, color: "black" }}
        >
          88
        </Title>

        <Title
          level={4}
          style={{ position: "absolute", top: 135, left: 37, color: "black" }}
        >
          Here’s are your results.
        </Title>
      </Col>
    </Row>
  );
};

export default ReviewPage;
