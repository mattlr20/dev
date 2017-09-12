var currentDate = tableHistory[tableHistory.length -1].week_of; //set default date
var hasTask = Array(); //array of users that have tasks for the current week
var tasks = Object.keys(allAssigns); //get task names (DTCs,EOD,etc.)
var pools = Object.keys(allPools); //get task names (DTCs,EOD,etc.)
var possibleUsers, assignments, userPools, row, currentDate;
var tableArray = [];

function fNewTableRow() { //populate the table with randomized data
    currentDate = tableHistory[tableHistory.length -1].week_of; //set default date

    var table = $('#dataTable');
    table.empty();
    tableArray = [];
    assignments = jQuery.extend(true, {}, allAssigns); //copy from original
    userPools = jQuery.extend(true, {}, allPools);
    var arrayOfThisRow = {};
    var objKey;
    for(row = 0; row < 4; row++) {
        hasTask = Array(); //empty list of users who have task this week already
        var nDate = fNewDate(currentDate);
        var $nr = '<tr><td>'+ nDate + '</td>';

        arrayOfThisRow = {};
        arrayOfThisRow["week_of"] = nDate;

        for(var i = 0; i < 9; i++) {
            tableArray
            var name = fAssign(i);
            $nr = $nr + '<td>' + name.split(".")[0].capitalize() + '</td>'; //only show first name

            objKey = tasks[i];
            arrayOfThisRow[objKey] = name;
        }
        $nr = $nr + '</tr>';
        table.append($nr);
        tableArray.push(arrayOfThisRow);
    }
    $('#btnConfirm').fadeIn("slow");
}

function fAssign(i) { //create data
    var user;
    var task = assignments[tasks[i]];
    var pool = userPools[pools[i]];
    var reversed = pool;
    possibleUsers = pool; 
    thisWeekUsers = possibleUsers.slice(); //temp list of users who doesn't have a task this week;
    
    if (tasks[i] == "split" || tasks[i] == "prp") {  //these task are rotated, not random
        if (row == 0) {
            reversed.reverse();
        }
        var num = task.length-1;
        var lastUser = task[num];
        var nextuser = reversed[reversed.indexOf(lastUser)+1];
        if (nextuser != undefined) {
            user = nextuser;
        } else {
            user = reversed[0];
        }
    } else {
        thisWeekUsers = shuffle(thisWeekUsers);
        if (thisWeekUsers.length < 1) {
        } else {
            user = thisWeekUsers[Math.floor(Math.random()*thisWeekUsers.length)]; //select random user
            var count = 10; //max number of times loop, just in case loop becomes infinite
            while (hasTaskThisWeek(user,i) === true && hasTask.length > 0 && thisWeekUsers.length > 0) {
                user = thisWeekUsers[Math.floor(Math.random()*thisWeekUsers.length)]; 
            }
        }

    }

    if (user != undefined || user != '') {
        hasTask = hasTask.concat(user); //add user to list of has task this week
        task.push(user); //add user list of did this task already
        var index = possibleUsers.indexOf(user);
        if (index > -1 && tasks[i] != "split" && tasks[i] != "prp") {
            possibleUsers.splice(index, 1);
        }
    }

    return user;

}

function hasTaskThisWeek(newUser,x) { //check if user already has a task this week
    for (var i = 0; i < hasTask.length; i++) {
        if (newUser == hasTask[i]) {
            thisWeekUsers.splice(thisWeekUsers.indexOf(hasTask[i]), 1);
            return true;
        } 
    }

    return false;
}

function fNewDate(lastDate) { //create date for table row
       
    var newDate = new Date(lastDate);
    var numberOfDaysToAdd = 7;
    newDate.setDate(newDate.getDate() + numberOfDaysToAdd); 
    var dd = newDate.getDate();
    var mm = newDate.getMonth() + 1;
    var y = newDate.getFullYear();
    var newDate = mm + '/' + dd + '/' + y;

    currentDate = newDate;
    
    return newDate;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function confirmData() {

    if (tableArray.length > 0) {
            var successCount = 0;
            for(i=0; i < tableArray.length; i++) {
               //do ajax call
        }
        document.getElementById('btnConfirm').style.display = "none";
    }

}