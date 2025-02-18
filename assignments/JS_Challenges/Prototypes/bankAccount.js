// You need to implement the BankAccount constructor function and its prototype methods

function BankAccount(balance) {
    // Initialize balance and transactions properties
    this.balance = balance;
    this.transactions = [];
}

// Define deposit method on BankAccount's prototype
BankAccount.prototype.deposit = function (amount) {
    this.balance += amount;
    this.transactions.push(`Deposited ${amount}`);
};

// Define withdraw method on BankAccount's prototype
BankAccount.prototype.withdraw = function (amount) {
    if (this.balance - amount < 0) {
        this.transactions.push("Insufficient Balance");
    } else {
        this.balance -= amount;
        this.transactions.push(`Withdrew ${amount}`);
    }
};

// Define getTransactionHistory method on BankAccount's prototype
BankAccount.prototype.getTransactionHistory = function () {
    return this.transactions;
};
