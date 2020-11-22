var sword, swordImage, gameoverImage;
var backgroundImage,monsterImage,fruit1,fruit2,fruit3,fruit4;
var PLAY = 1;
var END = 0;
var gameState = 1;
var score;
var fruitGroup, enemyGroup;
//fruits();
//enemies();

function preload(){
  swordImage = loadImage("sword.png");
  backgroundImage = loadImage("Background.jpg");
  gameoverImage = loadImage("gameover.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
 
}

function setup(){
  createCanvas(600,600);  
  score=0
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
 sword.scale = 0.7;
  
  sword.setCollider("rectangle",0,0,40,40);
  
  
  fruitGroup=createGroup();
  enemyGroup=createGroup();
}

function draw() {
 
 background(backgroundImage);
  
 if (gameState === PLAY) {
   fruits();
   enemy();
 sword.x = World.mouseX;
 sword.y = World.mouseY;
  
 if(fruitGroup.isTouching(sword)) {
   fruitGroup.destroyEach();
   score = score + 2;
 }
  else
    {
      if(enemyGroup.isTouching(sword))
        {
 gameState = END;
   //destroy(fruitGroup);
   //destroy(enemiesGroup);
          fruitGroup.destroyEach();
        enemyGroup.destroyEach();
   fruitGroup.setVelocityX = 0;
   enemyGroup.setVelocityX = 0;
   //sword.changeAnnimation("gameover.png");
   sword.addImage(gameoverImage);
 }
    }
 }

 drawSprites();
  text("Score : "+ score,300,30);
}

function fruits() {
  if(World.frameCount%80===0) {
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    r = Math.round(random(1,4));
    
    if(r == 1) {
      fruit.addImage(fruit1);
    }else if (r == 2){
      fruit.addImage(fruit2);
    }else if (r == 3){
      fruit.addImage(fruit3);
    }else if (r == 4){
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,340));
    
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
  }
}

function enemy() {
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
}
}