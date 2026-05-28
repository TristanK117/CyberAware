"use client";
import { useState } from "react";
import { ModuleHeader } from "../context/page";
import passwordModule from "../../../../../module_details/passwords.json";
import "../../modules.css";
import Link from "next/link"

export default function PasswordMCQ() {
  const mcqScreen = passwordModule.screens.find(
    (screen) => screen.id === "viewing-decision-screen"
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!mcqScreen || mcqScreen.type !== "decision" || !mcqScreen.questions) {
    return <div>MCQ screen not found.</div>;
  }

  const questions = mcqScreen.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const selectedOption =
    currentQuestion.options.find((option) => option.id === selectedId) || null;

  const canGoNext = selectedOption?.isCorrect === true;

  function handleNext() {
    if (!canGoNext) return;

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedId(null);
    } else {
      console.log("Go to next screen");
    }
  }

  const currentStep = 3;
  const totalSteps = 4;
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="mcq_page">
      <ModuleHeader />

      <div className="mcq_content">

        <div className="mcq_right">
          <div className="mcq_question">
            <h2>
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <h1>
              {currentQuestion.question}
            </h1>
          </div>

          <div className="mcq_options">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedId === option.id;
              const isWrongSelected = isSelected && !option.isCorrect;
              const isCorrectSelected = isSelected && option.isCorrect;

              return (
                <label
                  key={option.id}
                  className={`mcq_option ${
                    isWrongSelected
                      ? "wrong"
                      : isCorrectSelected
                      ? "correct"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`phishing-question-${currentQuestion.id}`}
                    value={option.id}
                    checked={isSelected}
                    onChange={() => setSelectedId(option.id)}
                  />
                  <span className="custom_radio"></span>
                  <span className="option_text">{option.label}</span>
                </label>
              );
            })}
          </div>

          {selectedOption && (
            <div
              className={`mcq_feedback ${
                selectedOption.isCorrect ? "correct" : "wrong"
              }`}
            >
              <p>{selectedOption.description}</p>
            </div>
          )}

          <div className="mcq_next_button_wrapper">
            {currentQuestionIndex === questions.length - 1 ? (
              <Link href="/modules/password/best-practices">
                <button className="mcq_next_button" disabled={!canGoNext}>
                  Next Section
                </button>
              </Link>
            ) : (
              <button
                className="mcq_next_button"
                disabled={!canGoNext}
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="module_progress_footer">
        <div className="module_progress_bar">
          <div
            className="module_progress_fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <span>
          {currentStep}/{totalSteps}
        </span>
      </div>
    </div>
  );
}