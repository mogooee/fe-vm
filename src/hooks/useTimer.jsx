import { useState } from "react";

const useTimer = () => {
  const [timerId, setTimerId] = useState(undefined);

  const setTimer = (callback, delay) => {
    if (timerId) clearTimeout(timerId);
    setTimerId(setTimeout(callback, delay));
  };

  return { setTimer };
};

export { useTimer };
