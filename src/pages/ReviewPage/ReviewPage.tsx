import { Typography } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./ReviewPage.scss";
import Banner from "../../components/Banner/Banner";

const ReviewPage: React.FC = () => {
  const location = useLocation();
  const { items } = location.state || {};
  const lastItem = items && items.length > 0 ? items[items.length - 1] : null;
  const lastItemTranscript = lastItem?.formatted?.transcript || "";
  const hasFetched = useRef(false);

  const [feedback, setFeedback] = useState<{
    summary?: string;
    breakdown?: { [key: string]: string };
  }>({});

  const callOpenAI = async () => {
    const apiKey = localStorage.getItem("tmp::voice_api_key");

    try {
      console.log(lastItemTranscript);
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
                "Your job is to format the feedback of an AI Speech Coach. The coach has generated detailed feedback and finished it with a score. The user will provide that feedback in their message. Your response must ONLY be a JSON which contains a summary feedback paragraph and a breakdown of the key areas of the feedback with values on how the student did (Good, Great, Could be better etc). Label this part as 'breakdown'",
            },
            { role: "user", content: lastItemTranscript },
          ],
        }),
      });

      const data = await res.json();

      if (data.choices && data.choices.length > 0) {
        console.log("DATA:", data);
        const rawContent = data.choices[0].message.content;
        const jsonContent = rawContent.replace(/^```json\s*|```$/g, "");
        const content = JSON.parse(jsonContent);

        setFeedback(content);

        console.log("Feedback:", content);
      } else {
        console.error("No response from API");
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      callOpenAI();
      hasFetched.current = true;
    }
  }, []);

  return (
    <div className="review-container">
      <Banner />

      <div className="columns-container">
        <div className="left-column">
          <h2>Your Feedback</h2>
          {feedback.summary ? (
            <>
              <p>{feedback.summary}</p>
              {feedback.breakdown && (
                <>
                  <h3>Breakdown</h3>
                  <ul>
                    {Object.entries(feedback.breakdown).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          ) : (
            <p>Loading feedback...</p>
          )}
        </div>

        <div className="right-column">
          <h2>Right Column Content</h2>
          <p>This is where the content for the right column goes.</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
