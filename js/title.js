EC.Title = function() {

  this.destroyFlag = false;
  this.transform = new EC.Transform({
    entity: this, 
    position: new EC.Vector2(game.cvs.width/2, game.cvs.height*.15), 
    rotation: 0, 
    scale: new EC.Vector2(game.globalScale,game.globalScale)
  });

  this.prop = new EC.Prop({
    entity: this, 
    src: "img/title.png", 
    dimensions: new EC.Vector2(407, 155), 
    offset: new EC.Vector2(407/2, 155/2), 
    drawLayer: 0
  });

  this.body = new EC.Body({
    entity: this, 
    velocity: new EC.Vector2(-40, 0), 
    rotationVelocity: -1,
  });


}

EC.Title.prototype = {
  
}