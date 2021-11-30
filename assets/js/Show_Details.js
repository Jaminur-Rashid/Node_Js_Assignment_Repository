/*
   Show details of user entered data 
   when user click search button
function showData() {
  console.log("Show data works externally");
  var dateValue = document.getElementById("input-id").value;
  var placeValue = document.getElementById("place-suggetion").value;
  var checkIn="";
  var checkOut="";
  for(let i=0;i<10;i++){
      checkIn+=dateValue[i];
  }
  for(let i=11;i<21;i++){
    checkOut+=dateValue[i];
}
  document.getElementById("tot-guest").innerHTML ="Total Guest Is : " + numOfGuest;
  document.getElementById("date-value").innerHTML ="Date value is : " + checkIn;
  document.getElementById("place-id").innerHTML ="Date value is : " + placeValue;
  document.getElementById("tot-guest").style.fontWeight=900;
  document.getElementById("date-value").style.fontWeight=900;
  document.getElementById("place-id").style.fontWeight=900;
}
*/
/*
   Show details of user entered data 
   when user click search button
*/
function showData() {
  console.log("Show data works externally");
  var dateValue = document.getElementById("input-id").value;
  var placeValue = document.getElementById("place-suggetion").value;
  var priceRange = document.getElementById("price-button").innerHTML;
  var checkIn = "";
  var checkOut = "";
  /*
      slice the check in and check 
      out date from priceValue String
  */
  for (let i = 0; i < 10; i++) {
    checkIn += dateValue[i];
  }
  for (let i = 12; i < 23; i++) {
    checkOut += dateValue[i];
  }
  if (!dateValue) {
    alert("Input Field can,t be empty");
  } else {
    document.getElementById("tot-guest").innerHTML =
      "Total Guest Is : " + numOfGuest;
    document.getElementById("date-value").innerHTML =
      "Check In Date is : " + checkIn;
    document.getElementById("date-value-one").innerHTML =
      "Check Out Date is : " + checkOut;
    document.getElementById("place-id").innerHTML =
      "Place value is : " + placeValue;
    document.getElementById("price-id").innerHTML =
      "Price range is : " + priceRange;
  }
  document.getElementById("tot-guest").style.fontWeight = 500;
  document.getElementById("date-value").style.fontWeight = 500;
  document.getElementById("place-id").style.fontWeight = 500;
}
