function check() {
  console.log("Guest Counter works");
  return false;
}
/*
Guest Counter
*/
var numOfGuest = 1;
var countEl = document.getElementById("adet");
/*
Increment plus counter value
*/
function plus() {
  if (numOfGuest < 100) {
    numOfGuest++;
    document.getElementById("dropdownMenuButton").innerHTML =
      numOfGuest + " Guest";
    document.getElementById("adet").value = numOfGuest;
  }
  if (countEl !== null) {
    countEl.value = numOfGuest;
  }
}
/*
Decrement counter value until 1
*/
function minus() {
  if (numOfGuest > 1) {
    numOfGuest--;
    document.getElementById("adet").value = numOfGuest;
    document.getElementById("dropdownMenuButton").innerHTML =
      numOfGuest + " Guest";
    if (countEl !== null) {
      countEl.value = numOfGuest;
    }
  }
}
function applyGuest() {
  if (numOfGuest !== null) {
    document.getElementById("dropdownMenuButton").innerHTML =
      numOfGuest + " Guest";
  }
  console.log("No Of Guest is : " + numOfGuest);
}
