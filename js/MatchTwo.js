/**
 * Game controller for the match 2 game.
 */
class MatchTwo {
	/**
	 * Constructor for class MatchTwo.
	 * 
	 * @param {int}   nTiles    number of game tiles
	 * @param {int}   time      allowed time in seconds
	 * @param {array} imageList list of usable images
	 */
	constructor (nTiles, time, imageList) {
		this.numTiles = nTiles;
		this.time = time;
		this.$gameBoard = document.getElementById ("board-wrap");
		this.flippedTiles = [];
		
		this.images = this.setImages (this.numTiles, imageList);
		
		this.drawTiles (this.numTiles, this.images);
	}
	
	/**
	 * Sets up image source list to have just enough images for the game. Also
	 * shuffles the images.
	 * 
	 * @param {int}   nTiles    number of game tiles
	 * @param {array} imageList list of usable images
	 */
	setImages (nTiles, imageList) {
		if ((nTiles / 2) > imageList.length) {
			// Duplication images until we have enough
			var delta = (nTiles / 2) - imageList.length;
			
			for (var i = 0; i < delta; i++) {
				imageList.push (imageList[i]);
			}
		}
		
		// We have exactly the amount we need; now duplicate the list.
		imageList = imageList.concat (imageList);
		
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
	
	/**
	 * Draws the game board.
	 * 
	 * @param {int}   nTiles    number of game tiles
	 * @param {array} images    list of shuffled images that pair with each tile
	 */
	drawTiles (nTiles, images) {
		for (var i = 0; i < nTiles; i++) {
			this.$gameBoard.appendChild (this.makeTile (images[i]));
		}
	}
	
	/**
	 * Makes tile elements for each tile of the game board.
	 * 
	 * @param  {string} img image source attribute
	 * 
	 * @return {element} tile HTML element with bound click event
	 */
	makeTile (img) {
		var tile = document.createElement ("div");
		tile.classList.add ("cell-wrap");
		
		var cell = document.createElement ("div");
		cell.classList.add ("cell");
		
		var imgTag = document.createElement ("img");
		imgTag.src = img;
		
		cell.appendChild (imgTag);
		tile.appendChild (cell);
		
		tile.addEventListener ("click", function (game) {
			if (this.classList.value.indexOf ("flipped") !== -1) {
				this.classList.remove ("flipped");
				game.flippedTiles = [];
				return;
			} else {
				this.classList.add ("flipped");
			}
			
			if (game.flippedTiles.length > 0) {
				// Check for match
				game.flippedTiles[0].classList.remove ("flipped")
				this.classList.remove ("flipped");
				
				let src0 = game.flippedTiles[0].children[0].children[0].src;
				let src1 = this.children[0].children[0].src;
				
				if (src0 === src1) {
					// Got it
					game.flippedTiles[0].classList.add ("matched");
					this.classList.add ("matched");
				}
				
				game.flippedTiles = [];
			} else {
				game.flippedTiles.push (this);
			}
		}.bind (tile, this));
		
		return (tile);
	}
}
