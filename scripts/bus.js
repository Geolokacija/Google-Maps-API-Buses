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
    }, 3000)

}, 3000);

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
        //console.log(b[i][3]);
        strLY = stringY.length;
        for (var a = 0; a < strLY; a++) {
            if (a == 1) {
                temporaryY += stringY.charAt(a) + '.';
            } else {
                temporaryY += stringY.charAt(a);
            }
        }
        b[i][3] = temporaryY;
        //console.log(b[i][3]);
        temporaryY = '';
    }
    addMarkersAsBuses(b)
}


function rotateIMG(angle) {
    $('img[src="https://www.airportbus-muenchen.de/assets/img/bus-station-icon.svg"]').css({
        'transform': 'rotate(' + angle + 'deg)'
    });
    google.maps.event.addListenerOnce(map, 'idle', function() {
        setInterval(function() {
            $('img[src="https://www.airportbus-muenchen.de/assets/img/bus-station-icon.svg"]').css({
                'transform': 'rotate(' + 25 + 'deg)'
            });
            // rotationAngle += 10;
        }, 1000);
    });
}

function addMarkersAsBuses(busArray) {

    for (var i = 2; i < busArray.length; i++) {

        var busCoordinates = new google.maps.LatLng(parseFloat(busArray[i][3]), parseFloat(busArray[i][2]));

        if (busMarkerArr[i] != null) {
            busMarkerArr[i].setMap(null);
        }
        var icon = {
            url: "scripts/bus-station-icon.svg",
            scaledSize: new google.maps.Size(25, 25),
            iconAnchor: new google.maps.Point(0.5, 0.5),
        };
        // var icon = $('marker').css({
        //     'transform': 'rotate(' + parseInt(busArray[i][5]) + 'deg)'});
        rotateIMG(parseInt(busArray[i][5]));
        //icon.scaledSize = new google.maps.Size(25, 25);

        busMarkerArr[i] = new google.maps.Marker({
            position: busCoordinates,
            map: map,
            title: "" + busArray[i][1],
            icon: icon
        });

        // busMarkerArr[i].style.transform="rotate("+ parseInt(busArray[i][5]) +"deg)"

    }

}
