enum PromiseState {
	PENDING = 'pending',
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected',
}

type TPromiseResolve<T> = (value: T) => void;
type TPromiseReject<K> = (reason: K) => void;
type TPromiseExecutor<T, K> = (
	resolve: TPromiseResolve<T>,
	reject: TPromiseReject<K>,
) => void;

type TPromiseThenCallback<T> = (value: T | undefined) => void;
type TPromiseCatchCallback<K> = (reason: K | undefined) => void;
type TPromiseFinallyCallback = () => void;

class MyPromsie<T, K> {
	private _state: PromiseState = PromiseState.PENDING;
	private _successCallbackHandlers: TPromiseThenCallback<T>[] = [];
	private _failureCallbackHandlers: TPromiseCatchCallback<K>[] = [];
	private _finallyCallbackHandlers: TPromiseFinallyCallback | undefined =
		undefined;
	private _value: T | undefined = undefined;
	private _reason: K | undefined = undefined;

	constructor(executor: TPromiseExecutor<T, K>) {
		executor(
			this._promiseResolver.bind(this),
			this._promiseRejector.bind(this),
		);
	}

	public then(handlerFn: TPromiseThenCallback<T>) {
		if (this._state === PromiseState.FULFILLED) {
			handlerFn(this._value);
		} else {
			this._successCallbackHandlers.push(handlerFn);
		}
		return this;
	}

	public catch(handlerFn: TPromiseCatchCallback<K>) {
		if (this._state === PromiseState.REJECTED) {
			handlerFn(this._reason);
		} else {
			this._failureCallbackHandlers.push(handlerFn);
		}
		return this;
	}

	public finally(handlerFn: TPromiseFinallyCallback) {
		if (this._state !== PromiseState.PENDING) return handlerFn();
		this._finallyCallbackHandlers = handlerFn;
	}

	private _promiseResolver(value: T) {
		if (this._state === PromiseState.FULFILLED) return;
		this._state = PromiseState.FULFILLED;
		this._value = value;
		this._successCallbackHandlers.forEach((cb) => cb(value));
		if (this._finallyCallbackHandlers) this._finallyCallbackHandlers();
	}

	private _promiseRejector(reason: K) {
		if (this._state === PromiseState.REJECTED) return;
		this._state = PromiseState.REJECTED;
		this._reason = reason;
		this._failureCallbackHandlers.forEach((cb) => cb(reason));
		if (this._finallyCallbackHandlers) this._finallyCallbackHandlers();
	}
}

function customPromise2() {
	return new MyPromsie<string, string>((resolve, reject) => {
		reject('OK'); //cb()
	});
}

customPromise2()
	.then((value) => console.log('Custom Promise Done', value))
	.catch((reason) => console.log('Rejected because', reason));

const waitFor = (s: number) =>
	new MyPromsie<number, number>((res, rej) => {
		setTimeout(() => res(s), s * 1000);
	});

waitFor(5)
	.then((value) => {
		console.log(`Promise Resolve`, value);
	})
	.catch((reason) => {
		console.log(`Promise Rejected`, reason);
	})
	.finally(() => {
		console.log('All good');
	});
