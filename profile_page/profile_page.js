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
  update_name(username)
  document.getElementById("profile_expand_change_name_set_goal_container").style.transform = "Scale(1)"
});

document.getElementById('close_change_name_set_goal_btn').addEventListener('click', function () {
  document.getElementById("profile_expand_change_name_set_goal_container").style.transform = "Scale(0)"
});

document.getElementById('save_change_name_set_goal_btn').addEventListener('click', function () {
  const newUsername = document.getElementById('change_name_input').value.trim();
  if (newUsername !== '') {
    updateUserField(user_id, "username", newUsername)
    .catch((error) => {
      console.error(error);
      create_toast("Error Please Try Again Later","var(--color_icon_btn_gray)","var(--color_white)");
    });
    username = newUsername
    create_toast("Saved","var(--color_icon_btn_gray)","var(--color_white)");
    update_name(username);
  }else{
    create_toast("Enter a valid Name","var(--color_icon_btn_gray)","var(--color_red)");
  }
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


function create_toast(message,background_color,text_color){
  Toastify({
    text: message,
    duration: 2000,
    className: "info",
    style: {
      background: background_color,
      color: text_color,
    }
  }).showToast();
}