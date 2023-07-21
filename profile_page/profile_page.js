user_id = get_variable_from_URL("uid");
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
  document.getElementById('name_display').textContent = detail;
})
.catch((error) => {
  console.error(error);
});
    
