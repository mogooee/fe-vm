import { useState, useCallback } from "react";

function useCoin(init) {
  const [coin, setCoin] = useState(init);

  const selectCoin = useCallback((unit) => {
    setCoin((prevCoin) =>
      prevCoin.map((current) => {
        if (current.unit === unit) {
          return { ...current, count: current.count - 1 };
        }
        return current;
      })
    );
  }, []);

  const correctCoin = useCallback(
    (inputCoin) => {
      let acc = 0;

      for (let i = 0; i < coin.length; i++) {
        const { unit, count } = coin[i];
        for (let i = 0; i < count; i++) {
          if (inputCoin < acc) {
            return acc;
          }
          selectCoin(unit);
          acc += unit;
        }
      }
    },
    [coin, selectCoin]
  );

  return { coin, selectCoin, correctCoin };
}

export { useCoin };
