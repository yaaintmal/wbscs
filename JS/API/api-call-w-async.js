// write a simple function that returns the output of an api call of https://jsonplaceholder.typicode.com/todos

const getTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  // returning first 5 todos
  return data.slice(0, 5);
};

getTodos().then((data) => console.log(data));

// write a simple function that returns the output of an api call of https://jsonplaceholder.typicode.com/posts

const getPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  // returning last 5 items
  return data.slice(-5);
};

getPosts().then((data) => console.log(data));
