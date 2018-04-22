/**
 * Pre-game setup class for setting up game variables according to user preference
 * and loading in usable images.
 */
class Setup {
	/**
	 * Constructor for class Setup.
	 * 
	 * @param {array} imageList list of usable images
	 */
	constructor (imageList) {
		this.imageList = imageList;
		
		this.$setupWrap = document.getElementById ("setup-wrap");
		
		this.$inputImages = document.getElementsByClassName("images")[0];
		this.$inputTiles = document.getElementsByClassName("tiles")[0];
		this.$inputTime = document.getElementsByClassName("time")[0];
		
		this.$wrapImages = this.$inputImages.parentNode;
		this.$wrapTiles = this.$inputTiles.parentNode;
		this.$wrapTime = this.$inputTime.parentNode;
		
		this.$startBtn = document.getElementById("setup-start_btn");
		
		this.$inputImages.value = "8";
		this.$inputTiles.value = "16";
		this.$inputTime.value = "60";
		
		this.inputValidation = new RegExp("^[0-9]+$");
		
		this.$startBtn.addEventListener("click", this.startButtonClick.bind (this));
	}
	
	/**
	 * Game start button click event.
	 */
	startButtonClick () {
		var flagImages = this.inputValidation.test(this.$inputImages.value);
		var flagTiles = this.inputValidation.test(this.$inputTiles.value);
		var flagTime = this.inputValidation.test(this.$inputTime.value);
		
		this.$wrapImages.classList.remove ("error");
		this.$wrapTiles.classList.remove ("error");
		this.$wrapTime.classList.remove ("error");
		
		if ((flagImages && flagTiles && flagTime) === false) {
			if (flagImages === false) {
				this.$wrapImages.classList.add ("error");
			}
			
			if (flagTiles === false) {
				this.$wrapTiles.classList.add ("error");
			}
			
			if (flagTime === false) {
				this.$wrapTime.classList.add ("error");
			}
		} else {
			this.loadGame ();
		}
	}
	
	/**
	 * Hands off control to the MatchTwo game controller.
	 */
	loadGame () {
		this.$setupWrap.style.display = "none";
		
		new MatchTwo (
			parseInt (this.$inputImages.value),
			parseInt (this.$inputTime.value),
			this.imageList
		);
	}
}