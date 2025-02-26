// You just need to implement the addGuest function
function addGuest(guestList, newGuest) {
    // Add the newGuest to guestList and return the updated list
    const newGuestList = guestList.push(newGuest);
    return guestList;
}

console.log(addGuest(["Anirudh", "Mukul"], "Radhika"));