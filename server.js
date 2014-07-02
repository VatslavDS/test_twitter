module.exports = function(Twit){
  var T = new Twit({
   consumer_key : 'hnhxM3ItmooRbSK3HH1QKNP5N',
   consumer_secret : 'AE63aP1MgUu58VWgs54GaWyFFmnYT8HzbLpz9i1ZrIvoTHRL6n',
   access_token : '346161978-iMwlNXuQruvYAynCu1FX1bcLcJjx959tMOGTO2oJ',
   access_token_secret : '1rgr5vrXppdBuKWcnsz0G13ZNIugveIfn11cM1Ndgn0uk'
   });
   /*
   var stream = T.stream('statuses/sample');

   T.get('users/show', { screen_name : "manuelmhr" }, function(err, data, response) {
     if(err) console.log(err.message);
     console.log(data); 
   }); 
   */
   return T;
}
