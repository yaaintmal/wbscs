// Components
import Navbar from "./Navbar.jsx";
import Students from "./components/Students.jsx";
import Product from "./components/Product.jsx";
// Styles
import "./App.css";
// Data
import students from "./data/students.js";

function App() {
  const libName = "react-fundamentals";
  return (
    <>
      <h1>{libName}</h1>
      <Navbar />
      <Students data={students} />
      <Product
        product="Veganes Katzenfutter"
        description="lecker für Katzen"
        price="1.99€"
      />
      <Product
        product="nicht ganz veganes Katzenfutter"
        description="fast lecker für Katzen"
        price="0.99€"
      />
    </>
  );
}

export default App;
