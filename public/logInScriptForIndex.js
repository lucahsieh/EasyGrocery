<script src="https://www.gstatic.com/firebasejs/4.13.0/firebase.js"></script>

<!-- the initialization snippet for Firebase project. -->
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBJFLfz0UPcmM9puZA_rdiWBbpaFC3lDAo",
    authDomain: "easygroce-59546.firebaseapp.com",
    databaseURL: "https://easygroce-59546.firebaseio.com",
    projectId: "easygroce-59546",
    storageBucket: "easygroce-59546.appspot.com",
    messagingSenderId: "1091864811394"
  };
  firebase.initializeApp(config);
</script>

<!-- the code below initializes the sign-in widget from firebaseUI web. -->
  <script src="https://cdn.firebase.com/libs/firebaseui/2.7.0/firebaseui.js"></script>
  <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/2.7.0/firebaseui.css" />
  <script type="text/javascript">
    // FirebaseUI config.
    var uiConfig = {
      signInSuccessUrl: 'loggedIn.html',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>'
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  </script>
