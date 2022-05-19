import { useCallback } from "react";

const { createContext, useReducer } = require("react");

function historyReducer(histories, { type, history }) {
  switch (type) {
    case "INSERT_COIN":
      return {
        history: histories.history.concat({
          ...history,
          id: histories.history.length + 1,
          comment: `${history.coin}원이 투입되었습니다.`,
        }),
      };
    default:
      return histories;
  }
}

const initialHistory = {
  history: [],
};

const HistoryContext = createContext();

function HistoryProvider({ children }) {
  const [histories, dispatch] = useReducer(historyReducer, initialHistory);

  const addHistory = useCallback((type, history) => {
    dispatch({
      type,
      history,
    });
  }, []);

  return <HistoryContext.Provider value={{ histories, addHistory }}>{children}</HistoryContext.Provider>;
}

export { HistoryContext, HistoryProvider };
