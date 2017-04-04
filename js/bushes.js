EC.Bushes = function() {

  this.destroyFlag = false;
  this.transform = new EC.Transform({
    entity: this, 
    position: new EC.Vector2(game.cvs.width/2, game.cvs.height*.82), 
    rotation: 0, 
    scale: new EC.Vector2(game.globalScale,game.globalScale)
  });

  this.prop = new EC.Prop({
  	entity: this, 
  	src: "img/bushes.png",
  	dimensions: new EC.Vector2(600, 179), 
  	offset: new EC.Vector2(0,147/2),
  	drawLayer: 1
  });

  this.body = new EC.Body({
  	entity: this, 
  	velocity: new EC.Vector2(-200, 0), 
  	rotationVelocity: 0 
  });

}

EC.Bushes.prototype = {
  
  

}