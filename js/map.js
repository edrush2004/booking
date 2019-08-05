
 var title = [
   'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неоютное бунгало по колено в воде'];

var CARD_COUNT = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIX_ROOM = 1;
var MAX_ROOM = 5;
var CARD_TYPE = ['palace', 'flat', 'house','bungalo'];
var CARD_CHECK_IN = ['12:00', '13:00', '14:00'];
var MIX_Y = 130;
var MAX_Y = 630;

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
                

                    
var createAvatarLinks = function (numbersAvatar) {
  var photoNumbers = [];
  for (i=1; i <= numbersAvatar; i++) {
    photoNumbers.push('img/avatars/user0' + i + '.png');
  }
  return photoNumbers;
  }
