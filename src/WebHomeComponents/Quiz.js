import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Quiz.css";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted) {
      fetchQuizzes();
    }
  }, [quizStarted]);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/quizzes");
      setQuizzes(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message || "An error occurred while fetching quizzes.");
      setLoading(false);
    }
  };

  const handleOptionChange = (questionId, option) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: option });
  };

  const handleSubmit = () => {
    let newScore = 0;
    quizzes.forEach((quiz) => {
      quiz.questions.forEach((question) => {
        const selectedOption = selectedOptions[question._id];
        if (selectedOption && selectedOption === question.correctAnswer) {
          newScore += 1;
        }
      });
    });
    setTotalScore(newScore);
    setShowResults(true);
  };

  const handleRetry = () => {
    setSelectedOptions({});
    setShowResults(false);
    setCurrentQuizIndex(0);
    setTotalScore(0);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return (
      <div className="start-quiz">
        <button onClick={startQuiz}>
          Test Your Knowledge about Travelling
        </button>
      </div>
    );
  }

  if (loading) {
    return <p>Loading quizzes...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (showResults) {
    return (
      <div className="quiz-results">
        <h2>
          Your Score: {totalScore} /{" "}
          {quizzes.reduce((acc, quiz) => acc + quiz.questions.length, 0)}
        </h2>
        <button onClick={handleRetry} className="btn btn-primary">
          Retry Quiz
        </button>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return <p>No quizzes available.</p>;
  }

  const currentQuiz = quizzes[currentQuizIndex];

  return (
    <div className="quiz">
      <h2>{currentQuiz.title}</h2>
      {currentQuiz.questions.map((question, index) => (
        <div key={index} className="question-card">
          <h3>{question.question}</h3>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="option">
              <input
                type="radio"
                name={`question-${question._id}`}
                value={option}
                checked={selectedOptions[question._id] === option}
                onChange={() => handleOptionChange(question._id, option)}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <div className="navigation">
        {currentQuizIndex > 0 && (
          <button
            onClick={() => setCurrentQuizIndex(currentQuizIndex - 1)}
            className="btn btn-secondary"
          >
            Previous
          </button>
        )}
        {currentQuizIndex < quizzes.length - 1 ? (
          <button
            onClick={() => setCurrentQuizIndex(currentQuizIndex + 1)}
            className="btn btn-secondary"
          >
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
