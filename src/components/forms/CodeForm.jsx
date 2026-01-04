import React, { useState } from "react";
import axios from "axios";

const CodeForm = () => {
  const [code, setCode] = useState({
    program_id: "",
    program_name: "",
    problem_statement: "",
    language: "python",
    constraints: "",
    difficulty: "easy",
    max_score: 1,
    tags: "",
  });

  const [testCaseCount, setTestCaseCount] = useState(0);
  const [testCases, setTestCases] = useState([]);

  /* ---------------- handlers ---------------- */

  const handleChange = (e) => {
    setCode({ ...code, [e.target.name]: e.target.value });
  };

  const handleTestCaseCount = (e) => {
    const n = parseInt(e.target.value) || 0;
    setTestCaseCount(n);

    setTestCases(
      Array.from({ length: n }, () => ({
        input: "",
        expected_output: "",
        weight: 1,
        is_hidden: true,
      }))
    );
  };

  const handleTestCaseChange = (index, field, value) => {
    const updated = [...testCases];
    updated[index][field] =
      field === "is_hidden" ? value : value;
    setTestCases(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...code,
      tags: code.tags
        ? code.tags.split(",").map((t) => t.trim())
        : [],
      test_cases: testCases,
    };

    await axios.post("https://one-problem-per-day.onrender.com/code/create", payload);

    alert("Code problem created successfully");
  };

  /* ---------------- UI ---------------- */

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Coding Problem</h3>

      <input
        name="program_id"
        placeholder="Program ID"
        onChange={handleChange}
        required
      />

      <input
        name="program_name"
        placeholder="Program Name"
        onChange={handleChange}
        required
      />

      <textarea
        name="problem_statement"
        placeholder="Problem Statement"
        onChange={handleChange}
        required
      />

      <textarea
        name="constraints"
        placeholder="Constraints (optional)"
        onChange={handleChange}
      />

      {/* Language */}
      <select name="language" onChange={handleChange}>
        <option value="python">Python</option>
        <option value="c">C</option>
        <option value="java">Java</option>
      </select>

      {/* Difficulty */}
      <select name="difficulty" onChange={handleChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      {/* Max Score */}
      <input
        type="number"
        name="max_score"
        placeholder="Max Score"
        onChange={handleChange}
      />

      {/* Tags */}
      <input
        name="tags"
        placeholder="Tags (comma separated)"
        onChange={handleChange}
      />

      {/* Test case count */}
      <input
        type="number"
        placeholder="How many test cases?"
        onChange={handleTestCaseCount}
        min="0"
      />

      {/* Dynamic test cases */}
      {testCases.map((tc, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: 10, marginTop: 10 }}>
          <h4>Test Case {index + 1}</h4>

          <textarea
            placeholder="Input"
            value={tc.input}
            onChange={(e) =>
              handleTestCaseChange(index, "input", e.target.value)
            }
            required
          />

          <textarea
            placeholder="Expected Output"
            value={tc.expected_output}
            onChange={(e) =>
              handleTestCaseChange(index, "expected_output", e.target.value)
            }
            required
          />

          <input
            type="number"
            placeholder="Weight"
            value={tc.weight}
            onChange={(e) =>
              handleTestCaseChange(index, "weight", Number(e.target.value))
            }
          />

          <label>
            Hidden?
            <input
              type="checkbox"
              checked={tc.is_hidden}
              onChange={(e) =>
                handleTestCaseChange(index, "is_hidden", e.target.checked)
              }
            />
          </label>
        </div>
      ))}

      <button type="submit">Create Code Problem</button>
    </form>
  );
};


export default CodeForm;
