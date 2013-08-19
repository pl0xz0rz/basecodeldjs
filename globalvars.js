var hlavnaObr=document.getElementById("hlavnaObr");
var obdl=hlavnaObr.getContext("2d");
var obrazovka=document.getElementById("obrazovka");

var introMenu = document.getElementById("introMenu");
var settingsMenu = document.getElementById("settings");
var hra = document.getElementById("hra");
var vyhra = document.getElementById("vyhra");
var prehra = document.getElementById("prehra");
var theMachine = document.getElementById("themachine");

var achievements = new Array();

for (var i = 0; i< 63; ++i) achievements[i] = 0;

var menuList = new Array();
menuList[0] = introMenu;
menuList[1] = hra;
menuList[2] = settingsMenu;
menuList[3] = prehra;
menuList[4] = theMachine;
menuList[5] = vyhra;
menuList[6] = inventorycontainer;

introMenu.style.display="block";

var history = new Array();
history.push(0);

var lvls = new Array();

var stuff = new Array();

var pozadia = new Array();

var vypnutyZvuk;

var bezi = false;

var kbMap = new Array(256);

var displayObjects = new Array();
var bg1 = new Array();

var bullets = new bih2d(1000);

var displayList = new bih2d(5000);

var protagonist;

var powerups = new bih2d(255);

var xmouse;
var ymouse;

var people = new Array();

var camera = new AxisAlignedBoundingBox(0,0,600,400);

var playtime;
var inventory = new Array(10);
var activeitem = 0;
var hitpoints;
var mana;
var score = 0;
var lastlevelscore = 0;
var lastcheckpointscore = 0;
var lastcheckpointhp = 0;
var lastcheckpointmana = 0;

var walls = new bih2d(500);
var hittestArray = new Array();
var enemies = new Array();
var food = new Array();

var revealedcheckpoints = new Array();

var upgrades = new Array();

var wincondition = 0;
var losecondition = 0;
var gameoverTimer = -1;

var existujehra = false;

var protagonistChangeStage = 0;

var firstkey = 0;
var secondkey = 0;
var thirdkey = 0;

var firstKeyInput  = document.getElementById("firstKey");
var secondKeyInput = document.getElementById("secondKey");
var thirdKeyInput  = document.getElementById("thirdKey");

var viableFirstKeys  =  firstKeyInput.getElementsByTagName("option");
var viableSecondKeys = secondKeyInput.getElementsByTagName("option");
var viableThirdKeys  =  thirdKeyInput.getElementsByTagName("option");

var lanemode = false;
var laneprogress = 0;
var currentlane = 0;
var nextencounter = 80;
var lanespeed=1;

$(document).ready(function(){
	$(window).keydown(function(event){
		kbMap[event.which] = true;;
		if (event.which === 'K'.charCodeAt(0)) {
			losecondition = 1;
		}
		if (event.which === 'X'.charCodeAt(0)) {
			moveBack();
		}
	}).keyup(function(event){
		kbMap[event.which] = false;
	}).mouseup(function(event){
		if(bezi) protagonist.action(xmouse + camera.x,ymouse + camera.y);
	}).mousemove(function(event){
		xmouse = event.clientX - hlavnaObr.offsetLeft;
		ymouse = event.clientY - hlavnaObr.offsetTop;
	});
	introMenu.style.display="block";
	var t = setTimeout(function(){enterFrame()},12);
	cinterval = setInterval(function(){if(bezi){++ playtime;/*playtimespan.innerHTML = playtime*/}},1000);
});

function newGame(){
		checkpoints = new Array();
		checkpointid = 0;
		lastcheckpointhp = 20;
		lastcheckpointmana = 20;
		checkpointAmount = 0;
		currentlvl = 0;
		score = 0;
		lastcheckpointscore = 0;
		inventory = new Array();
		enterRealms(0,0,0);
		switchScr(1);
		playtime = 0;
		bezi = true;
}

function vyhraj(){
	destroyOldGame();
	switchScr(5);
	endtime.innerHTML = playtime;
}

function prehraj(){
	destroyOldGame();
	switchScr(3);
}

function muteButton(){
	if(vypnutyZvuk){
	vypnutyZvuk = false;
	} else {
	vypnutyZvuk = true;
	}
}

function switchTrack(to){

}

function resume(){
	if(bezi) return false;
	if(existujehra) {
		switchScr(1);
		bezi = true;
		return true;
		};
	return false;
}

function switchScr(to){
menuList[history[history.length-1]].style.display = "none";
history.push(to);
menuList[to].style.display = "block";
}
function moveBack(){
if(history.length <= 1) return true;
if(history[history.length-1] === 1) return true;
menuList[history.pop()].style.display = "none";
menuList[history[history.length-1]].style.display = "block";
return false;
}
function resetProgress(){
	for (var i = 0; i< 63; ++i) achievements[i] = 0;
}
