import React, { createContext } from "react";
import { useCoin } from "hooks";
import { money } from "data";
import { useTimer } from "hooks";
import { SetInsertCoinContext, InsertCoinContext, AddHistoryContext } from "context";
import { useEffect } from "react";
import { useContext } from "react";

const CoinContext = createContext();
const SelectCoinContext = createContext();
const CorrectCoinContext = createContext();

function CoinProvider({ children }) {
  const { coin, selectCoin, correctCoin } = useCoin(money);
  const { setDebounce } = useTimer();
  const insertCoin = useContext(InsertCoinContext);
  const addHistory = useContext(AddHistoryContext);
  const setInsertCoin = useContext(SetInsertCoinContext);

  const autoReturn = () => {
    setInsertCoin(0);
    addHistory("RETURN_COIN", { change: insertCoin });
  };

  useEffect(() => {
    if (!insertCoin) return;
    const delaySelectTime = 3000;
    setDebounce(autoReturn, delaySelectTime);
  }, [insertCoin]);

  return (
    <CoinContext.Provider value={coin}>
      <SelectCoinContext.Provider value={selectCoin}>
        <CorrectCoinContext.Provider value={correctCoin}>{children}</CorrectCoinContext.Provider>
      </SelectCoinContext.Provider>
    </CoinContext.Provider>
  );
}

export { CoinContext, SelectCoinContext, CorrectCoinContext, CoinProvider };
