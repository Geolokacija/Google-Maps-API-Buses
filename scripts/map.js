var map;

function initMap() {
    var centerPoint = {lat: 55.70329479999999, lng: 21.14427950000004};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: centerPoint
    });
}
