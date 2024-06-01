import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminQuizManagement.css"; // Add this line to import custom CSS
const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }],
  });
  const [editingQuiz, setEditingQuiz] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/quizzes");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleQuizChange = (e, questionIndex, optionIndex = null) => {
    const updatedQuiz = { ...newQuiz };
    if (optionIndex === null) {
      updatedQuiz.questions[questionIndex][e.target.name] = e.target.value;
    } else {
      updatedQuiz.questions[questionIndex].options[optionIndex] =
        e.target.value;
    }
    setNewQuiz(updatedQuiz);
  };

  const handleCreateQuiz = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/quizzes",
        newQuiz
      );
      setQuizzes([...quizzes, response.data]);
      setNewQuiz({
        title: "",
        questions: [
          { question: "", options: ["", "", "", ""], correctAnswer: "" },
        ],
      });
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handleDeleteQuiz = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/quizzes/${id}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handleEditQuiz = (quiz) => {
    setEditingQuiz(quiz._id);
    setNewQuiz({
      title: quiz.title,
      questions: quiz.questions,
    });
  };

  const handleUpdateQuiz = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/quizzes/${editingQuiz}`,
        newQuiz
      );
      setQuizzes(
        quizzes.map((quiz) => (quiz._id === editingQuiz ? response.data : quiz))
      );
      setEditingQuiz(null);
      setNewQuiz({
        title: "",
        questions: [
          { question: "", options: ["", "", "", ""], correctAnswer: "" },
        ],
      });
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  return (
    <div className="container quiz-management">
      <h2 className="text-center my-4">Quiz Management</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title">
            {editingQuiz ? "Edit Quiz" : "Create New Quiz"}
          </h3>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Quiz Title"
              value={newQuiz.title}
              onChange={(e) =>
                setNewQuiz({ ...newQuiz, title: e.target.value })
              }
            />
          </div>
          {newQuiz.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-3">
              <div className="form-group">
                <input
                  type="text"
                  name="question"
                  className="form-control"
                  placeholder="Question"
                  value={question.question}
                  onChange={(e) => handleQuizChange(e, questionIndex)}
                />
              </div>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="form-group">
                  <input
                    type="text"
                    name={`option-${optionIndex}`}
                    className="form-control"
                    placeholder={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleQuizChange(e, questionIndex, optionIndex)
                    }
                  />
                </div>
              ))}
              <div className="form-group">
                <input
                  type="text"
                  name="correctAnswer"
                  className="form-control"
                  placeholder="Correct Answer"
                  value={question.correctAnswer}
                  onChange={(e) => handleQuizChange(e, questionIndex)}
                />
              </div>
            </div>
          ))}
          {editingQuiz ? (
            <button className="btn btn-primary" onClick={handleUpdateQuiz}>
              Update Quiz
            </button>
          ) : (
            <button className="btn btn-success" onClick={handleCreateQuiz}>
              Create Quiz
            </button>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-center mb-4">Existing Quizzes</h3>
        <ul className="list-group">
          {quizzes.map((quiz) => (
            <li
              key={quiz._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{quiz.questions[0].question}</span>
              <div>
                <button
                  className="btn btn-warning btn-sm mx-1"
                  onClick={() => handleEditQuiz(quiz)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteQuiz(quiz._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizManagement;
