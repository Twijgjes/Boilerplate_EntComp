EC.Creature = function(properties){
  this.destroyFlag = false;
  properties = properties || {};

  this.transform = new EC.Transform({
    entity: this, 
    position: properties.position || new EC.Vector2(game.cvs.width/2, game.cvs.height*.82), 
    rotation: properties.rotation || 0, 
    scale: properties.scale || game.globalScale.clone()
  });

  this.prop = new EC.RectProp({
    entity: this, 
    dimensions: properties.dimensions || new EC.Vector2(5, 5),
    color: properties.color || 'blue',
    drawLayer: properties.drawLayer || 2
  });

  this.body = new EC.Body({
    entity: this, 
    velocity: new EC.Vector2(0, 0), 
    rotationVelocity: 0 
  });
}

EC.Creature.prototype = {

  move: function(direction){
    this.body.velocity = direction.scale(50);
  },

}