//===========================
//
// Here be "components". 
// Got used to components using Unity, this is a VERY basic, less dynamic, implementation. 
// Since I don't have the time to make a complete entity component system.
//
//===========================


//--------------------------
// The transform handles position and rotation
//--------------------------
EC.Transform = function(properties) {

  this.entity     = properties.entity;
  this.position   = properties.position || new EC.Vector2( );
  this.rotation   = properties.rotation || 0;
  this.scale      = properties.scale    || new EC.Vector2( );

}

EC.Transform.prototype = {

}

//--------------------------
// The prop handles drawing
//--------------------------
EC.Sprite = function(properties) {

  this.entity    = properties.entity;
  this.image     = new Image();
  this.image.src = properties.src;

  this.dimensions = ( properties.dimensions != null ? properties.dimensions : new EC.Vector2( 16, 16 ) );
  this.offset     = ( properties.offset     != null ? properties.offset     : new EC.Vector2( this.dimensions.x / 2, this.dimensions.y / 2 ) );

  game.addDrawObj(this, (properties.drawLayer != null ? properties.drawLayer : 4));
}

EC.Sprite.prototype = {

  render: function(cvs, ctx) {
    let position = this.entity.transform.position;
    let rotation = this.entity.transform.rotation;
    let scale = this.entity.transform.scale;
    ctx.save();
    ctx.translate( position.x, position.y );
    ctx.rotate( rotation*Math.PI/180 );
    ctx.drawImage(this.image, -this.offset.x * scale.x, -this.offset.y * scale.y, this.dimensions.x * scale.x, this.dimensions.y * scale.y);
    ctx.restore();
  },

}

EC.RectProp = function(properties) {
  this.entity    = properties.entity;
  this.color     = properties.color;
  this.dimensions = ( properties.dimensions != null ? properties.dimensions : new EC.Vector2( 16, 16 ) );
  this.offset     = ( properties.offset     != null ? properties.offset     : new EC.Vector2( this.dimensions.x / 2, this.dimensions.y / 2 ) );

  game.addDrawObj(this, (properties.drawLayer != null ? properties.drawLayer : 4));
}

EC.RectProp.prototype = {

  render: function(cvs, ctx) {
    let position = this.entity.transform.position;
    let rotation = this.entity.transform.rotation;
    let scale = this.entity.transform.scale;
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.translate( position.x, position.y );
    ctx.rotate( rotation*Math.PI/180 );
    ctx.fillRect(this.offset.x, this.offset.y, this.dimensions.x, this.dimensions.y);
    ctx.restore();
  },

}

//--------------------------
// The body handles physics
//--------------------------
EC.Body = function(properties) {
    
  this.entity = properties.entity;
  this.velocity         = properties.velocity         || new EC.Vector2( );
  this.rotationVelocity = properties.rotationVelocity || 0;
  this.gravity          = properties.gravity          || new EC.Vector2( );
  game.addUpdateObj(this);

}

EC.Body.prototype = {
    
  update: function(dt) {
    this.velocity.sub(this.gravity.clone().scale(dt));
    this.entity.transform.position.add(this.velocity.clone().scale(dt).multiply(game.globalScale));
    this.entity.transform.rotation += this.rotationVelocity * dt;
  },

}

//--------------------------
// The collider handles, ehh, collisions
//--------------------------
EC.CircleCollider = function(entity, radius){

  this.TYPE = EC.ColliderTypes.CIRCLE;

  this.entity = entity;
  this.radius = (radius != null ? radius : 16 * game.globalScale.x);

  game.addCollider(this);
}

EC.CircleCollider.prototype = {

  solve: function(collider) {
    switch(collider.TYPE) {
      case EC.ColliderTypes.CIRCLE:
        solveCircle(collider);
        break;
      case EC.ColliderTypes.BOX:
        solveBox(collider);
        break;
      default:
        console.log("Implement collision for CircleCollider to " + collider.TYPE.toString());
        break;
    }
  },

  solveCircle: function(collider){
    let distance = collider.entity.transform.position.distanceTo(this.entity.transform.position);
    return distance < this.radius + collider.radius;
  },

  solveBox: function(collider){

  },

}

EC.ColliderTypes = {
  CIRCLE: 0,
  BOX: 1,
}