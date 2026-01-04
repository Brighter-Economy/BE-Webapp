import spinnerURL from "../assets/Spinner.png";
import "./CustomSpinner.css";

function CustomSpinner() {
  return (
    <>
      <div>
        <img src={spinnerURL} className="spinner" />
      </div>
    </>
  );
}
export default CustomSpinner;
