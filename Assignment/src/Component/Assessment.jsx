import React, { useState } from "react";
import "../App.css";

// Array of questions for the assessment
const questions = [
  "I have ambitious aims of making a difference.",
  "I often feel overwhelmed by my responsibilities.",
  "I find it difficult to trust people in positions of authority.",
  "I feel appreciated by my peers and colleagues.",
  "I believe in the possibility of positive change.",
];

// Labels corresponding to slider range values
const sliderLabels = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

// Assessment component
export const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [maxQuestionReached, setMaxQuestionReached] = useState(0);
  const [sliderHistory, setSliderHistory] = useState(Array(questions.length).fill(0));
  
  // Move to the next question
  const handleNext = () => {
    if (currentQuestion < maxQuestionReached) {
      setCurrentQuestion(currentQuestion + 1);
      setSliderValue(sliderHistory[currentQuestion + 1]);
    }
  };

  // Move to the previous question
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSliderValue(sliderHistory[currentQuestion - 1]);
    }
  };

  // Handle label selection and move to the next question
  const handleLabelSelect = (index) => {
    setSliderValue(index);
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        const nextQuestion = currentQuestion + 1;
        setCurrentQuestion(nextQuestion);
        setSliderValue(0); // Reset slider value
        setMaxQuestionReached((prev) => Math.max(prev, nextQuestion));
        setSliderHistory((prevHistory) => {
          const updatedHistory = [...prevHistory];
          updatedHistory[currentQuestion] = index;
          return updatedHistory;
        });
      }, 300);
    }
  };

  // Handle slider change and move to the next question if slider is at max value
  const handleSliderChange = (e) => {
    const maxValue = parseInt(e.target.value);
    setSliderValue(maxValue);
    if (
      maxValue === sliderLabels.length - 1 &&
      currentQuestion < questions.length - 1
    ) {
      setTimeout(() => handleNext(), 300);
    }
  };

  // Calculate percentage for the progress bar
  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="assessment-container">
      <h1>ARE YOU DISILLUSIONED?</h1>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="question-section">
        <h2>
          {currentQuestion + 1}/{questions.length}
        </h2>
        <p>{questions[currentQuestion]}</p>
        <div className="slider">
          <input
            type="range"
            min="0"
            max={sliderLabels.length - 1}
            value={sliderValue}
            onChange={handleSliderChange}
          />
          <div className="slider-labels">
            {sliderLabels.map((label, index) => (
              <span key={index} onClick={() => handleLabelSelect(index)}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="navigation-buttons">
      <button onClick={handlePrev} disabled={currentQuestion === 0}>
          &lt; PREV
        </button>
        <button onClick={handleNext} disabled={currentQuestion >= maxQuestionReached}>
          NEXT &gt;
        </button>      </div>
    </div>
  );
};
