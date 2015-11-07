Jays.Draw = {

	clear: function () {
		Jays.ctx.clearRect(0, 0, Jays.WIDTH, Jays.HEIGHT);
	},

	rect: function (x, y, w, h, col) {
		Jays.ctx.fillStyle = col;
		Jays.ctx.fillRect(x, y, w, h);
	},
	
	Image:function(img,x,y){                
		Jays.ctx.drawImage(img,x,y);
	},
	
	text: function (string, x, y, size, col) {
		Jays.ctx.font = 'bold ' + size + 'px Monospace';
		Jays.ctx.fillStyle = col;
		Jays.ctx.fillText(string, x, y);
	}

};

Jays.Input = {

	x: 0,
	y: 0,
	tapped: false,

	set: function (data) {
		this.x = (data.pageX - Jays.offset.left) / Jays.scale;
		this.y = (data.pageY - Jays.offset.top) / Jays.scale;
		this.tapped = true;
	}

};

Jays.Background = function (x, y) {

	this.x = x;
	this.y = y
	this.bg = new Image();
	this.bg.src = 'assets/yash.png';
	this.name = 'Background';

	this.update = function () {
		this.respawn();
	};

	this.render = function () {

		Jays.Draw.Image(this.bg,this.x,this.y);

	}

	this.respawn = function () {
		this.x = Jays.WIDTH;
	}

}

window.Splash = function(){
	
	this.banner = new Image();
	this.banner.src = "assets/cubes.png";
	
	this.init = function(){
		Jays.entities.push(new Jays.Background(0, 0));
	}
	

	this.update = function(){
		for (i = 0; i < Jays.entities.length; i += 1) {
			Jays.entities[i].update();                    
		}
		if (Jays.Input.tapped) {
			Jays.changeState('Play');
			Jays.Input.tapped = false;
		}
	}

	this.render = function(){
		Jays.Draw.Image(this.banner,0,0);
	}

}



window.addEventListener('load', Jays.init, false);
window.addEventListener('resize', Jays.resize, false);
