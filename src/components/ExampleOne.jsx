import React from "react";

const ExampleOne = () => {
  const [toDoList, setToDoList] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setToDoList([...toDoList, inputValue]);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h1>To do List</h1>
      <div>
        {toDoList.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Add a new value"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExampleOne;
