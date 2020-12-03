var Monkey, Monkey_running;
var banana, bananaImage,bananaGroup;
var stone, stoneImage,obstaclesGroup;
var backImage, jungle;
var ground;
var PLAY = 0;
var END = 1;
var gamestate = PLAY;
var score = 0;
function preload() {

  backImage = loadImage("jungle[1].jpg");
  
  Monkey_running = loadAnimation("Monkey_01[1].png","Monkey_02[1].png","Monkey_03[1].png","Monkey_04[1].png","Monkey_05[1].png","Monkey_06[1].png","Monkey_07[1].png","Monkey_08[1].png","Monkey_09[1].png","Monkey_10[1].png");


bananaImage = loadImage("banana[1].png");

stoneImage = loadImage("stone[1].png");
}

function setup() {
  createCanvas(400, 400);
jungle = createSprite(200,200,400,400);
jungle.addImage("jungle[1].jpg",backImage);
jungle.velocityX = -2
jungle.x = jungle.width/2

ground = createSprite(200,380,800,20);
ground.visible = false
ground.velocityX = -4;
ground.x = ground.width/2;



  Monkey = createSprite(100,340,20,50);
Monkey.addAnimation("running",Monkey_running);
Monkey.scale = 0.1
  bananaGroup = new Group();
  obstaclesGroup = new Group();

}

function draw() {
  background(220);




 
  
 

 obstaclesGroup.setColliderEach("circle",0,0,60);
  Monkey.setCollider("circle",0,0,100);
 
if (gamestate === PLAY) {
  spawnObstacles();
   spawnBananas();
   
if(Monkey.isTouching(bananaGroup)){
  score = score +2;
  bananaGroup.destroyEach();
  monkeyScale();
}
  
if (keyDown("space")) {
    Monkey.velocityY = -12;
  }
  
  Monkey.velocityY = Monkey.velocityY + 0.4;  
 Monkey.collide(ground); 

  if (ground.x<0) {
  ground.x=200;
}

  if (jungle.x<0) {
  jungle.x=200;
}
 
 if (obstaclesGroup.isTouching(Monkey)) {
      Monkey.scale = 0.1;
    }
}


if (gamestate === END) {
     Monkey.velocityY=0;
     Monkey.velocityX=0;
     obstaclesGroup.setVelocityXEach(0);
     ground.velocityX = 0;
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
  jungle.velocityX = 0
  
}
         

  drawSprites();


}
function speech(){
stroke("white")
  textSize(20);
  fill("white");
 text("Score: "+ score,500,50);
}
function spawnBananas() {
  if (World.frameCount % 80 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.y = Math.round(random(0, 300));
    banana.addImage("banana[1]",bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 130;
    bananaGroup.add(banana);
}
}

function spawnObstacles() {
  if(World.frameCount % 300 === 0) {
    var stone = createSprite(400,350,10,40);
    stone.velocityX = - 6;
    
    //generate random obstacles
    stone.addImage("stone[1].png",stoneImage);
    
    //assign scale and lifetime to the obstacle           
    stone.scale = 0.15;
    stone.lifetime = 70;
    //add each obstacle to the group
    obstaclesGroup.add(stone);
}
}
function monkeyScale(){
  switch(score){
    case 10:
      Monkey.scale = 0.12
      break;
    case 20:
      Monkey.scale = 0.14
      break;
    case 30:
      Monkey.scale = 0.16
      break;
    case 40:
      Monkey.scale = 0.18
      break;
  }
}
