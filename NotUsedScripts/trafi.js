var dataFromServer = [];
var start = null;
var end = null;
var startStop = null;
var endStop = null;
var commonBuses = [];
var depRegion = 'klaipeda',
    depStop_ID = 'klp_1211';
var markerArr = [];
var index = 0;
var index2 = 0
var ast;
var departuresObj;

$.getJSON('http://api-ext.trafi.com/routes?start_lat=55.66542159999999&start_lng=21.176730799999973&end_lat=55.7284356&end_lng=21.125247100000024&is_arrival=false&api_key=b8bee4f34d5c2b7fbbcab7533638870d',
    function (data) {
    });


$.getJSON('http://api-ext.trafi.com/stops/nearby?lat=55.703297&lng=21.144279&radius=50000&api_key=01f86ef81f0a2d7414bdd0bcfd9f3adc',
    function (data) {
        var jsObject = JSON.parse(JSON.stringify(data));

        for (var i = 0; i < jsObject.Stops.length; i++) {
            dataFromServer[dataFromServer.length] = jsObject.Stops[i];
        }
        addNearBusStops(dataFromServer);
    });

$.getJSON('http://api-ext.trafi.com/locations?q=rumpiskes_st&region=klaipeda&api_key=b8bee4f34d5c2b7fbbcab7533638870d',
    function (data) {

    });


// Places all bus stop markers on the map
function addNearBusStops(dataFromServer) {
    for (var i = 0; i < dataFromServer.length; i++) {

        if (dataFromServer[i].StopTooltip.SchedulesAtStop.length > 0) {
            if (dataFromServer[i].StopTooltip.SchedulesAtStop[0].Color == '0073ac') {

                var stopsCords = new google.maps.LatLng(dataFromServer[i].Coordinate.Lat, dataFromServer[i].Coordinate.Lng);

                markerArr[i] = new google.maps.Marker({
                    position: stopsCords,
                    map: map,
                    title: "" + dataFromServer[i].Name,
                    icon: {
                        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Nice_Tramway_Ligne_4_Point.svg/2000px-Nice_Tramway_Ligne_4_Point.svg.png",
                        scaledSize: new google.maps.Size(8, 8)
                    }
                });
                addInfoWindow(markerArr[i], dataFromServer[i].Name, dataFromServer[i].Coordinate.Lat, dataFromServer[i].Coordinate.Lng, dataFromServer[i].Id, dataFromServer[i].Direction)
            }
        }
    }
}


// Places markers infowindow with name of the stop
function addInfoWindow(marker, stopName, lat, lng, stopId, nextStop) {

    var infoWindow = new google.maps.InfoWindow({
        content: stopName
    });

    google.maps.event.addListener(marker, 'click', function () {

        if (index == 0) {
          $.getJSON('http://api-ext.trafi.com/departures?' +
              'stop_id=' + stopId +
              '&region=' + depRegion +
              '&api_key=01f86ef81f0a2d7414bdd0bcfd9f3adc',

              function (data) {
              departuresObj = data;
              index++;
            });

        } else {
          index = 0;
        }

                infoWindow.open(map, marker);

                getStopCoordinates(lat, lng, stopId, nextStop);
    });
}


function getStopCoordinates(lat, lng, stopId, nextStop) {

    //Į start ir end yra sudedamos pasirinktų stotelių koordinatės.
    if (start == null) {
        start = {Lat: lat, Lng: lng};
        duration = true;
    } else if (end == null) {
        end = {Lat: lat, Lng: lng};
    }

    //Jei turimos start ir end stotelės nustatomi bendri autobusai.
    if (start != null && end != null) {
        commonBuses = [];
        busesBetweenStops();
        start = null;
        end = null;
    }
}


function busesBetweenStops() {

    //Suranda dvi stoteles pagal jų koordinates.
    for (var i = 0; i < dataFromServer.length; i++) {

        if (dataFromServer[i].Coordinate.Lat == start.Lat && dataFromServer[i].Coordinate.Lng == start.Lng) {
            startStop = dataFromServer[i];
        }
        else if (dataFromServer[i].Coordinate.Lat == end.Lat && dataFromServer[i].Coordinate.Lng == end.Lng) {
            endStop = dataFromServer[i];
        }
    }

    //Jei  randamos stotelės nustatomi bendri autobusai.
    if (startStop != null && endStop != null) {
        var startBuses = startStop.StopTooltip.SchedulesAtStop;
        var endBuses = endStop.StopTooltip.SchedulesAtStop;
        for (var i = 0; i < startBuses.length; i++) {
            for (var j = 0; j < endBuses.length; j++) {
                if (startBuses[i].Name == endBuses[j].Name) {
                    commonBuses.push(startBuses[i].Name);
                    document.getElementById('availableBuses').innerHTML = commonBuses;
                    calculateBusArrivalTime(departuresObj);
                }
            }
        }
    }
}


  function calculateBusArrivalTime(departuresObject) {
      var fastestBuses = [];
      var fastestBus = null;

      //Išrenkami greičiausi autobusai sudedami į fastestBuses.
      for (var i = 0; i < departuresObject.Schedules.length; i++) {
        for (var j = 0; j < commonBuses.length; j ++) {
          if (departuresObject.Schedules[i].Name == commonBuses[j]) {
                fastestBuses.push(departuresObject.Schedules[i]);
          }
        }
      }

      //Iš greičiausių autobusų išrenkamas greičiausias fastestBus
      for (var k = 0; k < fastestBuses.length; k++){
         if(fastestBus == null){
           fastestBus = fastestBuses[k];
         }
         else if(fastestBuses[k].Departures[0].RemainingMinutes <=  fastestBus.Departures[0].RemainingMinutes){
           fastestBus = fastestBuses[k];
         }
          }
          console.log(fastestBuses);
          console.log(fastestBus);

      //Jei yra greičiausias autobusas jo duomenys atvaizduojami.
      if(fastestBus != null){
        document.getElementById('busInfo').innerHTML =
         'Stotele : ' + departuresObject.Stop.Name +
         '<br>' +
         'Bus : ' + fastestBus.Name +
          '<br>' +
          'Bus arrive in : ' + fastestBus.Departures[0].RemainingMinutes + ' min ' +
          '<br>' +
          'Time at ' + fastestBus.Departures[0].TimeLocal;
          fastestBus = null;
        }
  }
