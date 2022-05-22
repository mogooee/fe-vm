import { useState, useCallback } from "react";
import { near } from "utils";

function useCoin(init) {
  const [coin, setCoin] = useState(init);

  const changeCount = (type, count, prevCoin, unit) => {
    const num = type === "decrease" ? -count : count;
    return prevCoin.map((current) => {
      if (current.unit === unit) {
        return { ...current, count: current.count + num };
      }
      return current;
    });
  };

  const selectCoin = useCallback((unit) => {
    const type = "decrease";
    const num = 1;
    setCoin((prevCoin) => changeCount(type, num, prevCoin, unit));
  }, []);

  const initCoin = (totalCoin) => {
    setCoin((prevCoin) =>
      prevCoin.map((current) => {
        return { ...current, count: 0 };
      })
    );
    return totalCoin;
  };

  const correctCoin = useCallback(
    (inputCoin, acc) => {
      let copyCoin = coin;
      const totalCoin = coin.reduce((acc, { unit, count }) => acc + unit * count, 0);

      if (inputCoin > totalCoin) return initCoin(totalCoin);

      function recursive(remainCoin) {
        const unitArr = copyCoin.map(({ count, unit }) => count && unit).filter((e) => e !== 0);
        const unit = near(unitArr, remainCoin);

        const nearCoin = copyCoin.find((e) => e.unit === unit).unit;

        acc += nearCoin;
        const type = "decrease";
        const count = 1;
        copyCoin = changeCount(type, count, copyCoin, unit);

        if (inputCoin <= acc) {
          setCoin(copyCoin);
          return acc;
        }

        const result = recursive(remainCoin - nearCoin, acc);
        return result;
      }

      return recursive(inputCoin, acc);
    },
    [coin]
  );

  const returnChange = useCallback(
    (change) => {
      let copyCoin = coin;

      function recursive(remainCoin) {
        const unitArr = copyCoin.map((e) => e.unit);
        const unit = near(unitArr, remainCoin);

        const nearCoin = copyCoin.find((e) => e.unit === unit).unit;

        change -= nearCoin;
        const type = "increase";
        const num = 1;
        copyCoin = changeCount(type, num, copyCoin, unit);

        if (!change) {
          setCoin(copyCoin);
          return;
        }

        const result = recursive(change);
        return result;
      }

      return recursive(change);
    },
    [coin]
  );

  return { coin, selectCoin, correctCoin, returnChange };
}

export { useCoin };
