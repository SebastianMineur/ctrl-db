import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { alert } from "../assets/icons";

const LoginPage = () => {
  const auth = useAuthContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError("Unknown email or password");
      throw error;
    }
    navigate("/");
  };

  return (
    <div className="container-sm">
      <h2 className="font-xl mt-1 mb-0">Login</h2>
      <p className="mt-0">
        Only registered users can post new devices and commands.
      </p>

      <hr />

      <form onSubmit={handleSubmit}>
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

        {error && (
          <p className="flex align-center gap-1 col-danger bg-danger m-0 py-05 px-1 rounded mb-05">
            <Icon icon={alert} />
            {error}
          </p>
        )}

        <div className="flex column align-center mt-1">
          <Button variant="filled" color="primary" className="mb-05">
            Log in
          </Button>

          <p className="font-xs m-0">
            Not signed up? <Link to="register">Register here</Link>.
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
