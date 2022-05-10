import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Icon from "../components/Icon";

import { useAuthContext } from "../contexts/AuthContext";
import { alert } from "../assets/icons";

const RegisterPage = () => {
  const auth = useAuthContext();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords do not match!");
      return;
    }
    try {
      await auth.register(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch (error) {
      setError(error.message);
      throw error;
    }
    navigate("/");
  };

  return (
    <div className="container-sm">
      <h2 className="font-xl mt-1 mb-0">Register</h2>
      <p className="mt-0">Sign up as a new user.</p>

      <hr />

      <form onSubmit={handleSubmit}>
        <div className="flex column gap-05">
          <label>Name</label>
          <input
            ref={nameRef}
            type="name"
            required
            className="bg-white mb-1"
            onChange={() => setError(null)}
          />
        </div>

        <div className="flex column gap-05">
          <label>Email</label>
          <input
            ref={emailRef}
            type="email"
            required
            className="bg-white mb-1"
            onChange={() => setError(null)}
          />
        </div>

        <div className="flex column gap-05">
          <label>Password</label>
          <input
            ref={passwordRef}
            type="password"
            required
            className="bg-white mb-1"
            onChange={() => setError(null)}
          />
        </div>

        <div className="flex column gap-05">
          <label>Confirm password</label>
          <input
            ref={confirmPasswordRef}
            type="password"
            required
            className="bg-white mb-1"
            onChange={() => setError(null)}
          />
        </div>

        {error && (
          <p className="flex align-center gap-1 col-danger bg-danger m-0 py-05 px-1 rounded mb-05">
            <Icon icon={alert} />
            {error}
          </p>
        )}

        <div className="flex column align-center mt-1">
          <Button variant="filled" color="primary" className="mb-05">
            Register
          </Button>

          <p className="font-xs m-0">
            Already a user? <Link to="/login">Back to login</Link>.
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
