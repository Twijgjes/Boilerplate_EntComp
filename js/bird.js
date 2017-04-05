EC.PunchBird = function() {

  this.destroyFlag = false;

  this.punches = 1;
  this.fists = new Array();
  this.fists.push(new EC.GUIFist());
  this.fistBasePos = new EC.Vector2(game.cvs.width * .07, game.cvs.height * .05);
  this.fists[0].transform.position.copy(this.fistBasePos);

  this.transform = new EC.Transform({
    entity: this, 
    position: new EC.Vector2(game.cvs.width/2, game.cvs.height*.47), 
    rotation: 0, 
    scale: game.globalScale.clone();
  });

  this.prop = new EC.Prop({
    entity: this, 
    src: "img/punchbird_arm_bent.png", 
    dimensions: new EC.Vector2(150, 150), 
    drawLayer: 4
  });

  this.body = new EC.Body({ 
    entity: this, 
    velocity: new EC.Vector2(), 
    rotationVelocity: 0, 
    gravity: new EC.Vector2(0,-1500) 
  });

  game.collisionManager.EC = this;
  game.addUpdateObj(this);

  this.punchSound = new Audio('audio/cartoon_punch.ogg');

  this.punchEvent = function(){ 
    this.punch();
  }.bind(this);
  document.addEventListener("click", this.punchEvent, false);

}

EC.PunchBird.prototype = {
  
  addPunch: function(){
    this.punches++;
    this.fists.push(new EC.GUIFist());
    this.fists[this.punches - 1].transform.position.copy(this.fistBasePos);
    this.fists[this.punches - 1].transform.position.x += game.cvs.width * .11 * (this.punches - 1);
  },

  removePunch: function(){
    this.punches--;
    if(this.punches > -1) {
      this.fists[this.punches].prop.destroyFlag = true;
      this.fists.splice(this.punches, 1);
    }
  },

  punch: function(){
    this.body.velocity.y = -500;
    var punchSoundX = new Audio('audio/cartoon_punch.ogg');
    try {
      punchSoundX.play();
    } catch(err) {
      console.log("won't let me play");
    }
    this.prop.image.src = "img/punchbird_punchdown.png";
    setTimeout(function(){this.prop.image.src = "img/punchbird_arm_bent.png"}.bind(this), 100);
  },

  removeEvent: function(){
    document.removeEventListener("click", this.punchEvent, false);
  },

  update: function(){
    //console.log(this.body.velocity);
    this.transform.rotation = (this.body.velocity.y / 1500) * 90;
  }

}