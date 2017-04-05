EC.Clouds = function(position) {

  this.destroyFlag = false;
  this.transform = new EC.Transform({
  	entity: this,
  	position: (position != null ? position : new EC.Vector2(game.cvs.width, game.cvs.height*.75)), 
  	rotation: 0,
  	scale: game.globalScale.clone();
  });

  this.prop = new EC.Prop({ 
  	entity: this, 
  	src: "img/clouds.png", 
  	dimensions: new EC.Vector2(600, 285), 
  	offset: new EC.Vector2(0, 285/2), 
  	drawLayer: 0 
  });

  this.body = new EC.Body({
  	entity: this, 
  	velocity: new EC.Vector2(-200, 0), 
  	rotationVelocity: 0 
  });

}

EC.Clouds.prototype = {

}