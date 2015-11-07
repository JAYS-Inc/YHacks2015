var Jays = {
	WIDTH: 320,
	HEIGHT: 480,
	scale: 1,
	offset: {
		top: 0,
		left: 0
	},
	entities: [],
	currentWidth: null,
	currentHeight: null,
	canvas: null,
	ctx: null,
	digits:[],
	fonts:[],
	RATIO: null,
	game:null,
	currentWidth: null,
	currentHeight: null,
	canvas: null,
	ctx: null,
	ua: null,
	android: null,
	ios: null,

	init: function () {
		Jays.RATIO = Jays.WIDTH / Jays.HEIGHT;
		Jays.currentWidth = Jays.WIDTH;
		Jays.currentHeight = Jays.HEIGHT;
		Jays.canvas = document.getElementsByTagName('canvas')[0];
		Jays.canvas.width = Jays.WIDTH;
		Jays.canvas.height = Jays.HEIGHT;
		Jays.ctx = Jays.canvas.getContext('2d');
		Jays.ua = navigator.userAgent.toLowerCase();
		Jays.android = Jays.ua.indexOf('android') > -1 ? true : false;
		Jays.ios = (Jays.ua.indexOf('iphone') > -1 || Jays.ua.indexOf('ipad') > -1) ? true : false;
		window.addEventListener('click', function (e) {
			e.preventDefault();
			Jays.Input.set(e);
		}, false);

		window.addEventListener('touchstart', function (e) {
			e.preventDefault();
		}, false);
		window.addEventListener('touchmove', function (e) {
			e.preventDefault();
		}, false);
		window.addEventListener('touchend', function (e) {
			e.preventDefault();
		}, false);

		Jays.resize();
		Jays.changeState("Splash");
		
		Jays.loop();

	},

	/** This function maintains the aspect ratio of the game after resizing of the browser window and across multiple platforms
	*/
	resize: function () {

		Jays.currentHeight = window.innerHeight;
		Jays.currentWidth = Jays.currentHeight * Jays.RATIO;
		if (Jays.android || Jays.ios) {
			document.body.style.height = (window.innerHeight + 50) + 'px';
		}
		Jays.canvas.style.width = Jays.currentWidth + 'px';
		Jays.canvas.style.height = Jays.currentHeight + 'px';
		Jays.scale = Jays.currentWidth / Jays.WIDTH;
		Jays.offset.top = Jays.canvas.offsetTop;
		Jays.offset.left = Jays.canvas.offsetLeft;
		window.setTimeout(function () {
			window.scrollTo(0, 1);
		}, 1);
	},
				

	/** This function will update the game and reset the tapped state of the game
	*/
	update: function () {
		Jays.game.update();
		Jays.Input.tapped = false;
	},

	/** This function draws all entities to the game screen
	*/
	render: function () {
		// cycle through all entities and render to canvas
		for (i = 0; i < Jays.entities.length; i += 1) {
			Jays.entities[i].render();
		}
			
		Jays.game.render();
		
	},

	/** This function iterates the updating and rendering of the game
	*/
	loop: function () {

		requestAnimFrame(Jays.loop);

		Jays.update();
		Jays.render();
	},
	/** This function changes the current state of the game
	* param {string} state - the state the game is to be changed to
	*/
	changeState: function(state) {                   
		Jays.game = new window[state]();
		Jays.game.init();
	}
};