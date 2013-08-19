function PhysicsObject(x,y,vx,vy,width,height){


	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	
	this.x1 = 0;
	this.y1 = 0;
	this.x2 = 0;
	this.y2 = 0;

	this.ax = 0;
	this.ay = 0;

	this.svx = 0;
	this.svy = 0;

	this.sax = 0;
	this.say = 0;

	this.xHardness = .45;
	this.yHardness = .45;
	
	this.xFriction = .5;
	this.yFriction = .5;
		

	this.garbage = false;

	this.width = width;
	this.height = height;
		
	this.idealWidth = this.width;
	this.idealHeight = this.height;

	this.updateFrame = updateFrame;
	function updateFrame(){
		this.x += this.vx + this.ax / 2;
		this.y += this.vy + this.ay / 2;
		this.width += this.svx + this.sax / 2 - this.vx - this.ax/2;
		this.height += this.svy + this.say / 2 - this.vy - this.ay/2;
		this.vx += this.ax;
		this.vy += this.ay;
		this.svx += this.sax;
		this.svy += this.say;
		this.ax = 0;
		this.ay = 0;
		this.sax = 0;
		this.say = 0;
		this.say += this.yHardness * (this.idealHeight - this.height);
		this.sax += this.xHardness * (this.idealWidth  - this.width );
		this.ax -= this.sax;
		this.ay -= this.say;
		
		this.svx -= this.vx;
		this.svx *= this.xFriction * .5;
		this.vx += this.svx;
		this.svx += this.vx;
		
		this.svy -= this.vy;
		this.svy *= this.yFriction * .5;
		this.vy += this.svy;
		this.svy += this.vy;

		this.x1 = this.x;
		this.y1 = this.y;
		this.x2 = this.x + this.width;
		this.y2 = this.y + this.height;
		
		}

}

function HeroFairy(x,y,r,str,hp,mana){
  this.po = new PhysicsObject(x-r,y-r,0,0,r*2,r*2);
this.x = x;
this.y = y;
this.str = str;
this.hp = hp;
this.maxhp = hp;
this.mana = mana;
this.maxmana = mana;
  this.render = render;
  this.exists = true;
  this.cooldown = 5;
  this.cdtime = 0;

  this.inventory = new inv();

  function render(){
		obdl.beginPath();
		obdl.strokeStyle="#000000";
		obdl.fillStyle="#c1ff99";
		obdl.lineWidth=2;
		obdl.moveTo(this.po.x - camera.x + this.po.width / 2, this.po.y - camera.y);
		obdl.quadraticCurveTo(this.po.x - camera.x,this.po.y - camera.y,this.po.x - camera.x,this.y - camera.y+ this.po.height / 2);
		obdl.quadraticCurveTo(this.po.x - camera.x,this.po.y - camera.y+ this.po.height,this.po.x  - camera.x + this.po.width/2,this.po.y - camera.y + this.po.height);
		obdl.quadraticCurveTo(this.po.x - camera.x + this.po.width,this.po.y - camera.y + this.po.height,this.po.x - camera.x + this.po.width,this.y - camera.y + this.po.height/2);
		obdl.quadraticCurveTo(this.po.x - camera.x + this.po.width,this.po.y - camera.y,this.po.x  - camera.x+ this.po.width / 2,this.po.y - camera.y);
		obdl.fill();
		obdl.stroke();
		var p = new Particle(this.x,this.y,10,"#99ff99",30);
		displayObjects.push(p);	
  }
  this.updateFrame = updateFrame;
  function updateFrame(){
    this.po.updateFrame();
    this.x = this.po.x + this.po.width / 2;
    this.y = this.po.y + this.po.height / 2;
    if(Math.abs(this.po.vx - this.po.svx) > .5) this.hp -= 1;
    if(Math.abs(this.po.vy - this.po.svy) > .7) this.hp -= 1;
    if(this.cdtime < (this.cooldown + 2))this.cdtime ++;
    this.mana += .01;
    if ((this.mana > this.maxmana) && (this.hp < this.maxhp)) {
		var t = this.mana - this.maxmana;
		this.hp += t;
		this.mana -= t;
	}
    this.x1 = this.po.x1;
    this.x2 = this.po.x2;
    this.y1 = this.po.y1;
    this.y2 = this.po.y2;
  }
  this.seek = seek;
  function seek(x,y){
    var dx = x - this.x;
    var dy = y - this.y;
    var pa = this.str/Math.sqrt(dx * dx + dy * dy);
    if(pa){
      this.po.vx += dx * pa;
      this.po.svx += dx * pa;
      this.po.vy += dy * pa;
      this.po.svy += dy * pa;
    }
  }
  this.brake = brake;
  function brake(eff){
    if(this.po.vx * this.po.vx + this.po.vy * this.po.vy === 0) return false;
    var pa = eff * this.str/Math.sqrt(this.po.vx * this.po.vx + this.po.vy * this.po.vy);
    if(pa){
      this.po.vx -= this.po.vx * pa;
      this.po.svx -= this.po.vx * pa;
      this.po.vy -= this.po.vy * pa;
      this.po.svy -= this.po.vy * pa;
    }
  }
  this.action = action;
  function action(x,y){

  }
}

