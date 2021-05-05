var play = 1;
var end = 0;
var gameState = play;
var trex,trex_running,trex_collided;
var ground,invisibleground,groundimage; 
var cloudgroup,cloudimage;
var obstaclegroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var count = 0;
var gameOver,restart,gameoverimg,restartimg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundimage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
}

function setup() {
    createCanvas(400, 400);
  
  trex = createSprite(50,380,20,50); 
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,380,400,20);
  ground.addImage(groundimage);
  ground.velocityX = -1;
  
  invisibleground = createSprite(200,390,400,10);
  invisibleground.visible = false;
  
  gameOver = createSprite(200,200);
  restart = createSprite(200,240);
  gameOver.addImage(gameoverimg);
  gameOver.scale = 0.5;
  restart.addImage(restartimg);
  restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
  
  cloudgroup = new Group();
  obstaclegroup = new Group();
} 

function draw() {
  background(180);
 
  text("score: "+count,300,50);
 if (gameState === play){
  count = count+Math.round(getFrameRate()/60);  
//jump when the space key is pressed
  if(keyDown("space")&& trex.y >=350){
    trex.velocityY = -12 ; 
  }
 if (ground.x < 0){
    ground.x = ground.width/2;
  }
  //add gravity
  trex.velocityY = trex.velocityY + 0.8; 
    spawnClouds();
    spawnObstacles();
if(obstaclegroup.isTouching(trex)){
gameState = end;
}
}
else if(gameState===end){
gameOver.visible = true;
restart.visible = true;
ground.velocityX = 0;
trex.velocityY = 0;
obstaclegroup.setVelocityXEach(0);
cloudgroup.setVelocityXEach(0);
trex.changeAnimation("collided", trex_collided)
obstaclegroup.setLifetimeEach(-1);
cloudgroup.setLifetimeEach(-1);
if(mousePressedOver(restart)){
reset();
}
}
  trex.collide(invisibleground);
  
 
    
  


  drawSprites();
}
function reset(){
gameState = play;
gameOver.visible = false;
restart.visible = false;
obstaclegroup.destroyEach();
cloudgroup.destroyEach();
trex.changeAnimation("running",trex_running);
count = 0;
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = Math.round(random(280,320));
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudgroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
   switch(rand){
     case 1:obstacle.addImage(obstacle1);
            break;
     case 2:obstacle.addImage(obstacle2);
            break; 
     case 3:obstacle.addImage(obstacle3);
            break; 
     case 4:obstacle.addImage(obstacle4);
            break; 
     case 5:obstacle.addImage(obstacle5);
            break;   
     case 6:obstacle.addImage(obstacle6);
            break; 
            default:break;
   }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    obstaclegroup.add(obstacle);
  }
}