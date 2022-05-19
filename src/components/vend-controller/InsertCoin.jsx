import styled from "styled-components";
import { useContext } from "react";
import { CorrectCoinContext, InsertCoinContext, SetInsertCoinContext } from "context";

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

  const handleInsertCoinBlur = ({ target }) => {
    const input = target.value;
    if (!input) return;
    const correctedCoin = correctCoin(input);
    setInsertCoin((prevInsertCoin) => prevInsertCoin + correctedCoin);
    target.value = "";
  };

  return (
    <>
      <StyledInsertCoin type="number" min="0" placeholder="INSERT COIN" onBlur={handleInsertCoinBlur} />
      <TotalInsertCoin>{insertCoin}</TotalInsertCoin>
    </>
  );
}

export { InsertCoin };
