import React, { useState, useEffect } from "react";
import SEO from "../components/seo";
import Question from "../components/question";
import CategorySelect from "../components/categorySelect";
import CategorySelectCheckboxes from "../components/categorySelectCheckboxes";

const IndexPage = () => {
  const [list, setList] = useState([]);
  const [amount, setAmount] = useState(50);
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");
  const [type, setType] = useState("any");
  const [blockedCategories, setBlockedCategories] = useState([
    "Entertainment: Japanese Anime & Manga",
  ]);
  const [categoryData, setCategoryData] = useState([]);
  const [score, setScore] = useState(0);
  const [outOf, setOutOf] = useState(0);

  useEffect(() => {
    async function updateCategories() {
      const resCat = await fetch("https://opentdb.com/api_category.php");
      if (resCat && resCat.ok) {
        const json = await resCat.json();
        setCategoryData(json.trivia_categories);
      }
    }
    updateCategories();
  }, []);

  function resetForm() {
    setAmount(50);
    setCategory("any");
    setDifficulty("any");
    setType("any");
    setBlockedCategories(["Entertainment: Japanese Anime & Manga"]);
  }

  function resetScore() {
    setScore(0);
    setOutOf(0);
  }

  function onAnswer(correct) {
    setOutOf((original) => original + 1);
    setScore((original) => (correct ? original + 1 : original));
  }

  async function getQuestions() {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${amount}${
        category !== "any" ? `&category=${category}` : ""
      }${difficulty !== "any" ? `&difficulty=${difficulty}` : ""}${
        type !== "any" ? `&type=${type}` : ""
      }`
    );
    if (res && res.ok) {
      const json = await res.json();
      const result = json.results;
      const tempList = [];
      console.log(blockedCategories);
      for (let val of result) {
        console.log(
          val.category + " " + blockedCategories.includes(val.category)
        );
        if (category !== "any" || !blockedCategories.includes(val.category)) {
          tempList.push(
            <Question
              key={val.question}
              data={val}
              num={Math.floor(Math.random() * 4)}
              answerCallback={onAnswer}
            />
          );
        }
      }
      setList(tempList);
    }
  }

  return (
    <>
      <SEO title="Home" />
      <main>
        <div className="scorecard">
          <strong>Score: </strong>
          {score}/{outOf} (
          {outOf !== 0 ? `${Math.floor((score / outOf) * 100)}%` : "0%"})
        </div>
        <div
          className="question-form"
          style={{ paddingLeft: "20px", paddingRight: "20px" }}
        >
          <h1>
            Settings{" "}
            <button className="btn btn-secondary" onClick={resetForm}>
              Reset Form
            </button>
          </h1>

          <label htmlFor="amount">Number of Questions:</label>
          <input
            name="amount"
            type="number"
            className="form-control"
            min="1"
            max="50"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label htmlFor="category">Select Category: </label>
          <select
            name="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="any">Any Category</option>
            {categoryData.length > 0 ? (
              <CategorySelect data={categoryData} />
            ) : (
              ""
            )}
          </select>
          {categoryData.length > 0 && category === "any" ? (
            <>
              <label htmlFor="category-exclude">Exclude Categories: </label>
              <div name="category-exclude" className="checkbox-list">
                <CategorySelectCheckboxes
                  data={categoryData}
                  value={blockedCategories}
                  callback={setBlockedCategories}
                />
              </div>
            </>
          ) : (
            ""
          )}
          <label htmlFor="difficulty">Select Difficulty: </label>
          <select
            name="difficulty"
            className="form-control"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <label htmlFor="type">Select Type: </label>
          <select
            name="type"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="any">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
          <br />
          <button
            className="btn btn-lg btn-primary btn-block"
            onClick={getQuestions}
          >
            Get Questions
          </button>
        </div>
        <h1 style={{ marginLeft: "20px" }}>
          Questions{" "}
          <button className="btn btn-danger" onClick={resetScore}>
            Reset Score
          </button>
        </h1>
        <div className="questions-list">{list}</div>
      </main>
    </>
  );
};

export default IndexPage;
