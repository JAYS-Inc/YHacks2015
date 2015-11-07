console.log('test!');
var myFirebaseRef = new Firebase("https://geoalarm.firebaseio.com/");
myFirebaseRef.set({
  title: "Alarm 1",
  author: "Yash",
  location: {
    city: "New Haven",
    state: "MA",
    zip: 94103
  }
});