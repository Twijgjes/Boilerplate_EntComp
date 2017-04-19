
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
EC.Collision = {

  circleCircle: function(circleA, circleB){
    let aPos = circleA.entity.transform.position.clone();
    let bPos = circleB.entity.transform.position.clone();
    let distance = aPos.distanceTo(bPos);
    let radii = circleA.radius + circleB.radius;
    let separation = distance - radii;

    return {
      collided: radii > distance,
      separation: separation,
      aOut: aPos.clone().sub(bPos).normalize().scale(-separation),
      bOut: bPos.clone().sub(aPos).normalize().scale(-separation)
    };
  },

  circlePoint: function(circle, point){
    let cPos = circle.entity.transform.position.clone();
    let distance = cPos.distanceTo(point);
    let separation = distance - circle.radius;
    return {
      collided: distance < circle.radius),
      separation: separation,
      circleOut: cPos.clone().sub(point).normalize().scale(-separation),
      pointOut: point.clone().sub(cPos).normalize().scale(-separation)
    }
  },

  boxBox: function(boxA, boxB){
    // Get the positions and set the origin to the upper left corner
    let aPos = boxA.entity.transform.position.clone().add(boxA.dimensions.clone().scale(.5));
    let bPos = boxB.entity.transform.position.clone().add(boxB.dimensions.clone().scale(.5));
    if(aPos.x + boxA.dimensions.x > bPos.x &&
       bPos.x + boxB.dimensions.x > aPos.x &&
       aPos.y + boxA.dimensions.y > bPos.y &&
       bPos.y + boxB.dimensions.y > aPos.y){
      // right side of box A collides with the left side of box B
      console.log("Collision!");
    }
    else {
      console.log("No collision!");
    }
  },

  boxPoint: function(box, point){
    // Put the box origin in the upper left corner again.
    boxPos = box.entity.transform.position.clone().add(box.dimensions.clone().scale(.5));
    // Of course we need to apply the same transform to the point.
    pointPos = point.clone().add(box.dimensions.clone().scale(.5));
    if(pointPos.x > boxPos.x && pointPos.x < boxPos.x + box.dimensions.x &&
       pointPos.y > boxPos.y && pointPos.y < boxPos.y + box.dimensions.y) {
      return "Collision!";
    }
    return "No collision";
  }

}

EC.CircleCollider = function(properties){

  this.TYPE = EC.ColliderTypes.CIRCLE;

  this.entity = properties.entity;
  this.radius = (properties.radius != null ? properties.radius : 16 * game.globalScale.x);

  game.addCollider(this);
}

EC.BoxCollider = function(properties){
  this.TYPE = EC.ColliderTypes.BOX;

  this.entity = properties.entity;
  this.dimensions = properties.dimensions;
}

EC.ColliderTypes = {
  CIRCLE: 0,
  BOX: 1,
}