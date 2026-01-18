import React from "react";

// Use effect only works after the first render []
// if we don't pass the second argument it will run on every re render
// if we pass a variable [var] it will run when that variable changes

const UseEffect = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      const result = await response.json();
      setData(result);
    };

    getData();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};

export default UseEffect;
