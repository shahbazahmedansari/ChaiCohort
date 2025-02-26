// You just need to implement the checkVotingEligibility function
function checkVotingEligibility(age) {
    // Return "Eligible" if age is 18 or more, otherwise return "Not Eligible"
    if (age >= 18) {
        return "Eligible";
    } else {
        return "Not Eligible";
    }
}

console.log(checkVotingEligibility(20));
console.log(checkVotingEligibility(16));
console.log(checkVotingEligibility(18));