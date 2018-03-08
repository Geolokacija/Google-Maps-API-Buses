// Routes
$.getJSON('http://api-ext.trafi.com/routes?start_lat=55.66542159999999&start_lng=21.176730799999973&end_lat=55.7284356&end_lng=21.125247100000024&is_arrival=false&api_key=b8bee4f34d5c2b7fbbcab7533638870d',
    function(data) {

   //  console.log(data);

});

$.getJSON('http://api-ext.trafi.com/stops/nearby?lat=55.703297&lng=21.144279&radius=50000&api_key=01f86ef81f0a2d7414bdd0bcfd9f3adc',
    function(data) {
    var jsObject = JSON.parse(JSON.stringify(data));
    console.log(jsObject);
    var dataFromServer = [];
    for (var i = 0; i < jsObject.Stops.length; i++) {
        dataFromServer[dataFromServer.length] = jsObject.Stops[i];
    }
    addNearBusStops(dataFromServer);
});

$.getJSON('http://api-ext.trafi.com/locations?q=rumpiske&region=klaipeda&current_lat=55.703229&current_lng=21.148679000000016&api_key=b8bee4f34d5c2b7fbbcab7533638870d',
    function(data) {

     console.log(data);

});
 // Departure
var depRegion = 'klaipeda',
    depStop_ID = 'klp_1211';

function busStopInfo(depStop_ID) {
    if (depStop_ID ==  null){
        depStop_ID = this.depStop_ID;
    }
    $.getJSON('http://api-ext.trafi.com/departures?' +
        'stop_id=' + depStop_ID +
        '&region=' + depRegion +
        '&api_key=01f86ef81f0a2d7414bdd0bcfd9f3adc',
        function (data) {
        return data;
        });
}




  // Places all bus stop markers on the map
var markerArr = [];
  function addNearBusStops(dataFromServer)
  {
      for (var i = 0; i < dataFromServer.length; i++) {
          var stopsCords = new google.maps.LatLng(dataFromServer[i].Coordinate.Lat, dataFromServer[i].Coordinate.Lng);

          markerArr[i] = new google.maps.Marker({
              position: stopsCords,
              map: map,
              title: ""+ dataFromServer[i].Name,
              icon: {
              url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Nice_Tramway_Ligne_4_Point.svg/2000px-Nice_Tramway_Ligne_4_Point.svg.png",
              scaledSize: new google.maps.Size(8, 8)
            }
          });
          addInfoWindow(markerArr[i], dataFromServer[i].Name)
      }
  }
    // Places markers infowindow with name of the stop
  function addInfoWindow(marker, message, busStopID)
  {
      var infoWindow = new google.maps.InfoWindow({
          content: '<div id="content" onmouseover="updateContent('+this+','+busStopID+')">'+message.Name+'</div>'
          });

      google.maps.event.addListener(marker, 'click', function(){
          infoWindow.open(map, marker);
      });
      function updateContent(infowindow,busID) {
          var info = busStopInfo(busID);
          //infowindow.setContent(info.Schedules[0].Name);
      }
  }
