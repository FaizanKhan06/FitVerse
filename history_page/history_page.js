user_id = get_variable_from_URL("uid");
console.log(user_id);
if(user_id == null){
  go_back_to_index();
}

const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 10);
document.getElementById("set_date_btn").value = formattedDate;

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

document.getElementById('start_workout_btn_history_empty').addEventListener('click', function () {
  pass_Single_Variables_Through_URL('../start_workout_page/start_workout_page.html','uid',get_variable_from_URL("uid"));
});    
