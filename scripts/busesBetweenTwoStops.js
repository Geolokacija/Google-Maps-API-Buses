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
    busesBetweenStops(start, end, dataFromServer);

});

$.getJSON('http://api-ext.trafi.com/locations?q=rumpiskes_st&region=klaipeda&api_key=b8bee4f34d5c2b7fbbcab7533638870d',
    function(data) {

     //console.log(data);

});
 // Departure
var depRegion = 'klaipeda',
    depStop_ID = "idjkb_7-9 Cawang UKI";
$.getJSON('http://api-ext.trafi.com/departures?' +
    'stop_id='+ depStop_ID +
    '&region='+ depRegion +
    '&api_key=01f86ef81f0a2d7414bdd0bcfd9f3adc',
    function(data) {
});


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
  function addInfoWindow(marker, message)
  {
      var infoWindow = new google.maps.InfoWindow({
              content: message
          });

      google.maps.event.addListener(marker, 'click', function(){
          infoWindow.open(map, marker);
      });
  }
  var start ={Lat: 55.70315170288086, Lng: 21.14539909362793};
  var end ={ Lat: 55.703861236572266, Lng: 21.14328956604004};
  var startStop = null;
  var endStop = null;

  function busesBetweenStops(start, end, dataFromServer){

    //Suranda dvi stoteles pagal ju koordinates.
      for (var i = 0; i < dataFromServer.length; i++) {

        if(dataFromServer[i].Coordinate.Lat == start.Lat && dataFromServer[i].Coordinate.Lng == start.Lng){
          startStop = dataFromServer[i];
        //  console.log(dataFromServer[i]);
        }
        else if(dataFromServer[i].Coordinate.Lat == end.Lat && dataFromServer[i].Coordinate.Lng == end.Lng){
          endStop = dataFromServer[i];
          //console.log(dataFromServer[i]);
        }
      }

      //Jei  randamos stoteles nustatomi bendri autobusai.
      if(startStop != null && endStop != null){
        var startBuses = startStop.StopTooltip.SchedulesAtStop;
        var endBuses = endStop.StopTooltip.SchedulesAtStop;
        var commonBuses = [];
        for (var i = 0; i < startBuses.length; i++) {
          for (var j = 0; j < endBuses.length; j++){
            if(startBuses[i].Name == endBuses[j].Name){
              commonBuses.push(startBuses[i].Name);
            }
          }
        }
          console.log(commonBuses);
      }

  }
