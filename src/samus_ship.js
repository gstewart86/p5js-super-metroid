// Samus' Ship Vars
var ship;
var shipAngle = 0;

function spawn_ship() {
  ship = createSprite();
  ship.setCollider('rectangle', 0, 0, 150, 51);
  ship.addAnimation('float', loadAnimation(
    'assets/ship/Super Metroid - Samuss Starship_01.png',
    'assets/ship/Super Metroid - Samuss Starship_02.png',
    'assets/ship/Super Metroid - Samuss Starship_03.png',
    'assets/ship/Super Metroid - Samuss Starship_04.png',
    'assets/ship/Super Metroid - Samuss Starship_05.png',
    'assets/ship/Super Metroid - Samuss Starship_06.png',
    'assets/ship/Super Metroid - Samuss Starship_07.png',
    'assets/ship/Super Metroid - Samuss Starship_08.png',
    'assets/ship/Super Metroid - Samuss Starship_07.png',
    'assets/ship/Super Metroid - Samuss Starship_06.png',
    'assets/ship/Super Metroid - Samuss Starship_05.png',
    'assets/ship/Super Metroid - Samuss Starship_04.png',
    'assets/ship/Super Metroid - Samuss Starship_03.png',
    'assets/ship/Super Metroid - Samuss Starship_02.png',
    'assets/ship/Super Metroid - Samuss Starship_01.png'
  ));
  ship.position.x = width/2;
  ship.position.y = height/2;
  return ship;
}
