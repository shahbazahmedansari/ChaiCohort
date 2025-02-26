// You just need to implement the addVIP function
function addVIP(queue, vipGuest) {
    // Add vipGuest at the beginning of queue and return updated queue
    const newQueue = queue.unshift(vipGuest);
    return queue;
}

console.log(addVIP(["Aarav", "Ishaan", "Priyansh"], "Zoya"));
console.log(addVIP(["Maya", "Priya"], "Ananya"));
console.log(addVIP(["Rohan"], "Vanshika"));