var bus;

var autobusuData = [];
var busMarkerArr = [];

setTimeout(function busses() {
    $.get('http://stops.lt/klaipeda/gps.txt?' + Date.now(),
        function (data) {

            autobusuData = [] = data.split("\n");

            createsBusObjects(autobusuData);
        });

    setTimeout(function () {
        busses();
    }, 5000)

}, 5000);

var b = [];

function createsBusObjects(arrayOfBusString) {
    var arrayOfBusStringLength = arrayOfBusString.length - 1; // Cut last array string
    var temporaryX;
    var temporaryY;
    var stringX;
    var stringY;
    var strLX;
    for (var i = 1; i < arrayOfBusStringLength; i++) {
        b[i] = arrayOfBusString[i].split(",");

        stringX = b[i][2];
        strLX = stringX.length;
        for (var a = 0; a < strLX; a++) {
            if (a == 1) {
                temporaryX += stringX.charAt(a) + '.';
            } else {
                temporaryX += stringX.charAt(a);
            }
        }
        b[i][2] = temporaryX;
        temporaryX = '';
        //////////////

        stringY = b[i][3];
        strLY = stringY.length;
        for (var a = 0; a < strLY; a++) {
            if (a == 1) {
                temporaryY += stringY.charAt(a) + '.';
            } else {
                temporaryY += stringY.charAt(a);
            }
        }
        b[i][3] = temporaryY;
        temporaryY = '';
    }
    addMarkersAsBuses(b)
}


function addMarkersAsBuses(busArray) {

    for (var i = 2; i < busArray.length; i++) {

        var busCoordinates = new google.maps.LatLng(parseFloat(busArray[i][3]), parseFloat(busArray[i][2]));

        if (busMarkerArr[i] != null) {
            busMarkerArr[i].setMap(null);
        }

        busMarkerArr[i] = new google.maps.Marker({
            position: busCoordinates,
            map: map,
            title: "" + busArray[i][1],
            icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 4,
                rotation: parseInt(busArray[i][5])
            },
        });


    }

}
