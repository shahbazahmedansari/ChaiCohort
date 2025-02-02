let myArray = [1, 4, 3, 2, 5, 6];

function sumFac(numbers) {
  let sum = 0;
  for (let i = 0; i <= numbers.length; i++) {
    sum = sum + i;
  }
  return sum;
}

let mySum = sumFac(myArray);
console.log(mySum);