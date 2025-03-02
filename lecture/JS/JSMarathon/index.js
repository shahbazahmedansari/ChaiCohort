var PromiseState;
(function (PromiseState) {
    PromiseState["PENDING"] = "pending";
    PromiseState["FULFILLED"] = "fulfilled";
    PromiseState["REJECTED"] = "rejected";
})(PromiseState || (PromiseState = {}));
var MyPromise = /** @class */ (function () {
    function MyPromise(executor) {
        this._state = PromiseState.PENDING;
        this._successCallbackHandlers = [];
        this._errorCallbakcHandlers = [];
        this._value = undefined;
        this._reason = undefined;
        executor(this._promiseResolver.bind(this), this._promiseRejector.bind(this));
    }
    MyPromise.prototype.then = function (handlerFunction) {
        if (this._state === PromiseState.FULFILLED) {
            handlerFunction(this._value);
        }
        else {
            this._successCallbackHandlers.push(handlerFunction);
        }
        return this;
    };
    MyPromise.prototype.catch = function (handlerFunction) {
        if (this._state === PromiseState.REJECTED) {
            handlerFunction(this._reason);
        }
        else {
            this._errorCallbakcHandlers.push(handlerFunction);
        }
        return this;
    };
    MyPromise.prototype._promiseResolver = function (value) {
        if (this._state === PromiseState.FULFILLED)
            return;
        this._state = PromiseState.FULFILLED;
        this._value = value;
        this._successCallbackHandlers.forEach(function (cb) { return cb(value); });
    };
    MyPromise.prototype._promiseRejector = function (reason) {
        if (this._state === PromiseState.REJECTED)
            return;
        this._state = PromiseState.REJECTED;
        this._reason = reason;
        this._errorCallbakcHandlers.forEach(function (cb) { return cb(reason); });
    };
    return MyPromise;
}());
function customPromise() {
    return new MyPromise(function (resolve, reject) {
        // ....
        resolve("OK");
    });
}
customPromise().then(function () { return console.log("Custom Promise Done"); });
var waitFor = function (s) {
    return new MyPromise(function (res, rej) {
        setTimeout(function () { return res(s); }, s * 1000);
    });
};
waitFor(5)
    .then(function (value) {
    console.log("Promise resolve", value);
})
    .catch(function (err) {
    console.log("Promise rejected", err);
});
// .finally(() => {
//     console.log(`All Good`);
// });
