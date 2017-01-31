/*
 * classrooms array
 *
 * Classrooms are stored in array as objects. Classroom Objects have a
 *building, a room number, and available times stored under building,
 *room, and times respectively.
 *
 *The times member is a 7 element array of arrays.
 *times[0] corresponds to sunday. The subarrays of times
 *correspond to available classroom times.
 *
 *So if we had times[3] = [8,17] that would correspond to
 *the classroom being open on wednesday at 8AM and 5PM. 
 *We use an empty subarray to denote the classroom being
 *in use from 8AM to 6PM.
 *
 * We also consider all classrooms to be open after 6PM
 * and do not store those times.
*/
var classrooms = [
{building: "MS", room: "5117", times:
	[[],[8,15],[],[8,15],[],[8,17],[]]},
{building: "MS", room: "5118", times:
	[[],[8,16],[15],[],[],[8,17],[]]},
{building: "MS", room: "5127", times:
	[[],[17],[17],[],[],[16,17],[]]},
{building: "MS", room: "5128", times:
	[[],[13],[],[],[],[17],[]]},
{building: "MS", room: "5137", times:
	[[],[8,17],[17],[17],[16,17],[8,17],[]]},
{building: "MS", room: "5138", times:
	[[],[8,15],[17],[8,15,17],[],[8,15],[]]},
{building: "MS", room: "5147", times:
	[[],[8,16,17],[],[8],[],[8],[]]},
{building: "MS", room: "5148", times:
	[[],[8,11,12],[8,13,17],[11,12],[],[8,11,12],[]]},
{building: "MS", room: "5217", times:
	[[],[8,9,10,11,12,15],[],[],[8,17],[15,16,17],[]]},
{building: "MS", room: "5203", times:
	[[],[8,12,15],[11,17],[12],[13,17],[8,12],[]]},
{building: "MS", room: "5225", times:
	[[],[8,9,13,17],[8,17],[],[8,9],[16,17],[]]},
{building: "MS", room: "6627", times:
	[[],[9,15,16,17],[8,13,14,15,16,17],[9,15,17],[9,13,15,16,17],[9,16,17],[]]},
{building: "MS", room: "6229", times:
	[[],[8,17],[16,17],[],[],[8,17],[]]},
{building: "Geology", room: "4645", times:
	[[],[8,16],[15,17],[],[17],[8],[]]},
{building: "Geology", room: "3656", times:
	[[],[8],[8,17],[8],[8,17],[8,16],[]]}
];

var date = new Date();
var current_day = date.getDay();
var current_hour = date.getHours();
var next_hour = 0;

//We set next hour to appropriate time.
if(current_hour != 23) {
	next_hour = current_hour + 1;
} else {
	next_hour = 0;
}

/*
 *Function returns if classroom open at passed time
 *@param time integer value 0-23
 *@param class element of classrooms array
 *@return true or false
 *
 * We take in a time and classroom e.g. open_at(11,classrooms[2]);
 * Then we use current_day variable to look through classroom[2]'s
 * time vector for the appropriate day.
 *
 *If time is present in the times vector we return true to denote
 *the classroom IS available at that time.
 *
 * If time is after 6PM and before 8AM we return true. Also
 * return true if currentDay is 0 or 6 (sun. or sat.).
*/
function open_at_time(input_time, index) {
	//If after 6 and before 8 or sun. or sat. return true
	if(input_time < 8 || 17 < input_time || current_day == 0 ||
		current_day == 6) {
		return true;
	//If classroom has no available times return false
	} else if (classrooms[index].times[current_day].length == 0) {
		return false;
	//Loop through the time stored in classroom[current_day]
	//If time matches one of the stored times return true
	//If none of the stored times matches time return false
	} else {
		var size_times = classrooms[index].times[current_day].length;
		for (j = 0; j < size_times; ++j) {
			if (input_time == classrooms[index].times[current_day][j]) {
				return true;
			}
		}
	}
	return false;
}

window.onload = function() {
	//Really lazy and messy set of ifs to output 12 hour time
	var current_header = document.getElementById("current_header");
	var next_header = document.getElementById("next_header");
	if (0 < current_hour && current_hour < 10) {
		current_header.innerHTML = "Scheduled available now (" + current_hour +
			":00AM - " + next_hour + ":00 AM)";
		next_header.innerHTML = "Scheduled available next hour (" + (current_hour+1) +
			":00AM - " + (next_hour+1) + ":00 AM)";
	} else if (current_hour == 10) {
		current_header.innerHTML = "Scheduled available now (10:00 AM - 11:00AM)";
		next_header.innerHTML = "Scheduled available next hour (11:00AM - 12:00PM)";
	} else if (current_hour == 0) {
		current_header.innerHTML = "Scheduled available now (12:00 AM - 1:00AM)";
		next_header.innerHTML = "Scheduled available next hour (1:00AM - 2:00AM)";
	} else if (current_hour == 11) {
		current_header.innerHTML = "Scheduled available now (11:00AM - 12:00PM)";
		next_header.innerHTML = "Scheduled available next hour (12:00PM - 1:00PM)";
	} else if (current_hour == 12) {
		current_header.innerHTML = "Scheduled available now (12:00PM - 1:00PM)";
		next_header.innerHTML = "Scheduled available next hour (1:00PM - 2:00PM)";
	} else if (12 < current_hour && current_hour < 22) {
		current_header.innerHTML = "Scheduled available now (" + (current_hour - 12) +
			":00PM - " + (next_hour -12) + ":00PM)";
		next_header.innerHTML = "Scheduled available next hour (" + (next_hour - 12) + 
			":00PM - " + (next_hour -11) + ":00PM)";
	} else if (current_hour == 22) {
		current_header.innerHTML = "Scheduled available now (10:00PM - 11:00PM)";
		next_header.innerHTML = "Scheduled available next hour (11:00PM - 12:00AM)";
	//current_hour == 23
	} else {
		current_header.innerHTML = "Scheduled available now (11:00PM - 12:00AM)";
		next_header.innerHTML = "Scheduled available next hour (12:00AM - 1:00AM)";
	}

	//Loop to add currently available classrooms to current_table in page.html.
	//First creates local variable for the "current hour" table
	//Then loops through the classrooms array and runs open_at_time
	//on each element to check for open. If open then adds to table
	//next hour loop below is simlar
	var current_table = document.getElementById("current_table");
	var next_table = document.getElementById("next_table");
	var size_classrooms = classrooms.length;
	for (i = 0; i < size_classrooms; ++i) {
		//Check if open this AND next hour, text underline if so. Can probably handle this
		//in a nicer way
		if (open_at_time(current_hour,i) && open_at_time(next_hour,i)) {
			var row = current_table.insertRow(1);
			var cell = row.insertCell(0);
			cell.innerHTML = "<ins>" +  classrooms[i].building + " " + classrooms[i].room + "</ins>";

			var row = next_table.insertRow(1);
			var cell = row.insertCell(0);
			cell.innerHTML = "<ins>" + classrooms[i].building + " " + classrooms[i].room + "</ins";
		} else {		
			if (open_at_time(current_hour, i)) {
				var row = current_table.insertRow(1);
				var cell = row.insertCell(0);
				cell.innerHTML = classrooms[i].building + " " + classrooms[i].room;
			}
			if (open_at_time(next_hour, i)) {
				var row = next_table.insertRow(1);
				var cell = row.insertCell(0);
				cell.innerHTML = classrooms[i].building + " " + classrooms[i].room;
			}
		}
	}
}
