// Super Metroid Ship Animation

// global debug variables
var showing_sheet = false;
var samusSpriteSheet;
var shipSpriteSheet;
var debug_ = true;

var loaded = false;

// global operational variables
var GRAVITY = 2;
var platforms;
var SCENE_H = 500;
var SCENE_W = 1000;

// sound variables
var play_music = false;
var sound_music;


function fully_loaded() {
  console.log('done loading');
  loaded = true;
}

function load_error(event) {
  console.log('resource failed to load: ' + event);
}

function while_loading(percentage) {
  console.log('while loading callback: ' + percentage);
}

///////////////////// PRELOAD
function preload() {
  // load sprite sheets (currently unused)
  samusSpriteSheet = loadImage('assets/suit2/SamusSpriteSheet.png');
  // shipSpriteSheet = loadImage('assets/ship/Super Metroid - Samuss Starship.png');

    // load sounds
  sound_music = loadSound('assets/Super Metroid Original Soundtrack/07- Crateria - Rainy Surface.mp3',
                    // fully_loaded(),
                    // load_error(),
                    // while_loading()
                    );
  sound_land = loadSound('assets/sounds/Mega Man X/MMX1_SE_jump.wav');
}

///////////////////// SETUP
function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');

  var ship = spawn_ship();

  var samus = spawn_samus();
  var samus2 = spawn_samus();


  // // fake ground (unused, collision detection for the ground seems like a bad idea)
  // ground = createSprite(0, 1000, 1000, 30);
  // ground.setCollider('rectangle');

  // anything that is a platform
  platforms = new Group();
  platforms.add(ship);

  // all things that should have physics applied
  sprites = new Group();
  sprites.add(samus);

  // play that track!
  if (play_music){
      sound_music.loop()
  }

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


