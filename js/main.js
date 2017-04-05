// Defining a namespace
var EC = EC || {
  VERSION: '0.0.1'
};

// Game variable for "static" access, very useful when debugging
var game;

window.onload = function() {
  
  // Create a new Game object when the page is loaded
  game = new EC.Game();
  // console.log(game);
  game.setupAndStart();

};

// This is the game class, it also contains game controller logic
EC.Game = function(userSettings) {
  
  // Disable scrollbars
  document.documentElement.style.overflow = 'hidden';  // firefox, chrome
  document.body.scroll = "no"; // ie only

  this.variable = false;
  this.cvs = document.getElementById('cvs'),
  this.ctx = cvs.getContext('2d'),
  this.frameHeight = window.innerHeight,
  this.frameWidth = window.innerWidth,
  this.fps = 0,
  this.fps_now, this.fps_last = (new Date),
  this.fps_el = document.getElementById('fps'),
  this.deltaTime = 0,
  this.globalScale = new EC.Vector2(window.innerHeight / 1000, window.innerHeight / 1000);
  this.cvs.setAttribute('height', this.frameHeight);
  this.cvs.setAttribute('width', this.frameWidth);
  // this.collisionManager;
  this.gameText = document.getElementById("game-text");
  this.gameButton = document.getElementById("game-button");
  this.pause = true;
  // this.currentScore = 0;
  // this.highScore = 0;
  // this.punchBird;

  this.drawLayers = [
    new Array(),
    new Array(),
    new Array(),
    new Array(),
    new Array(),
  ];
  this.updateObjs = new Array();
  this.lateUpdateObjs = new Array();
  this.colliders = new Array();

  // Gets me dat crisp look, aww yiss
  var smoothScalingEnabled = false;
  this.ctx['imageSmoothingEnabled']       = smoothScalingEnabled;
  this.ctx['mozImageSmoothingEnabled']    = smoothScalingEnabled; 
  this.ctx['oImageSmoothingEnabled']      = smoothScalingEnabled; 
  this.ctx['webkitImageSmoothingEnabled'] = smoothScalingEnabled; 
  this.ctx['msImageSmoothingEnabled']     = smoothScalingEnabled;

  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(/* function */ callback, /* DOMElement */ element){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

};

EC.Game.prototype = {

  setupAndStart: function() {
    
    // var title = new EC.Title();
    // this.collisionManager = new EC.CollisionManager();
    // var cloudsParallaxScroller = new EC.ParallaxScroller(EC.Clouds, -100);
    // var bushesParallaxScroller = new EC.ParallaxScroller(EC.Bushes, -200);
    // var groundParallaxScroller = new EC.ParallaxScroller(EC.Ground, -300);
    // var pipeSpawner = new EC.PipeSpawner(-300);
    // this.punchBird = new EC.PunchBird();

    // this.tileA = new EC.Tile();
    this.tileChunk = new EC.TileChunk(64);
    this.player = new EC.Creature();
    this.playerController = new EC.KeyboardController({ puppet: this.player });
    
    this.pause = false;
    this.update();
    this.render();
    this.pause = true;

    this.startGame();

  },

  startGame: function(){
    this.fps_last = (new Date);
    this.pause = false;
    this.update();
  },

  update: function() {

    if(!this.pause){
      /* FPS setup */
      this.fps_now = new Date;
      this.deltaTime = (this.fps_now - this.fps_last)/1000;
      this.fps = 1000/(this.fps_now - this.fps_last);
      this.fps_last = this.fps_now;
      //console.log(this.deltaTime);
  
      for(var i = this.updateObjs.length - 1; i >= 0; i--){
        if(this.updateObjs[i].destroyFlag == true){
          this.updateObjs.splice(i, 1);
          continue;
        }
        this.updateObjs[i].update(this.deltaTime);
      }
  
      for(var i = this.lateUpdateObjs.length - 1; i >= 0; i--){
        if(this.lateUpdateObjs[i].destroyFlag == true){
          this.lateUpdateObjs.splice(i, 1);
          continue;
        }
        this.lateUpdateObjs[i].lateUpdate(this.deltaTime);
      }
    }

    this.render();

    if(!this.pause) 
      requestAnimFrame(function(){ this.update()}.bind(this) );

  },

  render: function() {

    /* /FPS setup */

    this.ctx.save();

    // Clearing the canvas
    this.ctx.fillStyle = "rgb(0,0,0)";
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);

    for(var l = 0; l < this.drawLayers.length; l++){
      for(var i = this.drawLayers[l].length - 1; i >= 0; i--){
        if(this.drawLayers[l][i].destroyFlag == true){
          this.drawLayers[l].splice(i, 1);
          continue;
        }
        this.drawLayers[l][i].render(this.cvs, this.ctx);
      }
    }

    this.ctx.restore();
    
    /* FPS printout */
    this.fps_el.innerHTML = Math.round(this.fps) + " fps";
    /* /FPS printout */

  },

  addScore: function(){
    // this.gameText.innerHTML = ++this.currentScore;
  },

  gameOver: function() {
    
    this.pause = true;

    // if (this.currentScore > this.highScore){
    //   this.highScore = this.currentScore;
    //   this.gameText.innerHTML = "SCORE: " + this.currentScore + "<br>HIGHSCORE: " + this.highScore;
    // }
    // this.currentScore = 0;
    // var img = this.gameButton.getElementsByTagName("img")[0];
    // img.src = "img/restartbutton.png";
    // this.gameButton.className = "";
    // img.onclick = function(){game.restart()}.bind(this);
    // this.punchBird.removeEvent();
    //console.log("game over!");

  },

  restart: function(){
    this.drawLayers = [
      new Array(),
      new Array(),
      new Array(),
      new Array(),
      new Array(),
    ];
    this.updateObjs = new Array();
    this.lateUpdateObjs = new Array();
    

    // var title = new EC.Title();
    // this.collisionManager = new EC.CollisionManager();
    // var cloudsParallaxScroller = new EC.ParallaxScroller(EC.Clouds, -100);
    // var bushesParallaxScroller = new EC.ParallaxScroller(EC.Bushes, -200);
    // var groundParallaxScroller = new EC.ParallaxScroller(EC.Ground, -300);
    // var pipeSpawner = new EC.PipeSpawner(-300);
    // this.punchBird = new EC.PunchBird();

    this.pause = false;
    this.fps_last = (new Date);
    this.update();
    // this.gameButton.className = "hidden";
    // this.gameText.innerHTML = "0";

    // console.log("restarting!");
  },

  addUpdateObj: function(obj){
    this.updateObjs.push(obj);
    if(obj.destroyFlag == undefined) obj["destroyFlag"] = false;
  },

  addLateUpdateObj: function(obj){
    this.lateUpdateObjs.push(obj);
    if(obj.destroyFlag == undefined) obj["destroyFlag"] = false;
  },

  addDrawObj: function(obj, layer){
    // let _layer = (layer != null ? layer : 0);
    this.drawLayers[layer || 0].push(obj);
    if(obj.destroyFlag == undefined) obj["destroyFlag"] = false;
  },

  addCollider: function(obj){
    this.colliders.push(obj);
    if(obj.destroyFlag == undefined) obj["destroyFlag"] = false;
  },
  
};

EC.Vector2 = function(x,y) {

  this.x = (x || 0);
  this.y = (y || 0);

}

EC.Vector2.prototype = {
  
  add: function(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  },

  sub: function(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  },

  // SCALARS only!
  scale: function(s) {
    this.x *= s;
    this.y *= s;
    return this;
  },

  // THIS is what you use for vectors
  multiply: function(v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  },

  copy: function(v){
    this.x = v.x;
    this.y = v.y;
    return this;
  },

  clone: function(){
    return new EC.Vector2(this.x, this.y);
  },

  distanceTo: function(v){
    var dx = v.x - this.x;
    var dy = v.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

}