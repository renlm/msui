function isCancelablePromiseRejection(promise) {
  return typeof promise === "object" && promise !== null && "isCanceled" in promise;
}
const makePromiseCancelable = (promise) => {
  let hasCanceled_ = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    const canceledPromiseRejection = { isCanceled: true };
    promise.then((val) => hasCanceled_ ? reject(canceledPromiseRejection) : resolve(val));
    promise.catch((error) => hasCanceled_ ? reject(canceledPromiseRejection) : reject(error));
  });
  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    }
  };
};

export { isCancelablePromiseRejection, makePromiseCancelable };
//# sourceMappingURL=CancelablePromise.js.map
