var PromiseState;
(function (PromiseState) {
    PromiseState["PENDING"] = "pending";
    PromiseState["FULFILLED"] = "fulfilled";
    PromiseState["REJECTED"] = "rejected";
})(PromiseState || (PromiseState = {}));
var MyPromsie = /** @class */ (function () {
    function MyPromsie(executor) {
        this._state = PromiseState.PENDING;
        this._successCallbackHandlers = [];
        this._failureCallbackHandlers = [];
        this._finallyCallbackHandlers = undefined;
        this._value = undefined;
        this._reason = undefined;
        executor(this._promiseResolver.bind(this), this._promiseRejector.bind(this));
    }
    MyPromsie.prototype.then = function (handlerFn) {
        if (this._state === PromiseState.FULFILLED) {
            handlerFn(this._value);
        }
        else {
            this._successCallbackHandlers.push(handlerFn);
        }
        return this;
    };
    MyPromsie.prototype.catch = function (handlerFn) {
        if (this._state === PromiseState.REJECTED) {
            handlerFn(this._reason);
        }
        else {
            this._failureCallbackHandlers.push(handlerFn);
        }
        return this;
    };
    MyPromsie.prototype.finally = function (handlerFn) {
        if (this._state !== PromiseState.PENDING)
            return handlerFn();
        this._finallyCallbackHandlers = handlerFn;
    };
    MyPromsie.prototype._promiseResolver = function (value) {
        if (this._state === PromiseState.FULFILLED)
            return;
        this._state = PromiseState.FULFILLED;
        this._value = value;
        this._successCallbackHandlers.forEach(function (cb) { return cb(value); });
        if (this._finallyCallbackHandlers)
            this._finallyCallbackHandlers();
    };
    MyPromsie.prototype._promiseRejector = function (reason) {
        if (this._state === PromiseState.REJECTED)
            return;
        this._state = PromiseState.REJECTED;
        this._reason = reason;
        this._failureCallbackHandlers.forEach(function (cb) { return cb(reason); });
        if (this._finallyCallbackHandlers)
            this._finallyCallbackHandlers();
    };
    return MyPromsie;
}());
function customPromise2() {
    return new MyPromsie(function (resolve, reject) {
        reject('OK'); //cb()
    });
}
customPromise2()
    .then(function (value) { return console.log('Custom Promise Done', value); })
    .catch(function (reason) { return console.log('Rejected because', reason); });
var waitFor = function (s) {
    return new MyPromsie(function (res, rej) {
        setTimeout(function () { return res(s); }, s * 1000);
    });
};
waitFor(5)
    .then(function (value) {
    console.log("Promise Resolve", value);
})
    .catch(function (reason) {
    console.log("Promise Rejected", reason);
})
    .finally(function () {
    console.log('All good');
});
