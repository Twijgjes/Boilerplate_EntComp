EC.ParallaxScroller = function(SpawnObj, speed){

  this.destroyFlag = false;
  this.SpawnObj = SpawnObj;
  this.scrollSpeed = speed;
  this.objs = new Array();
  this.objs.push(new this.SpawnObj());
  this.objs.push(new this.SpawnObj());
  this.objs[0].transform.position.x = 0;
  this.objs[0].body.velocity.x = this.scrollSpeed;
  this.objs[1].transform.position.x = game.cvs.width;
  this.objs[1].body.velocity.x = this.scrollSpeed;

  game.addLateUpdateObj(this);

}

EC.ParallaxScroller.prototype = {

  lateUpdate: function(){
  	for( var i = this.objs.length - 1; i >= 0; i-- ){
      if( this.objs[i].transform.position.x < -game.cvs.width ){
      	var newObj = new this.SpawnObj();
        newObj.transform.position.x = this.objs[i].transform.position.x + (this.objs[i].prop.dimensions.x * game.globalScale * 2) - 1;
      	newObj.body.velocity.x = this.scrollSpeed;
        this.objs[i].prop.destroyFlag = true;
        this.objs[i].body.destroyFlag = true;
      	this.objs.splice(i, 1);
      	this.objs.push( newObj );
      }
    }
  }
}