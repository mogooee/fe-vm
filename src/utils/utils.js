const near = (arr, target) => {
  if (target > arr[arr.length - 1]) return arr[arr.length - 1];

  let near = 0;
  let abs = 0;
  let min = 10000;

  for (const element of arr) {
    abs = element - target;
    abs = abs < 0 ? -abs : abs;

    if (abs < min) {
      min = abs;
      near = element;
    }
  }

  return near;
};

export { near };
