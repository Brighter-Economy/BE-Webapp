import { useParams } from "react-router-dom";

function Test() {
  const { testId } = useParams();
  console.log(testId);

  return (
    <>
      <div className="pt-3 ps-3 pe-3 d-flex flex-column">
        <h1 className="display-6 mb-3">Test Page :3</h1>
        <h3 className="display-6">{testId}</h3>
      </div>
    </>
  );
}

export default Test;