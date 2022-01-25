import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/partials/Navbar";
import HomePage from "./pages/HomePage";
import NewDevicePage from "./pages/NewDevicePage";
import DevicePage from "./pages/DevicePage";
import LoginPage from "./pages/LoginPage";
import TestPage from "./pages/TestPage";
import "./App.css";
import "./util.css";

function App() {
  return (
    <div className="App">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="device" element={<NewDevicePage />} />
          <Route path="device/:id" element={<DevicePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="test" element={<TestPage />} />
        </Routes>

        <footer>&copy; 2021 Sebastian Mineur</footer>
      </main>
    </div>
  );
}

export default App;
