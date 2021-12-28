import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/partials/Navbar";
import "./App.css";
import "./util.css";

function App() {

  return (
    <div className="App">
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<h2>Home</h2>} />
          <Route path="about" element={<h2>About</h2>} />
        </Routes>

        <footer>&copy; 2021 Sebastian Mineur</footer>
      </main>
    </div>
  );
}

export default App;
