console.log("Start of script 3");

setTimeout(() => {
    console.log("This is from the task queue (setTimeout)");
}, 0);

Promise.resolve().then(() => {
    console.log("This is from the Microtask queue (Promise)");
});

console.log("End of script");