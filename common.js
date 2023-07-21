const firebaseConfig = {
    apiKey: "AIzaSyDG2KYlOmUNR1-28u9N00fvh9PZe_QhI88",
    authDomain: "fitverse-com.firebaseapp.com",
    databaseURL: "https://fitverse-com-default-rtdb.firebaseio.com",
    projectId: "fitverse-com",
    storageBucket: "fitverse-com.appspot.com",
    messagingSenderId: "77106131044",
    appId: "1:77106131044:web:bdd3cc4de82c61d47faf71"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const user_db = firebase.database().ref('Users');

function get_User_Id_By_Email_And_Password(email, password) {

    // Perform the query to search for the email and password
    return user_db
      .orderByChild('email')
      .equalTo(email)
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userId = Object.keys(userData)[0]; // Get the first user ID (assuming unique emails)
  
          if (userData[userId].password === password) {
            // Return the username when email and password match
            return userId;
          } else {
            return null; // Password doesn't match
          }
        } else {
          return null; // Email doesn't exist
        }
      })
      .catch(error => {
        console.error('Error getting user data:', error);
        return null;
    });
}

function pass_Single_Variables_Through_URL(url,variable_name,variable_val) {
    // Construct the URL with query parameters
    const baseUrl = url; // Replace with your target page URL
    const queryString = `?${variable_name}=${encodeURIComponent(variable_val)}`;
    const urlWithParams = `${baseUrl}${queryString}`;
  
    // Redirect to the URL with query parameters
    window.location.href = urlWithParams;
}

function get_variable_from_URL(variable_name){
    const urlParams = new URLSearchParams(window.location.search);
    const variable_value = urlParams.get(variable_name);
    return variable_value;
}

function get_User_Detail_By_key_And_UserId(userId,detail_key) {
  const databaseRef = user_db.child(userId);

  return databaseRef
    .once('value')
    .then((snapshot) => {
      const userDetails = snapshot.val();
      if (userDetails && userDetails[detail_key]) {
        return userDetails[detail_key];
      } else {
        throw new Error(`${detail_key} not found for the given user ID`);
      }
    })
    .catch((error) => {
      console.error('Error retrieving value:', error.message);
      throw error;
    });
}

function checkIfUserIdExists(userId) {
  const databaseRef = firebase.database().ref('Users').child(userId);

  return databaseRef
    .once('value')
    .then((snapshot) => {
      const userDetails = snapshot.val();
      return userDetails !== null;
    })
    .catch((error) => {
      console.error('Error checking user ID existence:', error.message);
      throw error;
    });
}

function go_back_to_index(){
  window.location.href = "../index.html";
}


/*
function addNewObjectToUserData(userId, newObjectData) {

  // Create a new unique key for the object within the user's data
  const newObjectRef = user_db.child(userId).push();

  // Set the data for the new object
  return newObjectRef
    .set(newObjectData)
    .then(() => {
      console.log('New object added successfully.');
      return true;
    })
    .catch(error => {
      console.error('Error adding new object:', error);
      return false;
    });
}*/

// Function to handle errors
function handleEmailCheckError(error) {
    alert('Error occurred,Please Try Again');
}


document.getElementById('history_btn').addEventListener('click', function () {
  pass_Single_Variables_Through_URL('../history_page/history_page.html','uid',get_variable_from_URL("uid"));
});
document.getElementById('start_workout_btn').addEventListener('click', function () {
  pass_Single_Variables_Through_URL('../start_workout_page/start_workout_page.html','uid',get_variable_from_URL("uid"));
});
document.getElementById('profile_btn').addEventListener('click', function () {
  pass_Single_Variables_Through_URL('../profile_page/profile_page.html','uid',get_variable_from_URL("uid"));
});