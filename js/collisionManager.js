EC.CollisionManager = function(){

  this.EC;
  this.ground;
  this.fistPickups = new Array();
  this.pipes = new Array();

  game.addUpdateObj(this);

}

EC.CollisionManager.prototype = {

  update: function(){
  	var birdRadius = 40 * game.globalScale.x;
    
    for( var i = this.fistPickups.length - 1; i >= 0; i-- ){
      var fistRadius = (this.fistPickups[i].prop.dimensions.x * this.fistPickups[i].transform.scale.x) / 2;
      if(this.EC.transform.position.distanceTo(this.fistPickups[i].transform.position) < fistRadius + birdRadius){
        this.fistPickups[i].prop.destroyFlag = true;
        this.fistPickups[i].body.destroyFlag = true;
        this.fistPickups.splice(i, 1);
        this.EC.addPunch();
      }
    }

    var birdPipeCollision = false;
    for( var i = this.pipes.length - 1; i >= 0; i-- ){
      
      var pipeHalfWidth = (this.pipes[i].low.prop.dimensions.x * this.pipes[i].low.transform.scale.x) / 2;

      // Check if the EC is between a pipe top & bottom pair
      if( this.EC.transform.position.x + birdRadius > this.pipes[i].low.transform.position.x - pipeHalfWidth && this.EC.transform.position.x - birdRadius < this.pipes[i].low.transform.position.x + pipeHalfWidth ){
        // Check if the EC hits the bottom pipe
        if( this.EC.transform.position.y + birdRadius > this.pipes[i].low.transform.position.y && this.pipes[i].low.body.rotationVelocity == 0) {
          this.birdHitPipe(this.pipes[i].low);
          //this.pipes.splice(i, 1);
          continue;
        } else if (this.EC.transform.position.y - birdRadius < this.pipes[i].top.transform.position.y && this.pipes[i].top.body.rotationVelocity == 0 ){
          this.birdHitPipe(this.pipes[i].top);
          //this.pipes.splice(i, 1);
          continue;
        }
      }
    }

    var groundY = this.ground.transform.position.y - this.ground.prop.dimensions.y * this.ground.transform.scale.y * .5;
    if( this.EC.transform.position.y + birdRadius > groundY ){
      this.EC.body.velocity = new EC.Vector2();
      this.EC.transform.position.y = groundY - birdRadius;
      game.gameOver();
    }
  },

  birdHitPipe: function(pipe){
    if(this.EC.punches > 0){

      this.EC.removePunch();
      var punchSoundX = new Audio('audio/cartoon_punch.ogg');
      try {
        punchSoundX.play();
      } catch(err) {
        console.log("won't let me play");
      }
      this.EC.prop.image.src = "img/punchbird_punchforward.png";
      setTimeout(function(){this.EC.prop.image.src = "img/punchbird_arm_bent.png"}.bind(this), 200);

      pipe.transform.position.y += (pipe.transform.rotation == 180 ? pipe.prop.dimensions.y * pipe.transform.scale.y * -1 : pipe.prop.dimensions.y * pipe.transform.scale.y);
      pipe.prop.offset.y = pipe.prop.dimensions.y;
      pipe.body.rotationVelocity = (pipe.transform.rotation == 180 ? -200 : 200);
      
      setTimeout(function(){ 
        pipe.body.rotationVelocity = 0;
      }.bind(this), 500);
      
    } else {
      game.gameOver();
    }
  }
}