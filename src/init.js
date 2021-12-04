import firebase from 'firebase/compat/app';

const url = '/__/firebase/init.json';
fetch(url)
  .then((response) => {
    console.log('firebase initialize App');
    return response.json();
  })
  .then(json=>{
    firebase.initializeApp(json);
    require('./main.js');
  })
  .catch((err)=>{
    console.error(err);
  });
