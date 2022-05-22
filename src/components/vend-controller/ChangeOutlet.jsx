import { Button } from "components";
import { ReturnCoinContext } from "context";
import { useContext } from "react";

function ChangeOutlet() {
  const autoReturn = useContext(ReturnCoinContext);

  return (
    <Button color="black" size="large" onClick={autoReturn}>
      CHANGE
    </Button>
  );
}

export { ChangeOutlet };
