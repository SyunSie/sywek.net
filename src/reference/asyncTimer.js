const asyncTimer = (msec) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(msec);
    }, msec);
  });
};

export default asyncTimer;
