// Function: start()
// Purpose: This function starts the series of calling other functions to complete the assigned task.
// Description: This function starts by getting the values that the user inputs into the form and assigning them to variables.
//              Then the function creates two more array variables and calls the findFactors() function. Next, the function creates
//              two more variables to store the integers for the total sums of the factors for each number. Last, the function calls
//              the printResult() function as well as the printFactors() function.
// Input: N/a
// Output: N/a
 function start() {
    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;
    var factors1 = findFactors(num1);
    var factors2 = findFactors(num2);
    var total1 = totalFactors(factors1);
    var total2 = totalFactors(factors2);
    printResult(total1, total2, num1, num2);
    printFactors(factors1, num1, factors2, num2);
}

//Function: findFactors()
//Purpose: This function identifies all the factors of a certain number. It is called in the function start().
//Description: This function starts by creating three variables: a counting integer variable ('i') for a for loop, a variable to store the
//             amount of factors in the array set to 0, and finally a variable to create the array set to empty. The for loop starts with i=1
//             it goes through each number to check if it is a factor fo the original number. The i counter iterates adding one each time
//             through the loop. If the number being checked is a factor of the original number, the number will be added to the array and
//             the amount varible will add one to it. If it is not a factor, the for loop will continue until i is one less than the 
//             original number.
//Input: num1 is the user input of an integer.
//Output: array is an array variable with the list of factors of the user inputted number.
function findFactors(num1) {
    var i;
    var amount = 0;
    var array = [];
    for (i=1; i<num1; i++) {
        if (isAFactor(num1, i)) {
            array[amount] = i; 
            amount++;
        }
        else {
            continue;
        }
    }
    return array;
}

//Function: isAFactor()
//Purpose: This function is called in findFactors() to determine whether a number is a factor of the user inputted number.
//Description: There is an if else statement that returns true if the number is a factor of the orignal number. It will return false
//             if it not true. The if statement uses the isInteger() function to check if the number is able to be divided into equally
//             by the other number and therefore, is a factor.
//Input: The original user inputted number and the number that the user is checking as a factor of the original number.
//Output: Returns true or false depending on whether or not the number is a factor of the original number.
function isAFactor(x,y) {
    if(Number.isInteger(x/y)) {
        return true;
    }
    else {
        return false;
    }
}

//Function: totalFactors()
//Purpose: This function is called in start() to sum the factors of the user inputted numbers.
//Description: This function starts by declaring two variables: an counter variable, integer i, and an integer total to store the
//             variable total. There is a while loop that executes while the array has an integer in the value place rather than
//             NULL. In the while loop, the total is calculated by iterating through with i in the array and adding each value.
//Input: array for the list of factors for the user inputted number.
//Output: total, a var for the sum of the factors of the user inputted number.
function totalFactors(array) {
    var i = 0;
    var total = 0;
    while(Number.isInteger(array[i])) {
        total = total + array[i];
        i++;
    }
    return total;
}

//Function: printResult()
//Purpose: This function is called in the start() function. It figures out and prints whether the numbers are amicable or not.
//Description: This factor has an if else statement which prints either statement depending on if the numbers are amicable or not.
//             The if statement executes if the total of the factors of each number are equal to the other.
//Input: total1, a variable for the sum of the factors of num1. total2, a variable for the sum of the factors of num2. num1, the user
//       inputted integer. num2, the other user inputted integer.
//Output: The result will print on the page whether the numbers are amicable or not.
function printResult(total1, total2, num1, num2) {
    if (total1 == num2 && total2 == num1) {
        document.getElementById("result").innerHTML = "The numbers: " + num1 + " and " + num2 + " are amicable";
    }
    else {
        document.getElementById("result").innerHTML = "The numbers: " + num1 + " and " + num2 + " are not amicable";
    }
}

//Function: printFactors()
//Purpose: This function is called in the start(). This function prints the list of variables for each user inputted number.
//Description: This function declares three variables. A counter variable i set to 0 to use in the while statements and two 
//             string variables, factors1 and factors2, to store the list of factors to print them on the page. The function operates
//             through a while look which checks to make sure the array is still providing integer values. Then there is an if else
//             statement. The if statement operates on the first iteration of the while loop to add the first factor in the array
//             to the string. Then the else statements adds the rest of the factor values in the array to the string while putting
//             commas between each number. Through each iteration 1 is added to i.
//Input: array1 and array2 for the list of factors for the user inputted number. num1 and num2 for the user inputted number.
//Output: This function prints the list of factors for both numbers on the page.
function printFactors(array1, num1, array2, num2) {
    var i = 0;
    var factors1 = "";
    var factors2 = "";
    while(Number.isInteger(array1[i])) {
        if (i == 0) {
            factors1 = factors1 + array1[i];
            i++;
        }
        else {
            factors1 = factors1 + ", " + array1[i];
            i++;
        }
    }
    i = 0;
    while(Number.isInteger(array2[i])) {
        if (i == 0) {
            factors2 = factors2 + array2[i];
            i++;
        }
        else {
            factors2 = factors2 + ", " + array2[i];
            i++;
        }
    }
    document.getElementById("factorList").innerHTML = `The factors of ${num1} are ${factors1}. <br> <br> The factors of ${num2} are ${factors2}.`;
}


