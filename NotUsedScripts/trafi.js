// Routes
$.getJSON('http://api-ext.trafi.com/routes?start_lat=55.66542159999999&start_lng=21.176730799999973&end_lat=55.7284356&end_lng=21.125247100000024&is_arrival=false&api_key=b8bee4f34d5c2b7fbbcab7533638870d',
    function(data) {
   //  console.log(data);
});

$.getJSON('http://api-ext.trafi.com/stops/nearby?lat=55.703297&lng=21.144279&radius=50000&api_key=01f86ef81f0a2d7414bdd0bcfd9f3adc',
    function(data) {
    var jsObject = JSON.parse(JSON.stringify(data));
    var dataFromServer = [];
    for (var i = 0; i < jsObject.Stops.length; i++) {
        dataFromServer[dataFromServer.length] = jsObject.Stops[i];
    }
    //sending "dataFromServer" array to function, which adds bus stops markers
    //addNearBusStops(dataFromServer);
});

$.getJSON('http://api-ext.trafi.com/locations?q=rumpiske&region=klaipeda&current_lat=55.703229&current_lng=21.148679000000016&api_key=b8bee4f34d5c2b7fbbcab7533638870d',
    function(data) {
     console.log(data);
});
 // Departure
var depRegion = 'klaipeda',
    depStop_ID = "idjkb_7-9 Cawang UKI";
$.getJSON('http://api-ext.trafi.com/departures?' +
    'stop_id='+ depStop_ID +
    '&region='+ depRegion +
    '&api_key=01f86ef81f0a2d7414bdd0bcfd9f3adc',
    function(data) {
    // console.log(data);
});






  // Places all bus stop markers on the map
// var markerArr = [];
//   function addNearBusStops(dataFromServer)
//   {
//       for (var i = 0; i < dataFromServer.length; i++) {
//           var stopsCords = new google.maps.LatLng(dataFromServer[i].Coordinate.Lat, dataFromServer[i].Coordinate.Lng);
//
//           markerArr[i] = new google.maps.Marker({
//               position: stopsCords,
//               map: map,
//               title: ""+ dataFromServer[i].Name
//           });
//           addInfoWindow(markerArr[i], dataFromServer[i].Name)
//       }
//   }
//     // Places markers infowindow with name of the stop
//   function addInfoWindow(marker, message)
//   {
//       var infoWindow = new google.maps.InfoWindow({
//               content: message
//           });
//
//       google.maps.event.addListener(marker, 'click', function(){
//           infoWindow.open(map, marker);
//       });
//   }

    // Makes 1 long bus string in 7 smaller information pieces
