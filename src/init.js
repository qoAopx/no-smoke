import firebase from 'firebase/app';

const url = '/__/firebase/init.json';
fetch(url)
  .then((response) => {
    console.log('firebase initialize App');
    return response.json();
  })
  .then(json=>{
    //console.log(json);
    firebase.initializeApp(json);
    require('./main.js');
  });
