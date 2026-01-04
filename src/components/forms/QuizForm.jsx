import React, { useState } from "react";
import axios from "axios";

const QuizForm = () => {
  const [quiz, setQuiz] = useState({
    quiz_name: "",
    quiz_id: "",
    domain: "",
    field: "",
  });

  const [questionCount, setQuestionCount] = useState(0);
  const [questions, setQuestions] = useState([]);

  /* Handle quiz meta fields */
  const handleQuizChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  /* Handle question count */
  const handleQuestionCount = (e) => {
    const n = parseInt(e.target.value) || 0;
    setQuestionCount(n);

    const tempQuestions = Array.from({ length: n }, () => ({
      qtn: "",
      options: ["", "", "", ""],
      correct_answer: "",
    }));

    setQuestions(tempQuestions);
  };

  /* Handle question text */
  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].qtn = value;
    setQuestions(updated);
  };

  /* Handle options */
  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  /* Handle correct answer */
  const handleCorrectAnswer = (index, value) => {
    const updated = [...questions];
    updated[index].correct_answer = value;
    setQuestions(updated);
  };

  /* Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...quiz,
      questions,
    };

    await axios.post("https://one-problem-per-day.onrender.com/quiz/create", payload);

    alert("Quiz created successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Quiz</h3>

      {/* Quiz details */}
      <input
        name="quiz_name"
        placeholder="Quiz Name"
        onChange={handleQuizChange}
        required
      />
      <input
        name="quiz_id"
        placeholder="Quiz ID"
        onChange={handleQuizChange}
        required
      />
      <input
        name="domain"
        placeholder="Domain"
        onChange={handleQuizChange}
        required
      />
      <input
        name="field"
        placeholder="Field"
        onChange={handleQuizChange}
        required
      />

      {/* Number of questions */}
      <input
        type="number"
        placeholder="How many questions?"
        min="1"
        onChange={handleQuestionCount}
      />

      {/* Dynamic questions */}
      {questions.map((q, qIndex) => (
        <div key={qIndex} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
          <h4>Question {qIndex + 1}</h4>

          <input
            placeholder="Question"
            value={q.qtn}
            onChange={(e) =>
              handleQuestionChange(qIndex, e.target.value)
            }
            required
          />

          {q.options.map((opt, oIndex) => (
            <input
              key={oIndex}
              placeholder={`Option ${oIndex + 1}`}
              value={opt}
              onChange={(e) =>
                handleOptionChange(qIndex, oIndex, e.target.value)
              }
              required
            />
          ))}

          <input
            placeholder="Correct Answer"
            value={q.correct_answer}
            onChange={(e) =>
              handleCorrectAnswer(qIndex, e.target.value)
            }
            required
          />
        </div>
      ))}

      <button type="submit">Create Quiz</button>
    </form>
  );
};


export default QuizForm;
