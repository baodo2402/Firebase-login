// account.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Rest of your JavaScript code here
// ...
 //use either of these APIs, the second one prefered
  //`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  //'https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}'
  const findMyLocation = () => {
    const status = document.querySelector('.status');
  
  
  
    const success = (position) => {
      console.log(position)
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      //console.log(latitude + " " + longitude)
  
      //a free API used to transfer lat and lon to suburbs/city name
      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  
      fetch(geoApiUrl)
      .then(res => res.json())
      .then(data => {
        
        //console.log(data)
        status.textContent = data.locality
        const user = firebase.auth().currentUser;
        if (user) {
              const userRef = firebase.database().ref('users/' + user.uid);
              userRef.update({
                locality: data.locality,
                email: email
              });
            }
      })
      .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  
    const error = () => {
      status.textContent = 'Unble to retrieve your location, please unblock the location permission in your browser'
  
    }
  
    navigator.geolocation.getCurrentPosition(success, error);
  }
  
  document.querySelector('.getMyLocation').addEventListener('click', findMyLocation);