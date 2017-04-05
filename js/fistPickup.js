EC.FistPickup = function(position) {

  this.destroyFlag = false;
  this.transform = new EC.Transform({
  	entity: this,
  	position: (position != null ? position : new EC.Vector2(game.cvs.width, game.cvs.height*.5)), 
  	rotation: 0,
  	scale: game.globalScale.clone();
  });

  this.prop = new EC.Prop({ 
  	entity: this, 
  	src: "img/FIST.png", 
  	dimensions: new EC.Vector2(75, 75), 
  	offset: new EC.Vector2(75/2, 75/2), 
  	drawLayer: 3
  });

  this.body = new EC.Body({
  	entity: this, 
  	velocity: new EC.Vector2(-300, 0), 
  	rotationVelocity: 0 
  });
  game.collisionManager.fistPickups.push(this);

}

EC.FistPickup.prototype = {

}

EC.GUIFist = function(position) {

  this.destroyFlag = false;
  this.transform = new EC.Transform({
    entity: this,
    position: (position != null ? position : new EC.Vector2(game.cvs.width, game.cvs.height*.5)), 
    rotation: 0,
    scale: game.globalScale.clone();
  });

  this.prop = new EC.Prop({ 
    entity: this, 
    src: "img/FIST.png", 
    dimensions: new EC.Vector2(75, 75), 
    offset: new EC.Vector2(75/2, 75/2), 
    drawLayer: 4
  });

}