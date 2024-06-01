import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import "./Poll.css";

const socket = io("http://localhost:3001"); // Always adjust it

const Poll = () => {
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [showNewOptionInput, setShowNewOptionInput] = useState(false);
  const [polls, setPolls] = useState([]);
  const [votedOption, setVotedOption] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get("http://localhost:3000/polls");
        setPolls(response.data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    const checkAuthentication = () => {
      const userId = localStorage.getItem("userId");
      setIsAuthenticated(!!userId);
    };

    fetchPolls();
    checkAuthentication();

    socket.on("vote", (updatedPoll) => {
      setPolls((prevPolls) =>
        prevPolls.map((poll) =>
          poll._id === updatedPoll._id ? updatedPoll : poll
        )
      );
    });

    return () => {
      socket.off("vote");
    };
  }, []);

  const handleCreatePoll = async () => {
    if (!isAuthenticated) {
      alert("Sign in required to create a poll.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/polls", {
        question: pollQuestion,
        options: pollOptions,
      });
      setPolls([...polls, response.data]);
      setPollQuestion("");
      setPollOptions([]);
      setShowNewOptionInput(false);
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  const handleVote = async (pollId) => {
    if (!votedOption) {
      alert("Please select an option to vote.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/polls/${pollId}/vote`,
        {
          option: votedOption,
        }
      );
      const updatedPoll = response.data;
      setPolls((prevPolls) =>
        prevPolls.map((poll) =>
          poll._id === updatedPoll._id ? updatedPoll : poll
        )
      );
      socket.emit("vote", updatedPoll);
      setVotedOption("");
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const addOption = () => {
    if (newOption.trim() !== "") {
      setPollOptions([...pollOptions, newOption]);
      setNewOption("");
      setShowNewOptionInput(false);
    }
  };

  const renderNewOptionInput = () => {
    return (
      <div className="new-option">
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="New option"
          className="form-control"
        />
        <button onClick={addOption} className="btn btn-secondary">
          Add Option
        </button>
      </div>
    );
  };

  return (
    <div className="poll-section">
      {isAuthenticated ? (
        <div className="create-poll">
          <h2>Create Poll</h2>
          <input
            type="text"
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
            placeholder="Poll Question"
            className="form-control"
          />
          {pollOptions.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                readOnly
                className="form-control option-input"
              />
            </div>
          ))}
          {showNewOptionInput && renderNewOptionInput()}
          <button
            onClick={() => setShowNewOptionInput(true)}
            className="btn btn-secondary"
          >
            Add Option
          </button>
          <button onClick={handleCreatePoll} className="btn btn-primary">
            Create Poll
          </button>
        </div>
      ) : (
        <div className="login-prompt">
          <h2>Login to Create a Poll</h2>
          <p>Please log in to create a poll.</p>
        </div>
      )}

      <div className="vote-section">
        <h2>Vote in Polls</h2>
        {polls.map((poll) => (
          <div key={poll._id} className="poll">
            <h3>{poll.question}</h3>
            {poll.options.map((option, index) => (
              <div key={index} className="option">
                <input
                  type="radio"
                  name={`poll-${poll._id}`}
                  value={option.option}
                  onChange={(e) => setVotedOption(e.target.value)}
                  checked={votedOption === option.option}
                />
                <label>{option.option}</label>
              </div>
            ))}
            <button
              onClick={() => handleVote(poll._id)}
              className="btn btn-primary"
            >
              Vote
            </button>
            <div className="results">
              <div>Total Votes: {poll.totalVotes}</div>
              {poll.options.map((option) => (
                <div key={option.option}>
                  {option.option}: {option.votes}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Poll;
