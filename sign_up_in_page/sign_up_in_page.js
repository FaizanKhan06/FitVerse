//Creates a message to store in database
const saveUserDetails = (username,email,password) => {
  var user_details = user_db.push();
  user_details.set({
    username:username,
    email:email,
    password:password
  })
}

// Function to check if the email exists
function checkIfEmailExists(email) {
  return user_db
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(snapshot => {
      // If the snapshot contains data, the email exists
      return snapshot.exists();
    })
    .catch(error => {
      console.error('Error checking email:', error);
      return false;
    });
}

//Singup Event Handling
function handleEmailCheckResult_SignUp(email, exists, username,password) {
  if (exists) {
    alert('Email already exists');
  } 
  else {
    saveUserDetails(username,email,password);

    get_User_Id_By_Email_And_Password(email, password)
    .then(userid => {
      go_to_start_workout_page(userid)
    })
    .catch(handleEmailCheckError);
  }
}

//if the email and password match then ho to start Workout Page
function go_to_start_workout_page(userid){
  if (userid) {
    console.log(userid);
    pass_Single_Variables_Through_URL("../start_workout_page/start_workout_page.html","uid",userid);
    /*
    addNewObjectToUserData(username[0], {workout:"Push"})
      .then(success => {
        if (success) {
            console.log('Phone number added to user data.');
          } else {
            console.log('Failed to update user data.');
          }
        })
        .catch(error => {
          console.error('Error occurred:', error);
        });
      */
  } else {
    alert('Invalid email or password.');
  }
}

//SignUp User
function handleSignUp(event) {
  event.preventDefault();
  const username = document.getElementById('signUp_username').value;
  const email = document.getElementById('signUp_email').value;
  const password = document.getElementById('signUp_password').value;
  
  console.log("Username: " + username);
  console.log("Email: " + email);
  console.log("Password: " + password);
  
  checkIfEmailExists(email)
  .then(emailExists => {
    handleEmailCheckResult_SignUp(email, emailExists, username,password);
  })
  .catch(handleEmailCheckError);
}

//SignIn User
function handleSignIn(event) {
  event.preventDefault();
  const email = document.getElementById('signIn_email').value;
  const password = document.getElementById('signIn_password').value;
  console.log("Email: " + email);
  console.log("Password: " + password);
  get_User_Id_By_Email_And_Password(email, password)
  .then(userid => {
    go_to_start_workout_page(userid)
  })
  .catch(handleEmailCheckError);
}

//SignIn Animation
document.getElementById('signIn').addEventListener('click', function () {
  document.getElementById('signIn_container').style.transform = 'translateY(0%)';
});
document.getElementById('SignInClose').addEventListener('click', function () {
  document.getElementById('signIn_container').style.transform = 'translateY(100%)';
});

//SignUpAnimation
document.getElementById('signUp').addEventListener('click', function () {
  document.getElementById('signUp_container').style.transform = 'translateY(0%)';
});
document.getElementById('SignUpClose').addEventListener('click', function () {
  document.getElementById('signUp_container').style.transform = 'translateY(100%)';
});