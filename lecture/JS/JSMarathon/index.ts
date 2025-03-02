enum PromiseState {
    PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected",
}

type TPromiseResolve<T> = (value: T) => void;
type TPromiseReject<K> = (reason: K) => void;
type TPromiseExecutor<T, K> = (resolve: T, reject: K) => void;
type TPromiseThenCallback<T> = (value: T | undefined) => void;
type TPromiseCatchCallback<K> = (reason: K | undefined) => void;
type TPromiseFinallyCallback = () => void;



class MyPromise<T, K> {
    private _state: PromiseState = PromiseState.PENDING;
    private _successCallbackHandlers: TPromiseThenCallback<T>[] = [];
    private _errorCallbakcHandlers: TPromiseCatchCallback<K>[] = [];
    private _finallyCallbackHandler: TPromiseFinallyCallback | undefined = undefined;
    private _value: T | undefined = undefined;
    private _reason: K | undefined = undefined;
    constructor(executor: TPromiseExecutor<T, K>) {
        executor(
            this._promiseResolver.bind(this),
            this._promiseRejector.bind(this)
        );
    }

    public then(handlerFunction: TPromiseThenCallback<T>) {
        if (this._state === PromiseState.FULFILLED) {
            handlerFunction(this._value);
        } else {
            this._successCallbackHandlers.push(handlerFunction);
        }
        return this;
    }

    public catch(handlerFunction: TPromiseCatchCallback<K>) {
        if (this._state === PromiseState.REJECTED) {
            handlerFunction(this._reason);
        } else {
            this._errorCallbakcHandlers.push(handlerFunction);
        }
        return this;
    }

    public finally(handlerFunction: TPromiseFinallyCallback) {
        if (this._state !== PromiseState.PENDING) return handlerFunction();

        this._finallyCallbackHandler = handlerFunction
    }

    private _promiseResolver(value: T) {
        if (this._state === PromiseState.FULFILLED) return;

        this._state = PromiseState.FULFILLED;
        this._value = value;
        this._successCallbackHandlers.forEach((cb) => cb(value));
        if (this._finallyCallbackHandler) this._finallyCallbackHandler();
    }

    private _promiseRejector(reason: K) {
        if (this._state === PromiseState.REJECTED) return;

        this._state = PromiseState.REJECTED;
        this._reason = reason;
        this._errorCallbakcHandlers.forEach((cb) => cb(reason));
        if (this._finallyCallbackHandler) this._finallyCallbackHandler();
    }
}

function customPromise() {
    return new MyPromise<string, string>((res, rej) => {
        // ....
        res("OK");
    });
}
customPromise()
    .then((value) => console.log("Custom Promise Done", value))
    .catch((reason) => {
        console.log("Rejected because", reason);
    });
const waitFor = (s: number) =>
    new MyPromise<number, number>((res, rej) => {
        setTimeout(() => res(s), s * 1000);
    });

waitFor(5)
    .then((value) => {
        console.log(`Promise resolve`, value);
    })
    .catch((err) => {
        console.log(`Promise rejected`, err);
    });
.finally(() => {
    console.log(`All Good`);
});
