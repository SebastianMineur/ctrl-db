import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/partials/Navbar";
import DevicePage from "./pages/DevicePage";
import "./App.css";
import "./util.css";

function App() {
  return (
    <div className="App">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<h2>Home</h2>} />
          <Route path="device" element={<DevicePage />} />
        </Routes>

        <footer>&copy; 2021 Sebastian Mineur</footer>
      </main>
    </div>
  );
}

export default App;
