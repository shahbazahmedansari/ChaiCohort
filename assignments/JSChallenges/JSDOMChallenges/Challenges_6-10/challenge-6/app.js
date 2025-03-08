const dateElement = document.querySelector(".date");
const hourHand = document.querySelector('.hour');
const minuteHand = document.querySelector('.minute');
const secondHand = document.querySelector('.second');


function updateDigitalClock() {
    const digitalClock = document.querySelector(".digital-clock");

    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "PM" : "AM";


    // Calculate rotation angles
    const hourDegrees = (hours * 30) + (minutes * 0.5); // 30 degrees per hour + partial hour
    const minuteDegrees = (minutes * 6) + (seconds * 0.1); // 6 degrees per minute + partial minute
    const secondDegrees = seconds * 6; // 6 degrees per second

    console.log(hourDegrees, minuteDegrees, secondDegrees);
    // Apply rotations
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = ` rotate(${minuteDegrees}deg)`;
    secondHand.style.transform = ` rotate(${secondDegrees}deg)`;

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    digitalClock.innerHTML = `${hours}:${minutes}:${seconds} ${ampm}`;
    dateElement.innerHTML = now.toLocaleDateString(undefined, options);
}


setInterval(updateDigitalClock, 1000);

updateDigitalClock();
