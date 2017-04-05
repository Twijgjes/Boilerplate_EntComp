EC.KeyboardController = function(properties){
  this.puppet = properties.puppet;

  this.keys = {};

  window.addEventListener('keydown', function(){
    this.keys[event.key] = true;
  }.bind(this));
  window.addEventListener('keyup', function(){
    this.keys[event.key] = false;
  }.bind(this));

  game.addUpdateObj(this);

}

EC.KeyboardController.prototype = {

  update: function(dt){
    let direction = new EC.Vector2(0,0);
    if(this.keys.w){
      direction.y = -1;
    }
    if(this.keys.a){
      direction.x = -1;
    }
    if(this.keys.s){
      direction.y = 1;
    }
    if(this.keys.d){
      direction.x = 1;
    }
    this.puppet.move(direction);
    //console.log(this.puppet.transform.position, this.puppet.body.velocity);
  }
}

