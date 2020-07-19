import React, { useEffect } from "react";

const CategorySelectCheckboxes = ({ data, callback, value }) => {
  const options = [];
  function flip(val) {
    let tempArr = value.slice(0, value.length);
    if (tempArr.includes(val.name)) {
      if (tempArr.indexOf(val.name) !== -1)
        tempArr.splice(tempArr.indexOf(val.name), 1);
    } else {
      tempArr.push(val.name);
    }
    callback(tempArr);
  }
  for (let key in data) {
    let val = data[key];
    options.push(
      <span key={val.id}>
        <span
          onClick={() => flip(val)}
          style={{
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
        >
          <input
            onChange={(event) => {}}
            checked={value.includes(val.name)}
            type="checkbox"
          />
          <label
            style={{
              marginLeft: "5px",
              marginBottom: "0",
              color: `${value.includes(val.name) ? "#80FF80" : "#FF8080"}`,
            }}
          >
            {val.name}
          </label>
        </span>
        {key < data.length - 1 ? " - " : ""}
      </span>
    );
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", userSelect: "none" }}>
      {options}
    </div>
  );
};

export default CategorySelectCheckboxes;
