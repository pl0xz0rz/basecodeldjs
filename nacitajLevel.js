function nacitajLevel(x,y,map,xs,ys){
	xscale = xs;
	yscale = ys;
	
	cameraMinX = 0;
	cameraMaxX = x * xs;
	cameraMinY = 0;
	cameraMaxY = y * ys;
	
	xoff = 0;
	yoff = 0;
	
	cvx = 0;
	cvy = 0;
	cax = 0;
	cay = 0;

	bulletAmount = 0;

	enemies = new Array();
	food = new Array();
	gates = new Array();

	obdl.drawImage(map,0,0);
	var mapData = obdl.getImageData(0,0,x,y);
	
	for (var i=0;i<mapData.data.length;i+=4)
    {
	/*			console.log(mapData.data[i]);
				console.log(mapData.data[i+1]);
				console.log(mapData.data[i+2]);
				console.log(mapData.data[i+3]);*/
		switch (mapData.data[i] * 0x10000 + mapData.data[i+1] * 0x100 + mapData.data[i+2] * 0x1) {

				
		}
	}
}

function destroyOldGame(){
			bezi = false;
			for(i=displayObjects.length-1;i>=0;--i){
				displayObjects[i].exists = false;
			}
			for(i=bg1.length-1;i>=0;--i){
				bg1[i].exists = false;
			}
			stuff = new Array();
	removeGarbage();
	
	wincondition = 0;
	losecondition = 0;
	gameoverTimer = -1;
	lanemode = false;
}

function exitLevel(dest){
		switch(dest){

		}
}

function tryAgain(){

}

function enterLane(lane,progress){
	protagonistChangeStage= 0;
	cameraMinX = 0;
	cameraMaxX = 600;
	cameraMinY = 0;
	cameraMaxY = 400;
		
	xoff = 0;
	yoff = 0;
			
	cvx = 0;
	cvy = 0;
	cax = 0;
	cay = 0;
	laneprogress = progress;
	currentlane = lane;
	lanemode = true;
	bezi=true;
	existujehra=true;
	for(var i=0;i<screenheight / encounterfrequency;++i){
		randomEncounter(lane,laneprogress-i,i*80-80);
	}
	switch(lane){
		
	}
}

function randomEncounter(lane,progress,offset){
	nextencounter = 80;
	switch(lane){

	}
}
