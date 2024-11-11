import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ReviewPage.scss';



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
    <div className="review-page">
      <header>
        <h1 className="title">SpeechCraft</h1>
      </header>
      <main>
        <div className="grid">
          <div className="column-a">
            <h2 className="section-title">Summary</h2>
            <p>{speechCraftFeedback.summary}</p>
            {Object.entries(speechCraftFeedback.feedback_breakdown).map(([field, value]) => (
              <p key={field} className="feedback-item">
                <span className="field">{field}:</span> <span className="value">{value}</span>
              </p>
            ))}
          </div>
          <div className="column-b">
            {/* Add any additional content for the right column */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewPage;
