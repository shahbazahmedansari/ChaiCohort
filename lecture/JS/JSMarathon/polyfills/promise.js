// Promise => returns an executor function whenever you create an object of a Promise
// executor function has access to resolve and reject functions
// whenever a promise calls the resolve function the promise fulfills the request and all the .then functions run.
// whenever a promise calls the reject function the promise rejects the request and .catch function run.
// and finally runs at the end everytime.

class MyPromise {
    constructor(executorFn) {
        this._state = 'pending';
        this._successCallbacks = [];
        this._errorCallbacks = [];
        this._finallyCallbacks = [];
        this.value = undefined;
        executorFn(this.resolverFn.bind(this), this.rejectorFn.bind(this));
    }

    then(cb) {
        if (this._state == "fulfilled") {
            console.log(`Your promise is already fulfilled, let's run it`);
            cb(this.value);
            return this;
        }
        this._successCallbacks.push(cb);
        return this;
    }

    catch(cb) {
        if (this._state == "rejected") {
            console.log(`Your promise is already rejected, let's run it`);
            cb();
            return this;
        }
        this._errorCallbacks.push(cb);
        return this;
    }

    finally(cb) {
        if (this._state !== "pending") {
            console.log(`Your promise is not pending, let's run it`);
            cb();
            return this;
        }
        this._finallyCallbacks.push(cb);
        return this;
    }

    resolverFn(value) {
        console.log(`Fulfilling Promise, Running ${this._successCallbacks.length} callbacks`);
        this.value = value;
        this._state = "fulfilled";
        this._successCallbacks.forEach(cb => cb(value));
        this._finallyCallbacks.forEach(cb => cb());
    }

    rejectorFn(error) {
        this._state = "rejected";
        this._errorCallbacks.forEach(cb => cb(error));
        this._finallyCallbacks.forEach(cb => cb());
    }
}

function wait(seconds) {
    const p = new MyPromise((resolve, reject) => {
        setTimeout(() => reject('Hahhha'), seconds * 1000);
    });
    return p;
}

const p = wait(5);
console.log(`Registering Callbacks`);

p.then((e) => console.log(`V1 Promise resolved after 5 sec`, e))
    .catch((e) => console.log(`V1 Rejected after 5 sec`, e))
    .finally(() => console.log(`V1 I will run finally everytime`));

p.then((e) => console.log(`V2 Promise resolved after 5 sec`, e))
    .catch((e) => console.log(`V2 Rejected after 5 sec`, e))
    .finally(() => console.log(`V2 I will run finally everytime`));