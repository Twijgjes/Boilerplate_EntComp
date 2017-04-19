EC.TileChunk = function(size){
	this.destroyFlag = false;

	this.tiles = new Array(size);

	for(let x = 0; x < size; x++){
		this.tiles[x] = new Array(size);
		for(let y = 0; y < size; y++){
			let properties = { position: new EC.Vector2(x * 10, y * 10), color: 'grey' };
			if((x < 8 || y < 8)|| (x > size - 9 || y > size - 9)){
				properties.color = 'green';
			}
			this.tiles[x][y] = new EC.Tile(properties);
		}
	}
}

EC.TileChunk.prototype = {

  getTile: function(position){

  }

}

EC.Tile = function(properties) {
  this.destroyFlag = false;

  this.transform = new EC.Transform({
    entity: this, 
    position: properties.position || new EC.Vector2(game.cvs.width/2, game.cvs.height*.82), 
    rotation: properties.rotation || 0, 
    scale: properties.scale || game.globalScale.clone()
  });

  this.prop = new EC.RectProp({
  	entity: this, 
  	dimensions: properties.dimensions || new EC.Vector2(16, 16),
  	color: properties.color || 'gray',
  	drawLayer: properties.drawLayer || 1
  });
}