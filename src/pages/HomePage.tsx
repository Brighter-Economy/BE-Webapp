import CustomSpinner from "../components/CustomSpinner";
import SuggestedCommandToast from "../components/SuggestedCommandToast";

function HomePage() {
  return (
    <>
      <div className="pt-3 ps-3 pe-3 d-flex">
        <h1 className="display-6">HomePage :3</h1>
      </div>
      <div>
        <SuggestedCommandToast />
      </div>
      <div>
        <CustomSpinner />
      </div>
    </>
  );
}

export default HomePage;
