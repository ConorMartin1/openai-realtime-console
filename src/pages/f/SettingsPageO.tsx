import React, { useState } from "react";
//import { Button } from "./Button";
//import { K } from "./K";
//import { SelectField } from "./SelectField";
import "./style.css";

const SettingsPage: React.FC = () => {
  const [textInput, setTextInput] = useState('');
  const [dropdownValue, setDropdownValue] = useState('option1');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDropdownValue(event.target.value);
  };

  const handleSubmit = () => {
    alert(`Input: ${textInput}, Dropdown: ${dropdownValue}`);
  };

  return (
    <div className="settings">
      <div className="div">
        <div className="overlap">
          <div className="text-wrapper">Configure you AI coach</div>
        </div>
            Dropdown:
          <select value={dropdownValue} onChange={handleDropdownChange}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
-----------------
        <div className="group">
          <div className="overlap-group">
            <div className="rectangle" />
            <p className="p">
              Describe who you are to better assist the AI coach creating the
              appropriate training session.
            </p>

            <div className="text-wrapper-2">^</div>

            <div className="group-2">
              <p className="text-wrapper-3">
                Pick a task that is most appropriate to your training
              </p>

            </div>
          </div>
        </div>

        <div className="overlap-wrapper">
          <div className="overlap-2">
            <div className="rectangle-2" />

            <p className="p">
              Set this value if you have a time limit.&nbsp;&nbsp;Otherwise
              leave blank
            </p>

            <div className="text-wrapper-2">^</div>
          </div>
        </div>

        <div className="overlap-group-wrapper">
          <div className="overlap-3">
            <div className="rectangle-3" />

            <div className="text-wrapper-4">^</div>

            <div className="group-3">
              <div className="text-wrapper-5">Age range</div>

            </div>

            <div className="group-4">
              <p className="text-wrapper-5">The type of the audience</p>

            </div>

            <div className="group-5">
              <div className="text-wrapper-5">Expected number attending</div>

            </div>
          </div>
        </div>

        <p className="for-better-outcomes">
          For better outcomes, please make selections that best describe the
          training you are after.
          <br />
          This is to help with scoring and outcomes.
          <br />
          <br />
          You do not have to fill out all values
        </p>

        <div className="text-gray-500">
          className="button-instance"
          containerClassName="button-2"
          label="File upload"
          layout="icon-and-label-default"
          size="medium-default"
          state="rest"
          style="primary"
        </div>
        <div className="button-3">
          
          <div className="container-2">
            <div className="div-wrapper">
              <div className="text-2">Start session</div>
            </div>
          </div>

          <div className="focus-ring">
            <div className="inner-stroke" />
          </div>
        </div>

        <div className="text-gray-500">
          className="button-4"
          containerClassName="button-5"
          label="Reset"
          layout="icon-and-label-default"
          size="medium-default"
          state="rest"
          style="primary"
        </div>
        <p className="text-wrapper-6">
          Firstly, tell me about your presentation
        </p>

        <div className="text-wrapper-7">Now some further details</div>

        <p className="text-wrapper-8">Now tell me about your audience</p>
      </div>
    </div>
  );
};

export default SettingsPage;