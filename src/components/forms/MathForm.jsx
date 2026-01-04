import React, { useState } from "react";
import axios from "axios";

const MathForm = () => {
  const [form, setForm] = useState({
    qtn_id: "",
    domain: "",
    question: "",
    clue: "",
    correct_answers: "",
    answer_type: "float",
    tolerance: 0,
    unit: "",
    difficulty: "medium",
    max_score: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      qtn_id: form.qtn_id,
      domain: form.domain,
      question: form.question,
      clue: form.clue,
      correct_answers: form.correct_answers
        .split(",")
        .map((ans) => ans.trim()),
      answer_type: form.answer_type,
      tolerance: Number(form.tolerance),
      unit: form.unit,
      difficulty: form.difficulty,
      max_score: Number(form.max_score),
    };

    try {
      await axios.post("http://localhost:5000/math/create", payload);
      alert("Math question created successfully");
    } catch (err) {
      alert("Error creating math question");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Math Question</h3>

      <input
        name="qtn_id"
        placeholder="Question ID"
        onChange={handleChange}
        required
      />

      <input
        name="domain"
        placeholder="Domain (algebra, calculus...)"
        onChange={handleChange}
        required
      />

      <textarea
        name="question"
        placeholder="Question"
        onChange={handleChange}
        required
      />

      <input
        name="clue"
        placeholder="Clue (optional)"
        onChange={handleChange}
      />

      <input
        name="correct_answers"
        placeholder="Correct Answers (comma separated)"
        onChange={handleChange}
        required
      />

      <select name="answer_type" onChange={handleChange}>
        <option value="integer">Integer</option>
        <option value="float">Float</option>
        <option value="fraction">Fraction</option>
        <option value="expression">Expression</option>
        <option value="text">Text</option>
      </select>

      <input
        type="number"
        step="any"
        name="tolerance"
        placeholder="Tolerance"
        onChange={handleChange}
      />

      <input
        name="unit"
        placeholder="Unit (optional)"
        onChange={handleChange}
      />

      <select name="difficulty" onChange={handleChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <input
        type="number"
        name="max_score"
        placeholder="Max Score"
        onChange={handleChange}
      />

      <button type="submit">Create Math Question</button>
    </form>
  );
};

export default MathForm;