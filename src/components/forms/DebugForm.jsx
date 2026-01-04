import React, { useState } from "react";
import axios from "axios";

const DebugForm = () => {
  const [debug, setDebug] = useState({
    program_id: "",
    program_name: "",
    buggy_program: "",
    language: "python",
    max_score: 1,
  });

  const [testCaseCount, setTestCaseCount] = useState(0);
  const [testCases, setTestCases] = useState([]);

  /* ---------- Handlers ---------- */

  const handleChange = (e) => {
    setDebug({ ...debug, [e.target.name]: e.target.value });
  };

  const handleTestCaseCount = (e) => {
    const count = Number(e.target.value);
    setTestCaseCount(count);

    const temp = Array.from({ length: count }, () => ({
      input: "",
      expected_output: "",
      weight: 1,
    }));

    setTestCases(temp);
  };

  const handleTestCaseChange = (index, field, value) => {
    const updated = [...testCases];
    updated[index][field] = value;
    setTestCases(updated);
  };

  /* ---------- Submit ---------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...debug,
      test_cases: testCases,
    };

    await axios.post("http://localhost:5000/debug/create", payload);

    alert("Debug problem created successfully");
  };

  /* ---------- UI ---------- */

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Debug Problem</h3>

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
        name="buggy_program"
        placeholder="Buggy Program"
        onChange={handleChange}
        required
      />

      <select name="language" onChange={handleChange}>
        <option value="python">Python</option>
        <option value="c">C</option>
        <option value="java">Java</option>
      </select>

      <input
        type="number"
        name="max_score"
        placeholder="Max Score"
        onChange={handleChange}
      />

      {/* ---------- Test Cases ---------- */}
      <h4>Test Cases</h4>

      <input
        type="number"
        placeholder="How many test cases?"
        min="1"
        onChange={handleTestCaseCount}
      />

      {testCases.map((tc, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "10px" }}>
          <h5>Test Case {index + 1}</h5>

          <input
            placeholder="Input"
            value={tc.input}
            onChange={(e) =>
              handleTestCaseChange(index, "input", e.target.value)
            }
            required
          />

          <input
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
        </div>
      ))}

      <button type="submit">Create Debug</button>
    </form>
  );
};

export default DebugForm;