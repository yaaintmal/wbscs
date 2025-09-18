// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

// importing styles
import "./App.css";

// importing components
import Nav from "./components/Navigation";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Students from "./components/Students";
import Services from "./components/Services";
import Footer from "./components/Footer";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <Students></Students>
      <Services></Services>
      <Footer></Footer>
    </>
  );
}

export default App;
