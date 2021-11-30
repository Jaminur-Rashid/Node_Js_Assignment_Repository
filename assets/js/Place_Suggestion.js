
function check(){
    console.log("It works");
}
var place;
    $(document).ready(function () {
      var autocomplete;
      autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("place-suggetion"),
        {
          types: ["geocode"],
        }
      );
      google.maps.event.addListener(autocomplete, "place_changed", function () {
        place = autocomplete.getPlace();
        console.log(place.formatted_address);
      });
    });