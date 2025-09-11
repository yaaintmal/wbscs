// This script demonstrates a basic asynchronous function to fetch data from an API.

// Define an asynchronous function to handle the API call.
const fetchData = async () => {
  // Use a try...catch block for robust error handling.
  try {
    // Replace 'https://api.example.com/data' with the URL of the API you want to fetch from.
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    // Check if the response was successful (status code 200-299).
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON data from the response.
    const data = await response.json();

    // Log the fetched data to the console.
    console.log("Data fetched successfully:");
    console.log(data);
  } catch (error) {
    // Log any errors that occurred during the fetch operation.
    console.error("Error fetching data:", error);
  }
};

// Call the function to start the fetch process.
fetchData();
