/*
function to implement price range slider
*/
function rangeSlider() {
  var minValue = document.getElementById("customRange3").value;
  var maxValue = document.getElementById("max-price").value;
  document.getElementById("price-range").innerHTML = minValue + "-" + maxValue;
  document.getElementById("price-button").innerHTML = minValue + "-" + maxValue;

}
