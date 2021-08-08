
 const PromiseAllSettled = (arrayOfPromises = [], optionsObject = {}) => {
  const { critcalIndexes = []} = optionsObject;
  if (Object.prototype.toString.call(arrayOfPromises) !== '[object Array]') return false;
  return new Promise((resolve, reject) => {
    const resultArray = [];

    if (!arrayOfPromises.length) resolve(arrayOfPromises);
    let pendingPromises = arrayOfPromises.length;

    arrayOfPromises.forEach((promise, index) => {
      promise
        .then((result) => {
          resultArray[index] = { value: result, status: 'resolved', resolved: true, };
          pendingPromises -= 1;
          if (pendingPromises === 0) resolve(resultArray);
        })
        .catch(error => {
          if (!critcalIndexes.length || critcalIndexes.includes(index)) reject(error);
          resultArray[index] = { value: error, status: 'rejected', resolved: false, };
          pendingPromises -= 1;
          if (pendingPromises === 0) resolve(resultArray);
        });
    });
  });
};

export default PromiseAllSettled;
