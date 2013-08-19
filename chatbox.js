achnames = new Array();
achtexts = new Array();

achqueue = new Array();

function achievementget(id){
	
}



function showInventory(){
var inventoryMessage = "";
	for(var i = protagonist.inventory.thearray.length-1; i>=0; --i){
		switch(protagonist.inventory.thearray[i].id){

		}
		inventoryMessage += " Amount: " + protagonist.inventory.thearray[i].amount + "<br>";
	}
	inventorydiv.innerHTML = inventoryMessage;
	bezi = false;
	switchScr(6);
}