////////////////////// DRAW
function draw() {

  // // // // // // // // //
  //    CAMERA SETTINGS   //
  // // // // // // // // //
  //set the camera position to samus position
  // TODO: attraction point isn't a method for camera, so make a fake sprite
  //       that follows samus with the attraction point, and bind camera to it instead
  // camSprite.attractionPoint(50, samus.position.x, samus.position.y);
  // camera.position.x = camSprite.position.x;
  // camera.position.y = camSprite.position.y;
  // That didnt work because turns out attraction point doesn't result in an equilibrium
  // ever, so your camera is just wildly swinging around forever. I'll come back to this.


  camera.position.x = samus.position.x;
  camera.position.y = samus.position.y;
  // create relative 'top of screen' due to camera
  var relativeX = samus.position.x-width/2;
  var relativeY = samus.position.y-height/2+20;

  camera.zoom = 1;


  // // // // // // // // //
  //    GLOBAL PHYSICS    //
  // // // // // // // // //
  allSprites.forEach(
    function(element) {
  // for (element in sprites) {
      // apply the gravity force
      //TODO: if grounded, dont apply gravity? might prevent the bouncing effect we're seeing
      element.addSpeed(GRAVITY, 90);

      // remove any friction that might have been applied by collision
      // element.friction = 0;
      // didn't work because of the way we're applying friction now

      // keep sprites from going oob
      if(element.position.x < 0){
        element.position.x = 0;
        element.velocity.x = 0;
      }

      if(element.position.y < 0){
        element.position.y = 0;
        element.velocity.y = 0;
      }

      if(element.position.x > SCENE_W){
        element.position.x = SCENE_W;
        element.velocity.x = 0;
      }

      if(element.position.y > SCENE_H){
        element.position.y = SCENE_H;
        element.velocity.y = 0;
      }

    }
  );


  // // // // // // // // //
  //    ENVIRONMENT       //
  // // // // // // // // //
  background(100);
  // Create temp floor
  // var position = 200;

  // TODO: Create cloud-like feature in the background
  //      Maybe do a rectangle across the screen
  //      Then draw lines at the edges of the rectangle that change procedurally and flow

  // TODO: Create rain out of small clusters of dots moving horizontally






    // // // // // // // // //
    //   DEBUGGING SETTINGS //
    // // // // // // // // //
    if (debug_){
        push()
        fill(0);
        text('samus speed (x, y): ' +
                  samus.velocity.x.toFixed(3) +
                  '. ' +
                  samus.velocity.y.toFixed(3), relativeX, relativeY)
        text('samus falling: ' + falling, relativeX, relativeY+10)
        text('samus facing right: ' + facingRight, relativeX, relativeY+20)
        text('samus grounded : ' + grounded, relativeX, relativeY+40)
        text('samus friction : ' + samus.friction, relativeX, relativeY+50)
        text('samus position (x,y): ' +
                  samus.position.x.toFixed(1) +
                  ',' +
                  samus.position.y.toFixed(1), relativeX, relativeY+60)
        text('height: ' + height, relativeX, relativeY+70)
        text('width : ' + width, relativeX, relativeY+80)
        text('framerate: ' + frameRate().toFixed(3), relativeX, relativeY+100)

        text('ship sine wave: ' + ship.velocity.y.toFixed(3), relativeX, relativeY+30)
        pop()
        // text('samus position: ' + ship.position.x.toFixed(3), relativeX, relativeY+20)
        allSprites.forEach(function(element){
          element.debug = true;
        })

    } else {
        allSprites.forEach(function(element){
          element.debug = false;
        })
    }

    if (keyWentDown("m")){
      if (play_music == true){
        play_music = false;
        sound_music.stop();
        if (debug_){console.log('stopping music...')};
      } else if (play_music == false) {
        play_music = true;
        sound_music.loop();
        if (debug_){console.log('starting music...')};
      }
    }

    if (keyWentDown("b")){
        if(!debug_){
        debug_ = true;
        console.log('enabling debug');
      } else {
        debug_ = false;
        console.log('disabling debug')
      }
    }

   // // // // // // // // //
   //    SAMUS MOVEMENT    //
   // // // // // // // // //


   ///// State Tracking
   // Direction we're facing. important to keep track so we can land correctly, etc.
   if (samus.velocity.x > 0) {
     facingRight = true;
   } else if (samus.velocity.x < 0) {
     facingRight = false;
   }

   if (samus.velocity.y > 0) {
     falling = true;
     played_landing_sound = false;
   } else if (samus.velocity.y <= 0) {
     falling = false;
     // she touched a platform, make it so she can jump again
     canJump = true;
      if (played_landing_sound == false) {
          // sound_land.play();
          played_landing_sound = true;
        }


   }

   // grounded is kind of a derived variable.
   if (falling) { grounded = false }
   if (samus.velocity.y == 0) { grounded = true }
   if (grounded) { samus.friction = .25 }



   // if we land on top of a platform
  if (samus.collide(platforms)) {
    if (debug_){console.log('samus collision')};
    // and back to running animation
    // samus.changeAnimation("standing_left");
    // if hes on building, dont let gravity push her down
    samus.velocity.y = 0;
    grounded = true;
  }

  // if (samus.velocity.y == 0) {
  //   canJump = true;
  //   samus.friction = .25;
  //
  // }

      // // // // // // // // //
      //    SAMUS ANIMATIONS  //
      // // // // // // // // //
      //
      // UNUSED BECAUSE TYING ANIMATION TO KEYPRESS IS BETTER AND MORE DIRECT
      // if (facingRight &&
      //    samus.velocity.x > .01 &&
      //    grounded == true) {
      //   samus.changeAnimation('facingRight');
      // }
      //
      // if (!facingRight &&
      //    samus.velocity.x == 0 &&
      //    grounded == true) {
      //   samus.changeAnimation('facingLeft');
      // }



        // // // // // // // // //
        //    SAMUS CONTROLS    //
        // // // // // // // // //

      // if mouse is pressed, shoot!
      if (mouseIsPressed) {
        // TODO: spawn bullet sprite at the point of the gun, depending on aim
      }

      // if player presses x, jump!
      if (keyDown("f")) {
        // and they are currently grounded
        if(canJump) {
          if (debug_){console.log('canJump = ' + canJump + ', jumping!')};
          // samus.changeAnimation("jumping");
          samus.velocity.y = -JUMP;
        } else {
          if (debug_){console.log('canJump = ' + canJump + ', not jumping!')};
        }
      }

      if (keyWentUp("f")) {
        canJump = false;
        // TODO: also set canJump to false when max jump height is reached
      }


      if (keyDown("w") &&
          samus.velocity.y == 0) {
        aimingUp = true;
        // samus.changeAnimation("standingAimingUp")

      }

      // if player presses d, move right!
      if (keyDown("d")) {
        if (debug_){console.log('moving right')};
        // samus.changeAnimation("run_right");
        //TODO: define the turn logic that makes her velocity wait til she turns around
        samus.velocity.x += runspeed;
        samus.changeAnimation('facingRight')
      }

      // if player presses a move left!
      if (keyDown("a")) {
        if (debug_){console.log('moving left')};
        // samus.changeAnimation("run_right");
        //TODO: define the turn logic that makes her velocity wait til she turns around
        samus.velocity.x += -runspeed;
        samus.changeAnimation('facingLeft')
      }


  // // // // // // // // //
  //    SHIP MOVEMENT     //
  // // // // // // // // //
  // ship.depth = 5;
  ship.velocity.y = map(sin(shipAngle), -1, 1, -.3, .3);
  shipAngle += .1

  // TODO: Make the ship pilotable
  // ship.attractionPoint(.2, mouseX, mouseY);
  // ship.maxSpeed = 5;
  //




  drawSprites();


}
