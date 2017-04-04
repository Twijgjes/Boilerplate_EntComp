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
// EC.Transform = function(entity, position, rotation, scale) {
EC.Transform = function(properties) {

  this.entity     = properties.entity;
  this.position   = ( properties.position   != null ? properties.position   : new EC.Vector2( )        );
  this.rotation   = ( properties.rotation   != null ? properties.rotation   : 0                          );
  this.scale      = ( properties.scale      != null ? properties.scale      : new EC.Vector2( )        );

}

EC.Transform.prototype = {

}

//--------------------------
// The prop handles drawing
//--------------------------
//EC.Prop = function(entity, src, dimensions, offset, drawLayer) {
EC.Sprite = function(properties) {
  //this.that = {};

  this.entity    = properties.entity;
  this.image     = new Image();
  this.image.src = properties.src;

  this.dimensions = ( properties.dimensions != null ? properties.dimensions : new EC.Vector2( 16, 16 ) );
  this.offset     = ( properties.offset     != null ? properties.offset     : new EC.Vector2( this.dimensions.x / 2, this.dimensions.y / 2 ) );

  //game.updateObjs.push(this);
  //game.drawObjs.push(this);
  game.addDrawObj(this, (properties.drawLayer != null ? properties.drawLayer : 4));
}

EC.Sprite.prototype = {

  render: function(cvs, ctx) {
    //ctx.drawImage(this.image, 10, this.cvs.height/2, 2000, 400);
    var position = this.entity.transform.position;
    var rotation = this.entity.transform.rotation;
    var scale = this.entity.transform.scale;
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
    //ctx.drawImage(this.image, 10, this.cvs.height/2, 2000, 400);
    var position = this.entity.transform.position;
    var rotation = this.entity.transform.rotation;
    var scale = this.entity.transform.scale;
    ctx.save();
    ctx.translate( position.x, position.y );
    ctx.rotate( rotation*Math.PI/180 );
    ctx.drawImage(this.image, -this.offset.x * scale.x, -this.offset.y * scale.y, this.dimensions.x * scale.x, this.dimensions.y * scale.y);
    ctx.restore();
  },

}

//--------------------------
// The body handles physics
//--------------------------
// EC.Body = function(entity, velocity, rotationVelocity, gravity) {
EC.Body = function(properties) {
    
  this.entity = properties.entity;
  this.velocity         = ( properties.velocity         != null ? properties.velocity         : new EC.Vector2( ) );
  this.rotationVelocity = ( properties.rotationVelocity != null ? properties.rotationVelocity : 0                   );
  this.gravity          = ( properties.gravity          != null ? properties.gravity          : new EC.Vector2( ) );

  //game.updateObjs.push(this);
  game.addUpdateObj(this);

}

EC.Body.prototype = {
    
  update: function(dt) {
    //this.entity.transform.rotation = Math.atan2(this.velocity.y, this.velocity.x + 500) * 180 / Math.PI;
    this.velocity.sub(this.gravity.clone().scale(dt));
    this.entity.transform.position.add(this.velocity.clone().scale(dt).scale(game.globalScale));
    this.entity.transform.rotation += this.rotationVelocity * dt;
  },

}

//--------------------------
// The collider handles, ehh, collisions
//--------------------------
EC.BirdCollider = function(entity, radius){

  this.entity = entity;
  this.radius = (radius != null ? radius : 16 * game.globalScale);

}

EC.BirdCollider.prototype = {

  solve() {
    
  }

}