
 var titleArray = [
   'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неоютное бунгало по колено в воде'];

var avatarsNum = 8; 

var CARD_COUNT = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIX_ROOM = 1;
var MAX_ROOM = 5;
var CARD_TYPE = ['palace', 'flat', 'house','bungalo'];
var CARD_CHECK_IN = ['12:00', '13:00', '14:00'];
var MIX_X = 0;
var MAX_X = 1200;
var MIX_Y = 130;
var MAX_Y = 630;
var MIN_GUESTS =1;
var MAX_GUESTS =3;
var CARD_FEATURE = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];

var CARD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
                  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
                  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
                

function getRandomTitle(){
  return titleArray[getRandomInteger(titleArray.length, 0)];
}
                  
function getRandomInteger(max,min){
  min = min || 0;
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomChechinOut(){
  return CARD_CHECK_IN[getRandomInteger(CARD_CHECK_IN.length,0)];
}



function generateData() {
  var data = [];
  
  for (var i=0; i<avatarsNum; i++){
    var location = {
      x: getRandomInteger(MAX_X, MIX_X),
      y: getRandomInteger(MAX_Y,MIX_Y)
    };
  
  
   data.push({
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: getRandomTitle(),
      address: location.x + ',' + location.y,
      price: getRandomInteger(MAX_PRICE,MIN_PRICE),
      type: CARD_TYPE[Math.floor(Math.random() * CARD_TYPE.length)];
      rooms: getRandomInteger(MAX_ROOM,MIX_ROOM);
      guests: getRandomInteger(MAX_GUESTS, MIN_GUESTS);
      checkin: getRandomChechinOut(),
      chechout: getRandomChechinOut(),
      


  }

  )
  
}}