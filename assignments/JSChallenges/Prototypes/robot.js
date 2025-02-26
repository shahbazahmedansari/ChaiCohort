// You need to implement the Robot constructor function and its prototype method

function Robot(name, batteryLevel) {
    // Initialize name and batteryLevel properties
    this.name = name;
    this.batteryLevel = batteryLevel;
}

// class Robot {
//     constructor(name, batteryLevel) {
//         this.name = name;
//         this.batteryLevel = batteryLevel;
//     }
// }

// Define charge method on Robot's prototype

Robot.prototype.charge = function () {
    return Math.min(this.batteryLevel + 20, 100);
};

const robot = new Robot("Robo3", 50);
console.log(robot.charge());
