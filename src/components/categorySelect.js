import React from "react";

const CategorySelect = ({ data }) => {
  const options = [];
  for (let val of data) {
    options.push(
      <option key={val.id} value={val.id}>
        {val.name}
      </option>
    );
  }
  return <>{options}</>;
};

export default CategorySelect;
