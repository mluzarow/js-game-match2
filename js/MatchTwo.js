class MatchTwo {
	constructor (nTiles, time, imageList) {
		this.numTiles = nTiles;
		this.time = time;
		
		this.images = this.setImages (this.numTiles, imageList);
		
		this.drawTiles (this.numTiles, this.images);
	}
	
	setImages (nTiles, imageList) {
		if ((nTiles / 2) > imageList.length) {
			// Duplication images until we have enough
			var delta = (nTiles / 2) - imageList.length;
			
			for (var i = 0; i < delta; i++) {
				imageList.push (imageList[i]);
			}
		}
		
		// We have exactly the amount we need; now duplicate the list.
		imageList.concat (imageList);
		
		// Shuffle the images
		var newImages = [];
		var len = imageList.length;
		
		for (var i = 0; i < len; i++) {
			let index = Math.floor(Math.random() * (imageList.length));
			
			newImages.push (imageList[index]);
			
			imageList.splice (index, 1);
		}
		
		return (newImages);
	}
	
	drawTiles (nTiles, images) {
		var board = document.getElementById ("board-wrap");
		
		for (var i = 0; i < nTiles; i++) {
			board.appendChild (this.makeTile (images[i]));
		}
	}
	
	makeTile (img) {
		var tile = document.createElement ("div");
		tile.classList.add ("cell-wrap");
		
		var cell = document.createElement ("div");
		cell.classList.add ("cell");
		
		var imgTag = document.createElement ("img");
		imgTag.src = img;
		
		cell.appendChild (imgTag);
		tile.appendChild (cell);
		
		tile.addEventListener ("click", function (e) {
			var self = e.target;
			
			console.log (self);
			if (self.classList.value.indexOf ("flipped") !== -1) {
				self.classList.remove ("flipped");
			} else {
				self.classList.add ("flipped");
			}
		});
		
		return (tile);
	}
}
