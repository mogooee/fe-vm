import React, { createContext, useEffect, useContext } from "react";
import { useCoin, useTimer } from "hooks";
import { SetInsertCoinContext, InsertCoinContext, AddHistoryContext } from "context";
import { money } from "data";

const CoinContext = createContext();
const SelectCoinContext = createContext();
const CorrectCoinContext = createContext();
const ReturnCoinContext = createContext();

function CoinProvider({ children }) {
  const { coin, selectCoin, correctCoin, returnChange } = useCoin(money);
  const { timerId, setDebounce } = useTimer();
  const insertCoin = useContext(InsertCoinContext);
  const addHistory = useContext(AddHistoryContext);
  const setInsertCoin = useContext(SetInsertCoinContext);

  const autoReturn = () => {
    const change = insertCoin;
    if (!change) return;
    setInsertCoin(0);
    addHistory("RETURN_COIN", { change });
    returnChange(change);
  };

  useEffect(() => {
    if (!timerId && !insertCoin) return;
    const delaySelectTime = 3000;
    setDebounce(autoReturn, delaySelectTime);
  }, [insertCoin]);

  return (
    <CoinContext.Provider value={coin}>
      <SelectCoinContext.Provider value={selectCoin}>
        <CorrectCoinContext.Provider value={correctCoin}>
          <ReturnCoinContext.Provider value={autoReturn}>{children}</ReturnCoinContext.Provider>
        </CorrectCoinContext.Provider>
      </SelectCoinContext.Provider>
    </CoinContext.Provider>
  );
}

export { CoinContext, SelectCoinContext, CorrectCoinContext, ReturnCoinContext, CoinProvider };
