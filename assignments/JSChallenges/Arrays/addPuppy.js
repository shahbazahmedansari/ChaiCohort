// You just need to implement the addPuppy function
function addPuppy(queue, puppyName) {
    // Add puppyName at the beginning of queue and return updated queue
    const newQueue = queue.unshift(puppyName);
    return queue;
}

console.log(addPuppy(["Tom", "Jerry", "Spike"], "Max"));
console.log(addPuppy([], "Buddy"));
console.log(addPuppy(["Oscar"], "Bella"));