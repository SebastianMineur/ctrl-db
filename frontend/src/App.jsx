import { Routes, Route, Navigate } from "react-router-dom";

import LoadingPage from "./pages/LoadingPage";
import Navbar from "./pages/partial/Navbar";
import HomePage from "./pages/HomePage";
import NewDevicePage from "./pages/CreateDevicePage";
import DevicePage from "./pages/DevicePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TestPage from "./pages/TestPage";

import { useAuthContext } from "./contexts/AuthContext";
import "./App.css";
import "./util.css";

function App() {
  const { currentUser, loading } = useAuthContext();

  if (loading) return <LoadingPage />;

  return (
    <div className="App">
      <Navbar />

      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="device/:id" element={<DevicePage />} />

          {/* Unauthenticated users */}
          <Route
            path="login"
            element={!currentUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="register"
            element={!currentUser ? <RegisterPage /> : <Navigate to="/" />}
          />

          {/* Authenticated users */}
          <Route
            path="device"
            element={currentUser ? <NewDevicePage /> : <Navigate to="/" />}
          />
          <Route
            path="test"
            element={currentUser ? <TestPage /> : <Navigate to="/" />}
          />
        </Routes>

        <footer>&copy; 2021 Sebastian Mineur</footer>
      </main>
    </div>
  );
}

export default App;
