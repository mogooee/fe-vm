import styled from "styled-components";
import { useContext } from "react";
import {
  CorrectCoinContext,
  InsertCoinContext,
  SetInsertCoinContext,
  AddHistoryContext,
  SetInsertCoinFlagContext,
} from "context";
import { useEffect } from "react";

const StyledInsertCoin = styled.input`
  width: 100%;
  height: 70px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 10px;
  margin: 0px 10px 10px 0px;
  text-align: center;
  font-size: 1.5em;

  &:focus {
    outline: none;
  }
`;

const TotalInsertCoin = styled.p`
  color: #f2f2f2;
  border: 2px solid;
  border-radius: 10px;
  padding: 20px;
`;

function InsertCoin() {
  const correctCoin = useContext(CorrectCoinContext);
  const insertCoin = useContext(InsertCoinContext);
  const setInsertCoin = useContext(SetInsertCoinContext);
  const addHistory = useContext(AddHistoryContext);
  //const setInsertCoinFlag = useContext(SetInsertCoinFlagContext);

  const handleInsertCoinBlur = ({ target }) => {
    const inputCoin = Number(target.value);
    target.value = "";

    if (!inputCoin) return;
    const correctedCoin = correctCoin(inputCoin);
    setInsertCoin((prevInsertCoin) => prevInsertCoin + correctedCoin);
    addHistory("INSERT_COIN", {
      coin: correctedCoin,
    });
    // setInsertCoinFlag(true);
  };

  useEffect(() => {
    if (!insertCoin) return;
    const delaySelectTime = 5000;

    //디바운스 처리
    setTimeout(() => {
      // setInsertCoinFlag(false);
      setInsertCoin(0);
      addHistory("RETURN_COIN", { change: insertCoin });
    }, delaySelectTime);
  }, [insertCoin]);

  return (
    <>
      <StyledInsertCoin type="number" min="0" placeholder="INSERT COIN" onBlur={handleInsertCoinBlur} />
      <TotalInsertCoin>{insertCoin}</TotalInsertCoin>
    </>
  );
}

export { InsertCoin };
