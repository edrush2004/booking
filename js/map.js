'use struct';

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
var CARDS_PHOTO_WIDTH = 45;
var CARDS_PHOTO_HEIGHT = 40;

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

function getRandomFeatures(){
  return CARD_FEATURE.slice(getRandomInteger(CARD_FEATURE.length,0));
}

function getRandomPhotos(){
  return CARD_PHOTOS.sort(function(){return 0.5 - Math.random()});
}

var generateData = function() {
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
      type: CARD_TYPE[Math.floor(Math.random() * CARD_TYPE.length)],
      rooms: getRandomInteger(MAX_ROOM,MIX_ROOM),
      guests: getRandomInteger(MAX_GUESTS, MIN_GUESTS),
      checkin: getRandomChechinOut(),
      chechout: getRandomChechinOut(),
      features: getRandomFeatures(),
      discription: '',
      photos:  getRandomPhotos()
    },
    location: location
    });
  
  }
 
  return data;

}

var generatedObjects = generateData();


function createPin(object, id) {



  var templatePin = document.querySelector('template').content.querySelector('.map__pin');

  
  var pinElement = templatePin.cloneNode(true);
  
  pinElement.style.left = object.location.x + 24 + 'px';
  pinElement.style.top = object.location.y + 2 + 'px';
  pinElement.dataset.index = id;
  var pinImage = pinElement.firstElementChild;
  pinImage.src = object.author.avatar;
  pinImage.alt = object.offer.title;
  
  return pinElement;
}

//Функция добавления пинов в разметку

var onPinClick = function(evt){
  var PinClick = evt.target;
  while (PinClick !== map){
    if (PinClick.className === 'map__pin'){
      var idCard = PinClick.dataset.index;
      createFirstCard(createCard(generatedObjects[idCard]));
      return;
    }
    PinClick = PinClick.parentNode;
  }
}

function createFragmentPins(array){
 
  var fragmentPin = document.createDocumentFragment();

  for (var i= 0; i <array.length; i++){
    var newPin = createPin(array[i], i);
    newPin.addEventListener('click', onPinClick);
    fragmentPin.appendChild(newPin);
  }

  pins.appendChild(fragmentPin);
}

function getHouseType(type){

  switch (type){
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    default:
      return 'Дом';
  }
};


function createCard(object){

  var cloneCard = templateCard.cloneNode(true);

  cloneCard.querySelector('.popup__avatar').src = object.author.avatar;
  cloneCard.querySelector('.popup__title').textContent = object.offer.title;
  cloneCard.querySelector('.popup__text--address').textContent = object.offer.address;
  cloneCard.querySelector('.popup__text--price').textContent = object.offer.price + 'Р/ночь';
  cloneCard.querySelector('.popup__type').textContent = getHouseType(object.offer.type);
  cloneCard.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей.';
  cloneCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.chechout;

  var popupFeatureList = cloneCard.querySelector('.popup__features');
  popupFeatureList.innerHTML = '';

  if (object.offer.features.length){
    for (var i=0; i< object.offer.features.length; i++){
      var newFeatureItem = document.createElement('li');
      newFeatureItem.className = 'feature feature--' + object.offer.features[i];
      popupFeatureList.appendChild(newFeatureItem);
    }
  } else {
    popupFeatureList.classList('hidden');
  } 


  var popopFoto = cloneCard.querySelector('.popup__pictures');
  popopFoto.innerHTML = '';
  for (var j=0; j<object.offer.photos.length; j++){
    var cardFoto = document.createElement('img');
    cardFoto.classList.add('popop__photo');
    cardFoto.src = object.offer.photos[j];
    cardFoto.alt = 'Фотография жилья';
    cardFoto.width = CARDS_PHOTO_WIDTH;
    cardFoto.height = CARDS_PHOTO_HEIGHT;
    
    popopFoto.appendChild(cardFoto);  

  }

  cloneCard.querySelector('img').src = object.author.avatar;
  return cloneCard;
}

function createFirstCard(object){

    map.insertBefore(object, mapFilters);

}


var map = document.querySelector('.map');


var pins = document.querySelector('.map__pins');
var mapFilters = document.querySelector('.map__filters-container');
var templateCard = document.querySelector('template').content.querySelector('.map__card');

var card =  createCard(generatedObjects[0]);

//createFragmentPins(generatedObjects);
//createFirstCard(card);

var mapPinMain = document.querySelector('.map__pin--main');
var fieldsetAll = document.querySelectorAll('fieldset');
var noticeForm = document.querySelector('.notice__form');
var addressForm = document.querySelector('#address');
addressForm.readOnly = true;

var coords = getCoordinates();


function getAddressFormCord (object){
  addressForm.value = (object.x + ',' + object.y);
}

function getCoordinates (){
  var coordinates = {
    x: mapPinMain.offsetLeft + Math.round(mapPinMain.offsetWidth / 2),
    y: mapPinMain.offsetTop + Math.round(mapPinMain.offsetHeight / 2)
  };
  
  return coordinates;

}


var fadeOn = function(){
  for (var i = 0; i < fieldsetAll.length; i++){
    fieldsetAll[i].disabled = true;   
  }
}

var fadeOff = function(){
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  for (var i = 0; i < fieldsetAll.length; i++){
    fieldsetAll[i].disabled = false;
  }
  createFragmentPins(generatedObjects);
  getAddressFormCord(coords);


  
}

fadeOn();

mapPinMain.addEventListener('mouseup', fadeOff);