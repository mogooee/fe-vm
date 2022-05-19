import { Button } from "components";
import { InsertCoinContext } from "context";
import { useContext } from "react";

function SelectButton({ name, price, stocked }) {
  const insertCoin = useContext(InsertCoinContext);

  const isPurchasable = () => {
    if (!insertCoin) return stocked;
    return stocked && price < insertCoin;
  };

  return (
    <Button
      color={isPurchasable() ? "green" : "white"}
      size="small"
      disabled={isPurchasable() ? false : true}
    >
      <strong>{name}</strong>
    </Button>
  );
}

export { SelectButton };
