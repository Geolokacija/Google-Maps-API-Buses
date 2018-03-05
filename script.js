

$.getJSON('http://api-ext.trafi.com/routes?start_lat=55.66542159999999&start_lng=21.176730799999973&end_lat=55.7284356&end_lng=21.125247100000024&is_arrival=false&api_key=b8bee4f34d5c2b7fbbcab7533638870d',
    function(data) {
    // console.log(data);
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
    // console.log(data);
});

$.getJSON('http://api-ext.trafi.com/departures?stop_id=idjkb_7-9%20Cawang%20UKI&region=jakarta&api_key=01f86ef81f0a2d7414bdd0bcfd9f3adc',
    function(data) {
    // console.log(data);
});


var bus;
var map;
var autobusuData = [];
setTimeout(function busses() {
    $.get('http://stops.lt/klaipeda/gps.txt?'+Date.now() ,
        function(data) {
            //console.log(data);
            autobusuData = [] = data.split("\n");
           // console.log(autobusuData.length-1+ "\n"+autobusuData[12]+ "\n" + autobusuData[7])
            createsBusObjects(autobusuData);
        });
    //console.log("Busses");
    setTimeout(function () {
        busses();
    },5000)

},5000);


  function initMap()
  {
          var centerPoint = {lat: 55.70329479999999, lng: 21.14427950000004};
           map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: centerPoint
          });
  }

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
  var b = [];
  function createsBusObjects(arrayOfBusString)
  {
      var arrayOfBusStringLength = arrayOfBusString.length - 1; // Cut last array string
      var temporaryX;
      var temporaryY;
      var stringX;
      var stringY;
      var strLX;
      for(var i = 1; i < arrayOfBusStringLength; i++)
      {
          b[i] = arrayOfBusString[i].split(",");

           stringX = b[i][2];
           strLX = stringX.length;
          for(var a =0; a< strLX; a++)
          {
              if(a == 1)
              {
                  temporaryX += stringX.charAt(a) + '.';
              } else {
                  temporaryX += stringX.charAt(a);
              }
          }
          b[i][2] = temporaryX;
          temporaryX = '';
          //////////////

          stringY = b[i][3];
          console.log(b[i][3]);
          strLY = stringY.length;
          for(var a =0; a< strLY; a++)
          {
              if(a == 1)
              {
                  temporaryY += stringY.charAt(a) + '.';
              } else {
                  temporaryY += stringY.charAt(a);
              }
          }
          b[i][3] = temporaryY;
          console.log(b[i][3]);
          temporaryY = '';
      }
      addMarkersAsBuses(b)
  }

  var busMarkerArr = [];
  function addMarkersAsBuses(busArray)
  {
      // if(busMarkerArr != null)
      // {
      //     for (var i = 0; i < busMarkerArr.length; i++ ) {
      //         busMarkerArr[i].setMap(null);
      //     }
      // }
      //console.log(busArray);
      for (var i = 2; i < busArray.length; i++) {
         // console.log(parseFloat(busArray[i][2]));
          var busCoordinates = new google.maps.LatLng(parseFloat(busArray[i][3]), parseFloat(busArray[i][2]));
          //console.log(parseFloat(busArray[i][2])+" - "+parseFloat(busArray[i][3]));
          busMarkerArr[i] = new google.maps.Marker({
              position: busCoordinates,
              map: map,
              title: ""+busArray[i][1]
          });
        var marker = new google.maps.Marker ({
            position: stopsCords,
            map: map,
            title: ""+dataFromServer[i].Name
        });

        var infowindow = new google.maps.InfoWindow({
        content: ""+dataFromServer[i].Name
        });

        marker.addListener('click', function() {
        infowindow.open(map, marker);
        });

      }
      return busCoordinates;
  }
