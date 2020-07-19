import React, { useState } from "react";
import he from "he";

const Question = ({ data, num, answerCallback }) => {
  let [clickedName, setClickedName] = useState("");
  const qArray = [];
  function score(name) {
    if (clickedName === "") {
      setClickedName(name);
      answerCallback(name === data.correct_answer);
    }
  }

  function getClasses(name) {
    let classes = "answer";
    if (data.correct_answer === name) {
      classes += " correct";
    } else {
      classes += " incorrect";
    }
    if (clickedName === name) {
      classes += " clicked";
    }
    if (clickedName !== "") {
      classes += " show";
    }
    return classes;
  }

  if (data.type === "multiple") {
    let i = 0;
    for (let incorrect of data.incorrect_answers) {
      if (i === num) {
        i++;
      }
      qArray[i] = (
        <button
          key={i}
          className={getClasses(incorrect)}
          onClick={() => score(incorrect)}
        >
          {he.decode(incorrect)}
        </button>
      );
      i++;
    }
    qArray[num] = (
      <button
        key={i}
        className={getClasses(data.correct_answer)}
        onClick={() => score(data.correct_answer)}
      >
        {he.decode(data.correct_answer)}
      </button>
    );
  }
  return (
    <div className="question-box">
      <h1 className="question">{he.decode(data.question)}</h1>
      <span className="question-difficulty">
        <strong>Difficulty: </strong>
        {data.difficulty === "easy"
          ? "Easy"
          : data.difficulty === "medium"
          ? "Medium"
          : "Hard"}
      </span>
      <br />
      <span className="question-category">
        <strong>Category: </strong>
        {he.decode(data.category)}
      </span>
      <hr />
      {data.type === "multiple" ? (
        qArray
      ) : (
        <>
          <button className={getClasses("True")} onClick={() => score("True")}>
            True
          </button>
          <button
            className={getClasses("False")}
            onClick={() => score("False")}
          >
            False
          </button>
        </>
      )}
    </div>
  );
};

export default Question;
