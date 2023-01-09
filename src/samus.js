
////////////////                  ////////////////////
              // // Samus Vars // //
////////////////                  ////////////////////
var JUMP = 4.5;
var jumpHeight = 5;
var runspeed = 2;
///// samus animation vars
var grounded = true;
var canJump = false;
var facingRight = true;
var crouched = false;
var falling = false;
var aimingUp = false;
//// samus sound vars
var played_landing_sound = false;

function spawn_samus() {
  samus = createSprite();
  samus.setCollider('rectangle', 0, 0, 40, 40);
  samus.limitSpeed(20);
  samus.addAnimation('start', loadAnimation(
    'assets/suit/checkin/power_suit_checkin_01.png'
  ));
  samus.addAnimation('checkin', loadAnimation(
    'assets/suit/checkin/power_suit_checkin_01.png',
    'assets/suit/checkin/power_suit_checkin_02.png',
    'assets/suit/checkin/power_suit_checkin_03.png',
    'assets/suit/checkin/power_suit_checkin_04.png',
    'assets/suit/checkin/power_suit_checkin_05.png',
    'assets/suit/checkin/power_suit_checkin_06.png',
    'assets/suit/checkin/power_suit_checkin_07.png',
    'assets/suit/checkin/power_suit_checkin_08.png',
    'assets/suit/checkin/power_suit_checkin_09.png',
    'assets/suit/checkin/power_suit_checkin_10.png',
    'assets/suit/checkin/power_suit_checkin_11.png'
  ));
  samus.addAnimation('turn', loadAnimation(
    'assets/suit/turn/Super Metroid - Samus Power Suit_03.png',
    'assets/suit/turn/Super Metroid - Samus Power Suit_04.png',
    'assets/suit/turn/Super Metroid - Samus Power Suit_05.png',
    'assets/suit/turn/Super Metroid - Samus Power Suit_06.png',
    'assets/suit/turn/Super Metroid - Samus Power Suit_07.png',
    'assets/suit/turn/Super Metroid - Samus Power Suit_08.png',
    'assets/suit/turn/Super Metroid - Samus Power Suit_09.png',
  ));
  samus.addAnimation('facingLeft', loadAnimation(
    'assets/suit/Super Metroid - Samus Power Suit_stand_facing_left.png'
  ));
  samus.addAnimation('facingRight', loadAnimation(
    'assets/suit/Super Metroid - Samus Power Suit_stand_facing_right.png'
  ));
  samus.position.x = width/2;
  samus.position.y = height/2-100;
  return samus;
}

class Samus {
  constructor(spritesheet){
    this.name = 'Samus';
    this.samus = createSprite();
    this.position.x = width/2;
    this.position.y = height/2-100;
    this.JUMP = 4.5;
    this.jumpHeight = 5;
    this.runspeed = 2;
    ///// samus animation vars
    this.grounded = true;
    this.canJump = false;
    this.facingRight = true;
    this.crouched = false;
    this.falling = false;
    this.aimingUp = false;
    //// samus sound vars
    this.played_landing_sound = false;
  }
}
