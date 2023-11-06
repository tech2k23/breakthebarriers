// ########################## //
// *** Audio Context *** //
// ######################### //

const ctx = new AudioContext();
// Two buffers to carry two different static samples
const buffer1 = ctx.createBuffer(1, ctx.sampleRate * 1, ctx.sampleRate);

// Assigning the single data channel for each
const channelData1 = buffer1.getChannelData(0);

// Randomizing each buffer
for (let i = 0; i < buffer1.length; i++) {
	channelData1[i] = Math.random() * 2 - 1;
}

// Creating the primary gain control before audio reaches destination
const primaryGainControl = ctx.createGain();
primaryGainControl.gain.setValueAtTime(0.01, 0);
primaryGainControl.connect(ctx.destination);

let click = document.getElementById("click"); // 'click' sound HTML5 <audio> element
let knob = document.getElementById("knob"); // 'knob' rotation sound HTML5 <audio> element

// ########################## //
// *** Control Container *** //
// ######################### //

let $upperKnob = $("#upper_knob"); // Upper knob element
let $powerBtn = $(".power-button"); // Power button element

let upperKnobDeg = 0; // Sets the home degree to 0
let powerOn = false; // Flag to track the status of tv 'power'
let staticPlaying = false; // Flag to track status of static loop
let staticConnected = false;
let videoPlaying = false;

const static1 = ctx.createBufferSource();
static1.buffer = buffer1;
static1.loop = true;

// ########################## //
// *** Screen Container *** //
// ######################### //

let channelNum = 1;
let $channelText = $(".channel-number");
let $channel5_cursor = $(".channel5-cursor");
let channel7_video = document.getElementById("channel7_video");

let $contentLayer = $(".content-page" + channelNum);
let $previousLayer = null;
let $staticLayer = $(".static-layer");
let $contrastLayer = $(".contrast-layer");

let startTime = Date.now() / 1000;

// ########################## //
// *** Click Events *** //
// ######################### //

// Rotates knob, plays rotate sound, sets/changes channel number, and updates content.
$upperKnob.on("click", () => {
	play_knob_sound();
	rotate_knob();
	change_channel();
	update_display();

	if (upperKnobDeg == 360) {
		upperKnobDeg = 0;
	}
});
// Turns television on/off, plays required sounds.
$powerBtn.on("click", () => {
	// Button Click Sound
	play_click_sound();

	// Turn screen on
	if (!powerOn) {
		// Switch powerOn flag
		powerOn = true;
		// Change contrastLayer's background color to the lighter variant
		$contrastLayer.css("background-color", "var(--contrast-layer-light)");
		// Update the display to show current channel's content
		update_display();
		// 'Press' the button inwards animation
		press_button();
		// Display channel number
		$channelText.html("CH " + channelNum);
	}
	// Turn screen off
	else {
		// Switch powerOn flag
		powerOn = false;
		// Update the display to show current channel's content
		update_display();
		// 'Depress' the button outwards animation
		depress_button();
		// Clear channel text content
		$channelText.html("");
	}
});
// Determines which layers are to be displayed and which are to be hidden
function update_display() {
	if (powerOn) {
		screen_on();
		if (channelNum % 2 == 0) {
			static_noise_on();
		} else {
			static_noise_off();
		}
	} else {
		screen_off();
		static_noise_off();
		$contentLayer.css("visibility", "hidden");
		$staticLayer.css("visibility", "hidden");
	}
}
// TV Screen On
function screen_on() {
	if (channelNum % 2 == 0) {
		$previousLayer.css("visibility", "hidden");
		$staticLayer.css("visibility", "visible");
	} else {
		$staticLayer.css("visibility", "hidden");
		$contentLayer.css("visibility", "visible");
	}
	if (channelNum == 7) {
		play_video(channel7_video);
	} else {
		pause_video(channel7_video);
	}
}
// TV Screen Off
function screen_off() {
	// Hide currently displayed screen layer (content/static)

	if (channelNum % 2 == 0) {
		$staticLayer.css("visibility", "hidden");
	} else {
		$contentLayer.css("visibility", "hidden");
	}
	if (channelNum == 7) {
		pause_video(channel7_video);
	}

	// Adjust rear contrast layer to a darker tone
	$contrastLayer.css("background-color", "var(--contrast-layer-dark)");

	$channelText.html("");
}
// Static Noise On
function static_noise_on() {
	if (!staticPlaying) {
		static1.start();
		staticPlaying = true;
	}
	if (!staticConnected) {
		static1.connect(primaryGainControl);
		staticConnected = true;
	}
}
// Static Noise Off
function static_noise_off() {
	if (staticConnected) {
		static1.disconnect(primaryGainControl);
		staticConnected = false;
	}
}
// Play knob rotation sound
function play_knob_sound() {
	knob.currentTime = 0.5;
	knob.play();
	// Pause knob sound after 500ms to avoid white noise and reset currentTime to 0
	setTimeout(
		() => {
			knob.pause();
			knob.currentTime = 0;
		},
		500,
		knob
	);
}
// Rotate knob element
function rotate_knob() {
	// Increment degree of upper knob by 45
	upperKnobDeg += 45;
	// Add new utility class to element
	$upperKnob.addClass("rotate" + upperKnobDeg);
	// Remove old utility class
	$upperKnob.removeClass("rotate" + (upperKnobDeg - 45));
}
// Play button click sound
function play_click_sound() {
	// Set 'click' sound place to 500ms and play
	click.currentTime = 0.5;
	click.play();
	// After 1000ms pause sounds and set place to beginning
	setTimeout(
		() => {
			click.pause();
			click.currentTime = 0;
		},
		1000,
		click
	);
}
// Inset the button element
function press_button() {
	$powerBtn.css("box-shadow", "inset 0 0 .5px .5px");
	$powerBtn.css("text-shadow", "0px 0px 10px white");
	$powerBtn.css("background-color", "red");
}
// Unset the button element
function depress_button() {
	$powerBtn.css("box-shadow", "none");
	$powerBtn.css("text-shadow", "0px 0px 0px transparent");
	$powerBtn.css("background-color", "darkred");
	$powerBtn.children("p").css("font-size", "1rem");
}
// Update channel number and update channel text
function change_channel() {
	$previousLayer = $(".content-page" + channelNum);

	if (channelNum == 8) {
		channelNum = 0;
	}
	// Increment channel counter
	channelNum += 1;

	$contentLayer = $(".content-page" + channelNum);

	if(channelNum==7){
		$channelText.html("ADVERTISEMENT");
	}
	else if (powerOn) {
		$channelText.html("CH " + channelNum);
	} else {
		$channelText.html("");
	}
}
// Play video
function play_video(video) {
	if (!videoPlaying) {
		videoPlaying = true;
	}
	if (Date.now() / 1000 - startTime > video.duration) {
		startTime = Date.now() / 1000;
		video.currentTime = Date.now() / 1000 - startTime;
	} else {
		video.currentTime = Date.now() / 1000 - startTime;
	}
	video.play();
}
// Pause video
function pause_video(video) {
	video.pause();
}
