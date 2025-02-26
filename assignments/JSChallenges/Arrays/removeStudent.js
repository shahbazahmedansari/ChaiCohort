// You just need to implement the removeStudent function
function removeStudent(bus) {
    // Remove the first student and return the updated bus list
    const updatedBus = bus.shift();
    return bus;
}

console.log(removeStudent(["John", "Sarah", "Mike", "Emma"]));
console.log(removeStudent(["David", "Sophia"]));
console.log(removeStudent(["Alice"]));
