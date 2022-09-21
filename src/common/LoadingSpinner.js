import "./LoadingSpinner.css";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <div className="LoadingSpinner" role="status">
      Loading...
    </div>
  );
}

export default LoadingSpinner;