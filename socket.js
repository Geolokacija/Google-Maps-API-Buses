try{



    var  a= new WebSocket("ws://api-ext.trafi.com/routes?start_lat=41.03749&start_lng=28.98592&end_lat=40.991825&end_lng=29.023699&is_arrival=false&api_key=64864710afaa80e6e13e38cf66785f5d")






}catch (err){
    console.log(err.message)
}
