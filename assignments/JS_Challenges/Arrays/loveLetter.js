// You just need to implement the writeLoveLetter function
function writeLoveLetter(message, name) {
    // Add name at the start of the message and return updated array
    const updatedMessage = message.unshift(name);
    return message;
}

console.log(writeLoveLetter(["I", "love", "you"], "Aarav"));
console.log(writeLoveLetter(["Miss", "you"], "Priya"));
console.log(writeLoveLetter(["am", "so", "proud"], "Kabir"));
