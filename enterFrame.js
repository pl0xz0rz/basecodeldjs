function renderStuff(){

	obdl.fillStyle="#000000";
	obdl.fillRect(0,0,camera.width,camera.height);

	for (i=bg1.length-1;i>=0;--i){
		bg1[i].render();
	}
	
	for (i=displayObjects.length-1;i>=0;--i){
		displayObjects[i].render();
	}

}

function updateCam(){
	cvx *= .9;
	cvy *= .9;
	
	camera.x += cvx;
	camera.y += cvy;
	
	if (cameraMinX > camera.x) {
		camera.x = cameraMinX;
		cvx *= -.2;
	}
	if (cameraMinY > camera.y) {
		camera.y = cameraMinY;
		cvy *= -.2;
	}
	if (cameraMaxX < camera.x + camera.width) {
		camera.x = cameraMaxX - camera.width;
		cvx *= -.2;
	}
	if (cameraMaxY < camera.y + camera.height) {
		camera.y = cameraMaxY - camera.height;
		cvy *= -.2;
	}
	
	for (i in pozadia){
		pozadia[i].x -= cvx / pozadia[i].z;
		pozadia[i].y -= cvy / pozadia[i].z;		
	}	
}

function collisionDetection(){
	for (var i=0;i<stuff.length;i++){
		var aoc = walls.search(stuff[i].po);
		for (var j=0;j<aoc;j++){
			if(narrowPhase(stuff[i].po,walls.buffer[walls.temparray[j]],0)) walls.buffer[walls.temparray[j]].unlock(i);
		}
	}

	for (var i=1;i<bullets.length;++i){
		if(bullets[i]){
		var aoc = walls.search(bullets.buffer[i]);
		for (var j=0;j<aoc;j++){
			
		}
		}
	}	

	var aoc = bullets.search(protagonist.po);
	for (var j=0;j<aoc;j++){
		var c=bullets.buffer[bullets.temparray[j]];
	if(aabb(protagonist.po.x,protagonist.po.y,protagonist.po.width,protagonist.po.height,c.x,c.y,2,2)){
			c.exists = false;
			protagonist.hp -= 8;
		}
	}


	for(i in food){
		if(aabb(protagonist.po.x,protagonist.po.y,protagonist.po.width,protagonist.po.height,food[i].po.x,food[i].po.y, food[i].po.width, food[i].po.height)){
			food[i].exists = false;
			protagonist.maxhp += 1;
			protagonist.maxmana += 1;
			protagonist.hp += food[i].maxhp / 2;
			protagonist.mana += food[i].mana;
			score += 50;
			if(protagonist.hp > protagonist.maxhp) protagonist.hp = protagonist.maxhp;
			if(protagonist.mana > protagonist.maxmana) protagonist.mana = protagonist.maxmana;
		}
	}
	var c = powerups.search(protagonist.po);
	for (var i = 0; i < c; ++i){
		if(aabb(protagonist.po.x,protagonist.po.y,protagonist.po.width,protagonist.po.height,powerups.buffer[powerups.temparray[i]].x,powerups.buffer[powerups.temparray[i]].y,powerups.buffer[powerups.temparray[i]].width,powerups.buffer[powerups.temparray[i]].height)){
			powerups.buffer[powerups.temparray[i]].activate(0);
			powerups.buffer[powerups.temparray[i]].exists = false;
		}
	}
}

function progressLane(){
	for (var i=bg1.length-1;i>=0;--i){
		bg1[i].y += lanespeed;
	}
	var nazemi = false;
	for (i=stuff.length-1;i>=0;--i){
		nazemi = false;
		stuff[i].po.y += lanespeed;
		if(stuff[i].po.y > 400) stuff[i].hp = 0;
		if((stuff[i].po.x > 540) || (stuff[i].po.x < 60)){
			for(var j=bg1.length-1;j>=0;--j){
				if(aabb(stuff[i].po.x,stuff[i].po.y,stuff[i].po.width,stuff[i].po.height,bg1[j].x,bg1[j].y,bg1[j].width,bg1[j].height)) {nazemi = true;break;}
			}
		if(!nazemi) stuff[i].exists = false;
		}
	}
	for (i=displayObjects.length-1;i>=0;--i){
		displayObjects[i].y += lanespeed;
		displayObjects[i].y1 += lanespeed;
		displayObjects[i].y2 += lanespeed;
		if(displayObjects[i].y > 400) displayObjects[i].exists = false;
	}
	nextencounter -= lanespeed;
	if(nextencounter <= 0) {++laneprogress; randomEncounter(currentlane,laneprogress,-80-nextencounter);}
}

function removeGarbage(){
	for (i=stuff.length-1;i>=0;--i){
		if(!stuff[i].exists) {stuff[i] = stuff[stuff.length - 1]; stuff.pop();--i}
	}
	for (i=displayObjects.length-1;i>=0;--i){
		if(!displayObjects[i].exists) {displayObjects[i] = displayObjects[displayObjects.length - 1]; displayObjects.pop();--i}
	}
	for (i=bg1.length-1;i>=0;--i){
		if(!bg1[i].exists) {bg1[i] = bg1[bg1.length - 1]; bg1.pop();--i}
	}
	for (i=enemies.length-1;i>=0;--i){
		if(enemies[i].hp <= 0) {food.push(enemies[i]);enemies[i] = enemies[enemies.length - 1]; enemies.pop();--i; score += 100}
	}
	for (i=food.length-1;i>=0;--i){
		if(!food[i].exists) {food[i] = food[food.length - 1]; food.pop();--i}
	}
}

function enterFrame(){
 if(bezi){
  collisionDetection();
  for(i in stuff) stuff[i].updateFrame();
//	for (i=0;i<bulletAmount;++i){
//		bullets[i].updateFrame();
//	}
  for (i=1;i<bullets.length;++i){
	if(bullets.buffer[i]) bullets.buffer[i].updateFrame();	
  }
  updateCam();
  renderStuff();
  removeGarbage();
	for(i in stuff){
	stuff[i].po.vx *= .995;
	stuff[i].po.vy *= .995;	

	}
  aiLoop();
  hitpointspan.innerHTML = Math.round(protagonist.hp);
  manaspan.innerHTML = Math.round(protagonist.mana);
  scorespan.innerHTML = Math.round(score);
  
  if(lanemode) progressLane();

	camera.x = protagonist.x - 300;
	camera.y = protagonist.y - 200;
  walls.sort();
  bullets.sort();
  powerups.sort();
  if(protagonist.hp <= 0) losecondition = true;
  if(!protagonist.exists) losecondition = true;
  if(gameoverTimer > 0) --gameoverTimer;
  if((losecondition == 1) && (gameoverTimer < 0)) gameoverTimer = 100;
  if(wincondition == 1) {vyhraj()} else if(gameoverTimer == 0) prehraj();
  exitLevel(protagonistChangeStage);
  removeGarbage();

 }
 t=setTimeout(function(){enterFrame()},12);
}
