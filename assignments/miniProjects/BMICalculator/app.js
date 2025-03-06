const calculateBtn = document.getElementById("submit-btn");
const resultDiv = document.getElementById("result");

calculateBtn.addEventListener("click", () => {
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const heightInMetre = height / 100;
    const bmi = (weight / (heightInMetre * heightInMetre)).toFixed(1);
    const bmiResult = document.createElement("h2");
    const bmiStatus = document.createElement("p");
    bmiResult.innerHTML = `Your BMI: ${bmi}`;

    if (bmi < 18.5) {
        bmiStatus.innerHTML = "Underweight";
        bmiStatus.style.color = "yellow";
    } else if (bmi >= 18.5 && bmi < 25) {
        bmiStatus.innerHTML = "Healthy Weight";
        bmiStatus.style.color = "green";
    } else if (bmi >= 25 && bmi < 30) {
        bmiStatus.innerHTML = "Overweight";
        bmiStatus.style.color = "orange";
    } else if (bmi >= 30) {
        bmiStatus.innerHTML = "Obese";
        bmiStatus.style.color = "red";
    }



    resultDiv.appendChild(bmiResult);
    resultDiv.appendChild(bmiStatus);
    document.getElementById("height").value = "";
    document.getElementById("weight").value = "";
});