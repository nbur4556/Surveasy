import React from "react";
import "./answer.css";

function Answer(answer) {
    return (
      <div onClick="#">
        {answer}
      </div>
    );
};

export default Answer;