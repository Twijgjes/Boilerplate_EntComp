EC.PipeSpawner = function(speed){

  this.destroyFlag = false;
  this.scrollSpeed = speed;
  this.objs = new Array();
  this.uselessObjs = new Array();
  // Make a random y position offset
  var variation = (game.cvs.height * .3);
  var yOffset = Math.random() * variation;
  yOffset -= variation * .5;

  // Make two opposing pipes
  this.objs.push({low: new EC.Pipe(), top: new EC.Pipe()});
  game.collisionManager.pipes.push(this.objs[0]);
  //this.objs.push();

  // Place the pipes
  this.objs[0].low.transform.position.x = game.cvs.width + this.objs[0].low.prop.dimensions.x / 2;
  this.objs[0].low.body.velocity.x = this.scrollSpeed;
  this.objs[0].low.transform.position.y += yOffset;

  this.objs[0].top.transform.position.x = game.cvs.width + this.objs[0].top.prop.dimensions.x / 2;
  this.objs[0].top.transform.position.y -= game.cvs.height * .25;
  this.objs[0].top.transform.position.y += yOffset
  this.objs[0].top.transform.rotation = 180;
  this.objs[0].top.body.velocity.x = this.scrollSpeed;

  game.addLateUpdateObj(this);

}

EC.PipeSpawner.prototype = {

  lateUpdate: function(){
    for( var i = this.objs.length - 1; i >= 0; i-- ){

      if( this.objs[i].low.transform.position.x < game.cvs.width / 2 - this.objs[i].low.prop.dimensions.x / 2 ){
        this.spawnRandomFistPickup();
        var lowPipe = new EC.Pipe();
        var topPipe = new EC.Pipe();

        var xSpawnPos = game.cvs.width + (lowPipe.prop.dimensions.x / 2) * game.globalScale;
        var variation = (game.cvs.height * .3);
        var yOffset = Math.random() * variation;
        yOffset -= variation * .5;

        lowPipe.transform.position.x = xSpawnPos;
        lowPipe.transform.position.y += yOffset;
        lowPipe.body.velocity.x = this.scrollSpeed;

        topPipe.transform.position.x = xSpawnPos;
        topPipe.transform.position.y -= game.cvs.height * .25; // move up a quarter screen
        topPipe.transform.position.y += yOffset;
        topPipe.transform.rotation = 180;
        topPipe.body.velocity.x = this.scrollSpeed;

        this.uselessObjs.push(this.objs[i]);
        var pipesObj = { low: lowPipe, top: topPipe };
        this.objs.push(pipesObj);
        game.collisionManager.pipes.push(pipesObj);
        this.objs.splice(i, 1);
        game.addScore();
      }
      
    }

    for( var i = this.uselessObjs.length - 1; i >= 0; i-- ){
      if( this.uselessObjs[i].low.transform.position.x < 0 - this.uselessObjs[i].low.prop.dimensions.x / 2 ){
        this.uselessObjs[i].low.prop.destroyFlag = true;
        this.uselessObjs[i].top.prop.destroyFlag = true;
        this.uselessObjs[i].low.body.destroyFlag = true;
        this.uselessObjs[i].top.body.destroyFlag = true;
        var pipesIndex = game.collisionManager.pipes.indexOf(this.uselessObjs[i]);
        //console.log("pipes index: " + pipesIndex);
        if(pipesIndex > -1){
          game.collisionManager.pipes.splice(pipesIndex, 1);
        }
        this.uselessObjs.splice(i, 1);
      }
    }
  },

  spawnRandomFistPickup: function(){
    if(Math.random() < .8) 
      return;
    var fistPickup = new EC.FistPickup();
    fistPickup.transform.position = new EC.Vector2(game.cvs.width * 1.5, game.cvs.height * .5);
  }
}

EC.Pipe = function() {

  this.transform = new EC.Transform({
    entity: this, 
    position: new EC.Vector2(game.cvs.width/2, game.cvs.height*.6), 
    rotation: 0, 
    scale: game.globalScale.clone()
  });

  this.prop = new EC.Prop({
  	entity: this, 
  	src: "img/longpipe.png", 
  	dimensions: new EC.Vector2(106, 600), 
    offset: new EC.Vector2(106/2, 0),
    drawLayer: 2
  });

  this.body = new EC.Body({
  	entity: this, 
  	velocity: new EC.Vector2(0, 0), 
  	rotationVelocity: 0
  });

}

EC.Pipe.prototype = {

}