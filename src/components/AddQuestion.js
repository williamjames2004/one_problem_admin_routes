import React, { useState } from "react";
import QuizForm from "./forms/QuizForm";
import DebugForm from "./forms/DebugForm";
import CodeForm from "./forms/CodeForm";
import MathForm from "./forms/MathForm";
import "./Theme.css";

const AddQuestion = ({ adminCode }) => {
  const [activeTab, setActiveTab] = useState("quiz");

  return (
    <div>
      <h2>Welcome {adminCode}</h2>

      <div className="tabs">
        <button onClick={() => setActiveTab("quiz")}>Quiz</button>
        <button onClick={() => setActiveTab("debug")}>Debug</button>
        <button onClick={() => setActiveTab("code")}>Code</button>
        <button onClick={() => setActiveTab("math")}>Math</button>
      </div>

      <div className="tab-content">
        {activeTab === "quiz" && <QuizForm />}
        {activeTab === "debug" && <DebugForm />}
        {activeTab === "code" && <CodeForm />}
        {activeTab === "math" && <MathForm />}
      </div>
    </div>
  );
};

export default AddQuestion;