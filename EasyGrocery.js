var calSum=0;
var gender = "male";
var age = 5;
// calories that the per son need


$(document).ready(function() {


var necCal = 0;
var calData;
var femaleCal = { 1666, 2000, 1800 };
var maleCal = { 1733, 2800, 2600 }
for (var i = 0; i < maleCal.length; i++){
  calData['male'][i] = maleCal[i];
  calData['female'][i] = femaleCal[i];
}

$(".genderSelection").on("click", function(event){
  $(".genderSelection").removeClass("selectedGender");
  $(this).addClass("selectedGender");
  gender = $(this).attr("value");
});

$(".ageSelection").on("click", function(event){
  $(".ageSelection").removeClass("selectedAge");
  $(this).addClass("selectedAge");
  age = $(this).attr("value");
});


  
$(".submit").on("click",function(event){
  var userName = $("#userName").val();
  
  
 event.preventDefault();

  $.ajax({
      url: "EasyGrocery.php",
      dataType: "json",
      type: "GET",
      data: {output: 'json'},
      success: function(data) {
        createTable(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
  
  
});
});

function createTable(data){
  var st = "<table class='foodTable'>";
  for (var d in data){
    st += "<tr class='foodTable'>";
    st += "<th class='foodTable'>" + d + "</th>";
    for (var i = 0; i < data[d].length; i++){
      
      st += "<td class='foodTable'><img class='foodImg' cal='" + data[d][i]['calories'] + "'value='" + data[d][i]['name'] + "' src='" + data[d][i]['img'] +"'/></td>";
    }
    st += "</tr>";
  }
  st += "</tr>";
  $("#result").html(st);
  
  $(".foodImg").on("click", function(event){
    if($(this).hasClass("selectedFood")){
      calSum -= parseInt($(this).attr("cal"));
    } else {
      calSum += parseInt($(this).attr("cal"));
    }
    $(this).toggleClass("selectedFood");
    calculateCalories();
    
});
}

function calculateCalories(){
  $("#calories").html("Total Calories: " + calSum);;
}
  