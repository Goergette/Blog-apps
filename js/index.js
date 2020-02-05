var firebaseConfig = {
    apiKey: "AIzaSyCcVpe63-rZI9vmyOutXQHtUeQ4-C-xuHU",
    authDomain: "fir-webapp-478f2.firebaseapp.com",
    databaseURL: "https://fir-webapp-478f2.firebaseio.com",
    projectId: "fir-webapp-478f2",
    storageBucket: "fir-webapp-478f2.appspot.com",
    messagingSenderId: "741616645102",
    appId: "1:741616645102:web:0f98f909175d7a464e54ff",
    measurementId: "G-6NX2GR1K3G"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth.Auth.Persistence.LOCAL;


  //firebase.analytics();

  $("#btn-login").click(function()
  {
    var email= $("#email").val();
    var password= $("#password").val();
    if(email != "" && password != "")
    {
      var result= firebase.auth().signInWithEmailAndPassword(email, password);
      result.catch(function(error)
      {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

        window.alert("Message: " + errorMessage);

      });
    }
    else
    {
      window.alert("Form is incomplete.Please fill out all fields");
    }
  });

  
  $("#btn-signup").click(function()
  {
    var email= $("#email").val();
    var password= $("#password").val();
    var cPassword= $("#confirmPassword").val();

    if(email != "" && password != "" && cPassword != "")
    {
      if(password ==cPassword){
      
        var result= firebase.auth().createUserWithEmailAndPassword(email, password);
        result.catch(function(error)
        {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode);
          console.log(errorMessage);

          window.alert("Message: " + errorMessage);

        });
     }
     else
     {
        window.alert("Password do not match with the confirm password");
     }
    } 
    else
    {
      window.alert("Form is incomplete.Please fill out all fields");
    }
  });



  $("#btn-resetPassword").click(function()
  {
    var auth = firebase.auth();
    var email =$("#email").val();

    if(email != "")
    {
      auth.sendPasswordResetEmail(email).then(function()
      {
        window.alert("Email has been send to you, please check and verify  ")
      })
      .catch(function(error)
      {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

        window.alert("Message: " + errorMessage);
      });
    }
    else{
      window.alert("please write your email first");
    }

  });


  $("#btn-logout").click(function()
  {
    firebase.auth().signOut();
    
  });


  $("#btn-update").click(function()
  {
    var phone= $("#phone").val();
    var address= $("#address").val();
    var bio= $("#bio").val();
    var fName= $("#firstName").val();
    var sName= $("#secondName").val();
    var country= $("#country").val();
    var gender= $("#gender").val();

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef= rootRef.child(userID);
    
    if(fName!="" && sName!="" && phone!=""  && country!="" && gender!="" && bio!="" && address!="")
    {
      var userData =
      {
        "phone":phone,
        "address ": address,
        "bio": bio,
        "firstName":firstName,
        "secondName": secondName,
        "country":country,
        "gender": gender,
      };
      usersRef.set(userData, function(error)
      {
        if(error)
        {

          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode);
          console.log(errorMessage);

          window.alert("Message:" + errorMessage);
        }
        else
        {
          window.location.href= "mainPage.html";
        }
      });
    }
    else
    {
      window.alert("Formis incomplete. Please fill out all fiels" );
    }

  });