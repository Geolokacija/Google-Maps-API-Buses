
$.getJSON('http://api-ext.trafi.com/routes?start_lat=55.66542159999999&start_lng=21.176730799999973&end_lat=55.7284356&end_lng=21.125247100000024&is_arrival=false&api_key=b8bee4f34d5c2b7fbbcab7533638870d', function(data) {
  console.log(data);
});

$.getJSON('http://api-ext.trafi.com/stops/nearby?lat=55.7021303&lng=21.143823300000008&api_key=b8bee4f34d5c2b7fbbcab7533638870d', function(data) {
  console.log(data);
});

$.getJSON('http://api-ext.trafi.com/locations?q=rumpiske&region=klaipeda&current_lat=55.703229&current_lng=21.148679000000016&api_key=b8bee4f34d5c2b7fbbcab7533638870d', function(data) {
  console.log(data);
});
