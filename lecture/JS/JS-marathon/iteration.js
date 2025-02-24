let expenses = [
    { description: "Groceries", amount: 50, category: "food" },
    { description: "Electricity bill", amount: 100, category: "utilities" },
    { description: "Dinner", amount: 30, category: "food" },
    { description: "Internet Bill", amount: 50, category: "utilities" },
];

let expenseReport = expenses.reduce((report, expense) => {
    // report[expense.category] += expense.amount;
    report[expense.category] = (report[expense.category] || 0) + expense.amount;
    return report;
});

console.log("Expense report", expenseReport);

let tasks = [
    { description: "Write report", completed: false, priority: 2 },
    { description: "Send email", completed: true, priority: 3 },
    { description: "Prepare presentation", completed: false, priority: 1 },
];

let pendingSortedTasks = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => a.priority - b.priority);
console.log(pendingSortedTasks);

let movieRatings = [
    { title: "Movie A", ratings: [4, 5, 3] },
    { title: "Movie B", ratings: [5, 5, 4] },
    { title: "Movie C", ratings: [3, 4, 2] },
];

let averageRatings = movieRatings.map((movie) => {
    let total = movie.ratings.reduce((sum, rating) => sum + rating, 0);
    let avg = total / movie.ratings.length;
    // movie.ratings = avg;
    // return movie;
    return {
        title: movie.title,
        averageRatigns: avg.toFixed(2),
    };
});

console.log(averageRatings);