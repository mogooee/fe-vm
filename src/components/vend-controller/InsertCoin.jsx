import { useContext } from "react";
import { AddHistoryContext, CorrectCoinContext, InsertCoinContext, SetInsertCoinContext } from "context";
import { StyledInsertCoin, TotalInsertCoin } from "./VendController.styled";

function InsertCoin() {
  const correctCoin = useContext(CorrectCoinContext);
  const insertCoin = useContext(InsertCoinContext);
  const addHistory = useContext(AddHistoryContext);
  const setInsertCoin = useContext(SetInsertCoinContext);

  const handleInsertCoinBlur = ({ target }) => {
    const inputCoin = Number(target.value);
    target.value = "";

    if (!inputCoin) return;
    const acc = 0;
    const correctedCoin = correctCoin(inputCoin, acc);
    setInsertCoin((prevInsertCoin) => prevInsertCoin + correctedCoin);
    addHistory("INSERT_COIN", {
      coin: correctedCoin,
    });
  };

  return (
    <>
      <StyledInsertCoin type="number" min="0" placeholder="INSERT COIN" onBlur={handleInsertCoinBlur} />
      <TotalInsertCoin>{insertCoin}</TotalInsertCoin>
    </>
  );
}

export { InsertCoin };
