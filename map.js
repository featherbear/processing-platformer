let gameMap;

{
   let _ = ""
    GROUND = "GROUND";


  DANGER_LAVA = "LAVA";
  DANGER_SPIKE = "SPIKE";

  gameMap = [
    [DANGER_SPIKE, _, DANGER_SPIKE, _, DANGER_SPIKE, _, DANGER_SPIKE, _, DANGER_SPIKE, _, DANGER_SPIKE, _, DANGER_SPIKE, _, DANGER_SPIKE, _, DANGER_SPIKE, DANGER_SPIKE],
    [DANGER_SPIKE, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, DANGER_SPIKE],
    [DANGER_SPIKE, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, DANGER_SPIKE],
    [DANGER_SPIKE, _, _, _, DANGER_SPIKE, _, _, _, _, _, _, _, _, _, _, _, _, DANGER_SPIKE],
    [DANGER_SPIKE, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, DANGER_SPIKE],
    [DANGER_SPIKE, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, DANGER_SPIKE],
    [DANGER_SPIKE, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, DANGER_SPIKE],
    [DANGER_SPIKE, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, DANGER_SPIKE],
    [GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND]
  ];
}
