//Grab all the buttons as in array
//loop through the array and add evenet listener to each button
//when the button is clicked, get the button's value and store in a global variable
//grab the display element
//add the value to the display element

//get all the buttons
const buttons = document.querySelectorAll(".btn");

const buttonsArray = Array.from(buttons);
let stringToDisplay = "";
const operators = ["/", "*", "-", "+", "%"];
let lastOperator = "";

// const handleOnClick = () => {
//   alert("you clicked");
// };

buttonsArray.map((btn) => {
  btn.addEventListener("click", () => {
    displayElement.style.background = "#d9d9d9";
    displayElement.classList.remove("prank");
    const val = btn.innerText;

    if (val === "AC") {
      stringToDisplay = " ";
      display();

      return;
    }

    if (val === "C") {
      stringToDisplay = stringToDisplay.slice(0, -1);
      return display(stringToDisplay);
    }

    if (val === "=") {
      const lastChar = stringToDisplay[stringToDisplay.length - 1];

      if (operators.includes(lastChar)) {
        stringToDisplay = stringToDisplay.slice(0, -1);
      }
      return total();
    }

    if (operators.includes(val)) {
      if (!stringToDisplay) {
        return;
      }
      const lastChar = stringToDisplay[stringToDisplay.length - 1];
      if (operators.includes(lastChar)) {
        stringToDisplay = stringToDisplay.slice(0, -1);
        return;
      }
      lastOperator = val;
    }

    if (val === ".") {
      if (lastOperator) {
        const operatorIndex = stringToDisplay.lastIndexOf(lastOperator);

        const lastNumberSet = stringToDisplay.slice(operatorIndex + 1);
        if (lastNumberSet.includes(".")) {
          return;
        }
      }
      if (!lastOperator && stringToDisplay.includes(".")) {
        return;
      }
    }

    stringToDisplay += val;
    display(stringToDisplay);
  });
});

const display = (str) => {
  displayElement.innerText = str || "0.00";
};

const total = () => {
  console.log(stringToDisplay);
  const extra = randomNumber();
  if (extra > 0) {
    displayElement.style.background = "red";
    displayElement.classList.add("prank");
  }
  const ttl = eval(stringToDisplay) + extra;

  display(ttl);
  stringToDisplay = ttl.toString();
};
console.log(stringToDisplay);
const displayElement = document.querySelector(".display");

const randomNumber = () => {
  const num = Math.round(Math.random() * 10);
  return num < 5 ? num : 0;
};

// displayElement.addEventListener("click", handleOnClick);
