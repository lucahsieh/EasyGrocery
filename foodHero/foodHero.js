var canvas = $("#myCanvas")[0];
var ctx = $("#myCanvas")[0].getContext("2d");
var dx = 4;
var dy = 20;
var currentColor;
var ovalX = new Array();
var ovalY = new Array();
var ovalColor = new Array();
var boxColors = ["#683091", "#0C4DA1", "#E92D32", "#05A452", "#FCF103"];
var textType = new Array();
var coolTextX = new Array();
var coolTextY = new Array();
var tappingBox = -1;
var channelSize = 0;
var life = 100;
var reachingLife = 100;
var score = 0;
var clicking = false;
var audio = document.createElement("audio");
var controlVolume= 0;

var myDrawCanvas = setInterval(drawCanvas, 5);
var myCreateBall = setInterval(createBall, 800);

playMusic();

function playMusic(){
  audio.src = "foodHero.mp3";
  audio.controls = false;
  audio.type = "audio/mpeg";
  audio.play();
  audio.volume = 0.1;
  document.body.appendChild(audio);
  
}

function stopMusic(){
  audio.volume = 0;
}

$("#myCanvas")[0].addEventListener('mousedown', function(e){
  tappingBox = Math.floor((e.offsetX - (canvas.width/2 - (channelSize*5/2))) / channelSize);
  clicking = true;
  if (life <= 0) {
    tappingBox = -1;
    }
});

$("#myCanvas")[0].addEventListener('mousemove', function(e){
  if (clicking == true){
    tappingBox = Math.floor((e.offsetX - (canvas.width/2 - (channelSize*5/2))) / channelSize);
  if (life <= 0) {
    tappingBox = -1;
    }
  }
  
}, false);

$("#myCanvas")[0].addEventListener('mouseup', function(e){
  tappingBox = -1;
  clicking = false;
});

$("#myCanvas")[0].addEventListener('touchstart', function(e){
  e.preventDefault();
  let tapSpot = e.touches[0].pageX - canvas.getBoundingClientRect().left;
  
  tappingBox = Math.floor((tapSpot - (canvas.width/2 - (channelSize*5/2))) / channelSize);
  if (life <= 0) {
    tappingBox = -1;
  }
}, false);

$("#myCanvas")[0].addEventListener('touchmove', function(e){
  e.preventDefault();
  
  let tapSpot = e.touches[0].pageX - canvas.getBoundingClientRect().left;
  tappingBox = Math.floor((tapSpot - (canvas.width/2 - (channelSize*5/2))) / channelSize);
  if (life <= 0) {
    tappingBox = -1;
  }
}, false);


$("#myCanvas")[0].addEventListener('touchend', function(e){
  tappingBox = -1;
}, false);

function checkCollider(channelNum){
  let num = 0;
  let channelPos = (canvas.width/2 - (channelSize * 5 / 2)) + (channelSize * channelNum) + channelSize/2;
  for (let i = 0; i < ovalX.length; i++){
    if (ovalX[i] == channelPos && ovalY[i] >= canvas.height - 300){
      let message = "cool";
      score+=2;
      if (ovalY[i] >= canvas.height - 100) {
        message = "perfect";
        life+=3;
        score+=3;
      }
      createText(i, ovalX[i], ovalY[i], message);
      ovalX.splice(i, 1);
      ovalY.splice(i, 1);
      ovalColor.splice(i, 1);
    }
  }
}

function createText(i, x, y, message){
  if (message == "cool"){
    textType[i] ="coolText.png";
  } else {
    textType[i] = "perfectText.png";
  }
  coolTextX[i] = x - 200;
  coolTextY[i] = canvas.height - 400;
  setTimeout(function(){destroyCoolText(i);}, 500);
}

function destroyCoolText(i){
  textType.splice(i, 1);
  coolTextX.splice(i, 1);
  coolTextY.splice(i, 1);
}

$(document).ready(function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  channelSize = window.innerWidth / 9;
}); 

