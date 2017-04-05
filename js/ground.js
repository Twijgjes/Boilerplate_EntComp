EC.Ground = function() {

  this.destroyFlag = false;
  this.transform = new EC.Transform({
    entity: this, 
    position: new EC.Vector2(game.cvs.width/2, game.cvs.height*.95), 
    rotation: 0, 
    scale: game.globalScale.clone();
  });

  this.prop = new EC.Prop({
  	entity: this, 
  	src: "img/ground.png", 
  	dimensions: new EC.Vector2(600, 147), 
    //offset: new EC.Vector2(600/2, 147/2), 
    offset: new EC.Vector2(0, 147/2), 
    drawLayer: 3
  });

  this.body = new EC.Body({
  	entity: this, 
  	velocity: new EC.Vector2(-200, 0), 
  	rotationVelocity: 0 
  });
  game.collisionManager.ground = this;

}

EC.Ground.prototype = {

}