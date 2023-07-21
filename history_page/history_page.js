user_id = get_variable_from_URL("uid");
console.log(user_id);
if(user_id == null){
  go_back_to_index();
}

document.getElementById('history_btn').style="color: var(--color_nav_panel_selected)";

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
/*
get_User_Detail_By_key_And_UserId(user_id,'email')
.then((detail) => {
  console.log(detail);
})
.catch((error) => {
  console.error(error);
});
*/

document.getElementById('start_workout_btn_history_empty').addEventListener('click', function () {
  pass_Single_Variables_Through_URL('../start_workout_page/start_workout_page.html','uid',get_variable_from_URL("uid"));
});
    