// --------------------------------- draw UI elements on the canvas ----------------------------------------//
function drawRactangle(){
  drawHealthBar();
  for (let i = 0; i < 5; i++){
    ctx.beginPath();
    ctx.rect(i*channelSize + canvas.width/2 - (channelSize*5/2), 0, channelSize, canvas.height);
    let grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(1,boxColors[i]);
    grd.addColorStop(0,"black");
    if (tappingBox == i){
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = grd;
      checkCollider(i);
    } else {
      ctx.fillStyle = "black";
    }
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.closePath();
    drawTapRectangle(i);
    
  }
  drawScoreText();
}

// -------------------------------------- draw the the focus bar for each column --------------------------------//
function drawTapRectangle(i){
  ctx.beginPath();
  ctx.rect(i*channelSize + canvas.width/2 - (channelSize*5/2), canvas.height - 200, channelSize, 100);
  ctx.lineWidth = "6";
  ctx.strokeStyle=boxColors[i];
  ctx.stroke();
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = boxColors[i];
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.closePath();
}

// ------------------------------------------- to draw health bar ----------------------------------------//
function drawHealthBar(){
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  let healthColor = "green"; 
  if (life <= 70){
    healthColor = "orange";
  } 
  if (life <= 30) {
    healthColor = "red";
  }
  ctx.fillStyle = healthColor;
  if (Math.round(reachingLife * 100)/100 < life){
    reachingLife+=0.2;
  } else if (Math.round(reachingLife * 100)/100 > life){
    reachingLife-=0.2;
  }
  let lifeHeight = canvas.height * 0.8 * reachingLife / 100;
  ctx.fillRect(canvas.width * 0.9, canvas.height * 0.1 + (canvas.height * 0.8* (100 - reachingLife)/100 ) , canvas.width * 0.05, lifeHeight);
  ctx.closePath();
}

// ---------------------------------------- to display the score at the top of the screen ---------------------//

function drawScoreText(){
  ctx.font = "300px Arial";
  ctx.fillText(score,300,300);
}

// ------------------------------------------ render notes every 10 ms until player die ------------------//
function drawCanvas(){
  if(life>=100){
        life = 100;
      }
      if (life <= 0){
        life = 0;
      }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRactangle();
  if(life == 0){
    ctx.fillStyle = "red";
    ctx.fillText("Game Over", canvas.width/2 - 600, canvas.height/2 - 100);
    clearInterval(myCreateBall);
    if (reachingLife <= 0.1){
      clearInterval(myDrawCanvas);
      stopMusic();
    }
    return;
  }
  drawBall();
  drawText();
  for(let i = 0; i < ovalY.length; i++){
    ovalY[i] += dy;
  }
}

// -------------------------------- draw perfect/ cool/miss message --------------------------------------//
function drawText() {
  for (let i = 0; i < textType.length; i++){
    let img = new Image();
    img.src=textType[i];
    ctx.drawImage(img, coolTextX[i], coolTextY[i]);
    coolTextY[i] -= 2;
  }
}

// ----------------------------------- render the note every 10 ms ---------------------------------------//

function drawBall(){
  
  for (let i = 0; i < ovalX.length; i++){
    ctx.beginPath();
    ctx.ellipse(ovalX[i], ovalY[i], channelSize/2, 20, 0, 0, 2 * Math.PI);
    ctx.fillStyle = ovalColor[i];
    ctx.fill();
    ctx.closePath();
    if (ovalY[i] > canvas.height){
      ovalX.splice(i, 1);
      ovalY.splice(i, 1);
      ovalColor.splice(i, 1);
      life -= 10;
    }
  }
}

// ------------------------------------- create a new note every ---------------------------------------//
function createBall(){
  if (Math.random() > 0.3 && life > 0){
    let index = ovalX.length;
    let channel = Math.floor(Math.random() * 5);
    ovalX[index] = (canvas.width/2 - (channelSize * 5 / 2)) + (channelSize * channel) + channelSize/2;
    ovalY[index] = 0;
    ovalColor[index] = boxColors[channel];
  }
}