function Wall(x,y,type){
	this.x = x;
	this.y = y;
	this.t = type;

	this.exists = true;
	
	this.lock = 0;
	
	if(imgs[type]) this.img = imgs[type];
	this.width = widths[type];
	this.height = heights[type];

	this.x1 = this.x - this.width;
	this.x2 = this.x + this.width * 2;
	this.y1 = this.y - this.height;
	this.y2 = this.y + this.height * 2;
	this.xc = this.x + this.width / 2;
	this.yc = this.y + this.height / 2;

	this.render = render;
	function render(){
		switch (this.t){			
			default: obdl.drawImage(this.img,this.x - camera.x,this.y - camera.y);
		}	
	}
		
	this.unlock = unlock;
	function unlock(index){
		switch(this.lock){
			case 1:
				this.exists = false;
			break;
		}
	}
	
}

function Gate(x1,y1,x2,y2){
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.x = x1;
	this.y = y1;
	this.w = 2.5;
	this.vw = 0;
	
	this.id = 0;		
	
	this.width = x2 - x1;
	this.height = y2 - y1;

	this.exists = true;

	this.render = render;
	function render(){
		obdl.strokeStyle="#c1c1ff";
		this.vw -= this.w / 5;
		this.w += this.vw;
		obdl.lineWidth=this.w + 5;
		obdl.beginPath();
		obdl.moveTo(this.x1 - camera.x,this.y1 - camera.y);
		obdl.lineTo(this.x2 - camera.x,this.y2 - camera.y);
		obdl.stroke();		
	}

	this.activate = activate;
	function activate(t){

	}
}

function Powerup(x,y,t){
	this.x = x;
	this.y = y;
	
	this.oy = y;
	
	this.id = t;
	



	this.width = widths[t];
	this.height = heights[t];

	this.x1 = this.x;
	this.x2 = this.x + this.width;
	this.y1 = this.y;
	this.y2 = this.y + this.height;

	this.vy = 2;
	
	this.exists = true;
	
	this.img = imgs[t];
	
	this.render = render;
	function render(){
		if(!this.eaten){
			obdl.drawImage(this.img,this.x - camera.x,this.y - camera.y);
		this.y += this.vy;
		this.vy -= (this.y -this.oy) * .05; //animation, couldn't make anything better

		this.y1 = this.y;
		this.y2 = this.y + this.height;
	}
	
	this.activate = activate;
	function activate(t){

	}

}

function Particle(x,y,r,color,timer){
	this.x = x;
	this.y = y;

	this.x1 = x - r;
	this.x2 = x + r;
	this.y1 = y - r;
	this.y2 = y + r;

	this.r = r;
	this.color = color;
	this.tick = r / timer;
	this.exists = true;

	this.render = render;
	function render(){
		obdl.fillStyle=color;
		obdl.beginPath();
		obdl.arc(this.x - camera.x,this.y - camera.y,this.r,0,2*Math.PI);
		obdl.fill();	
		this.r -= this.tick;
		if(this.r <= 1) this.exists = false;
	}
}

function item(id,amount){
	this.id = id;
	this.amount = amount;
}

function inv(){
	this.thearray = new Array();
	

	this.push = push;
	function push(id,amount){
		for(var i=0;i<this.thearray.length;++i) 
			if(this.thearray[i].id == id) {this.thearray[i].amount ++; return 0;}
		this.thearray.push(new item(id,amount));
	}

	this.consumeItem = consumeItem;
	function consumeItem(id,amount){
		for(var i=0;i<this.thearray.length;++i) 
			if((this.thearray[i].id == id) && (this.thearray[i].amount >= amount)) {this.thearray[i].amount -= amount; return true;}
		return false;
	}
}

var imgs = [];
var widths = [];
var heights = [];

