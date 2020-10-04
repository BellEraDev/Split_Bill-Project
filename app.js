var c = 0;
var p = 0;
var cost_list = [];
var cost_price = [];
var people = [];
var count = [];
var markers = [];

function add_cost() {
 count[c] = 0;
 cost_list[c] = document.getElementById("list_name").value;
 cost_price[c] = document.getElementById("list_cost").value;
 c++;
 document.getElementById("list_name").value = "";
 document.getElementById("list_cost").value = "0";
 display_array();
}

function add_people() {
 people[p] = document.getElementById("list_people").value;
 markers[p] = [];
 for (var y = 0; y < cost_list.length; y++) {
  count[y]++;
  markers[p].push(y);
 }
 p++;
 document.getElementById("list_people").value = "";
 display_array();
}

function display_array() {
 var all_cost = 0;
 var table_data = "<table class='table'><tr><th>รายการใช้จ่าย</th>";
 //แสดงหัวตาราง   
 for (var x = 0; x < people.length; x++) {
  table_data += "<th>" + people[x] + "</th>";
 }
 //แสดงหัวตาราง   
 table_data += "<th>รวมทุกคน</th></tr>";

 for (var y = 0; y < cost_list.length; y++) {
  table_data += "<tr><th>" + cost_list[y] + "(" + cost_price[y] + ")</th>";
  all_cost += parseFloat(cost_price[y]);
  var pay_per_person = cost_price[y] / count[y];
  for (var x = 0; x < people.length; x++) {
   if (markers[x].indexOf(y) != "-1") {
    table_data += "<th><input type='checkbox' id='" + y + "_" + x + "' onclick='check_v(" + y + "," + x + "," + pay_per_person + ");' checked>" + pay_per_person + "</th>";
   } else {
    table_data += "<th><input type='checkbox' id='" + y + "_" + x + "' onclick='check_v(" + y + "," + x + "," + pay_per_person + ");'> 0 </th>";
   }
  }
  if (count[y] == "0") {
   table_data += "<th>0</th>";
  } else {
   table_data += "<th>" + cost_price[y] + "</th>";
  }
 }
 table_data += "</tr>";

 table_data += "<tr class='redText'><th>จ่ายเพิ่ม/ได้คืน</th>";
 for (var x = 0; x < people.length; x++) {
  var all_pay = 0;
  for (var y = 0; y < cost_list.length; y++) {
   if (markers[x].indexOf(y) != "-1") {
    var pay_per_person = cost_price[y] / count[y];
    all_pay += parseFloat(pay_per_person);
   }
  }
  table_data += "<th>" + all_pay + "</th>";
 }
 if (people.length > 0) {
  table_data += "<th>" + all_cost + "</th></tr></table>";
 } else {
  table_data += "<th>0</th></tr></table>";
 }
 document.getElementById("Result").innerHTML = table_data;
}

function check_v(a, b, pay_per_person) {
 var checkBox = document.getElementById(a + "_" + b);
 var name = window['allpay_' + b];
 if (checkBox.checked == true) {
  count[a]++;
  markers[b].push(a);
 } else {
  count[a]--;
  removeItem(markers[b], a);
 }
 display_array();
}

function removeItem(array, item) {
 for (var i in array) {
  if (array[i] == item) {
   array.splice(i, 1);
   break;
  }
 }
}