import Spinner from "../components/Spinner";
import "./css/LoadingPage.css";

const LoadingPage = () => {
  return (
    <div className="LoadingPage col-primary">
      <Spinner size="100px" />
    </div>
  );
};

export default LoadingPage;
