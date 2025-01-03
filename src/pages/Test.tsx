import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Test() {
  const { testId } = useParams();

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  useEffect(() => {
    if (!uuidRegex.test(testId!)) {
      console.error("Invalid UUID:", testId);
    }
  }, [testId]);

  return (
    <>
      <div className="pt-3 ps-3 pe-3 d-flex flex-column">
        <h1 className="display-6 mb-3">Test Page :3</h1>
        {uuidRegex.test(testId!) ? (
          <h3 className="display-6">{testId}</h3>
        ) : (
          <h3 className="display-6 text-danger">Invalid UUID</h3>
        )}
      </div>
    </>
  );
}

export default Test;