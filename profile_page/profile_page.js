user_id = get_variable_from_URL("uid");
var username;
console.log(user_id);
if(user_id == null){
  go_back_to_index();
}

document.getElementById('profile_btn').style="color: var(--color_nav_panel_selected)";

//First Check if the user is real and exists in database. if no then go to login page
checkIfUserIdExists(user_id)
.then((exists) => {
  if(!exists){
    go_back_to_index();
  }
})
.catch((error) => {
  console.error(error);
});

//Function to get any detail from user

get_User_Detail_By_key_And_UserId(user_id,'username')
.then((detail) => {
  console.log(detail);
  username = detail;
  update_name(username);
})
.catch((error) => {
  console.error(error);
});
    

document.getElementById('chang_name_set_goal_btn').addEventListener('click', function () {
  document.getElementById("profile_expand_change_name_set_goal_container").style.transform = "Scale(1)"
});

document.getElementById('close_change_name_set_goal_btn').addEventListener('click', function () {
  document.getElementById("profile_expand_change_name_set_goal_container").style.transform = "Scale(0)"
});

document.getElementById('save_change_name_set_goal_btn').addEventListener('click', function () {
  var newUsername = document.getElementById('change_name_input').value
  updateUserField(user_id, "username", newUsername)
  .catch((error) => {
    console.error(error);
  });
  username = newUsername
  update_name(username);
});

function update_name(uname){
  document.getElementById('name_display').textContent = uname
  document.getElementById('change_name_input').value = uname
}

document.getElementById('settings_btn').addEventListener('click', function () {
  document.getElementById("profile_expand_setting_container").style.transform = "Scale(1)"
});

document.getElementById('close_settings_btn').addEventListener('click', function () {
  document.getElementById("profile_expand_setting_container").style.transform = "Scale(0)"
});

document.getElementById('measurment_btn').addEventListener('click', function () {
  document.getElementById("profile_expand_measurement_container").style.transform = "Scale(1)"
});

document.getElementById('close_measurement_btn').addEventListener('click', function () {
  document.getElementById("profile_expand_measurement_container").style.transform = "Scale(0)"
});

document.getElementById('log_out_btn').addEventListener('click', function () {
  go_back_to_index();
});