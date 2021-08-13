var lion, lionImage;
var bullet, bulletImage;
var hunter, hunterImage;
var huntig, huntingImage
var backgroundImage;
var rock, rockImage;
var cactus, cactusImage;
var coin, coinImage;

var animalgp;
var rockgp;
var cactusgp;
var bulletgp;
var coingp;

var gameOver, gameOverImage;
var reset, resetImage;

var bg;
var ground;

var score = 0;
var life = 5;

var gameState = "play";


function preload() 
{
  lionImage = loadAnimation("0.gif","1.gif","2.gif","3.gif","4.gif","5.gif","6.gif","7.gif","8.gif","9.gif","10.gif","11.gif","12.gif","13.gif","14.gif","15.gif")
  
  hunterImage = loadAnimation("unnamed.gif")
  huntingImage = loadAnimation("hunter.gif")
  backgroundImage = loadImage("BACKGROUND .jpg")

  rockImage = loadImage("rock.png")

  cactusImage = loadImage("cactus.png")

  bulletImage = loadImage("bullet.png")

  coinImage = loadImage("coin.png")

  gameOverImage = loadImage("gameover.png")
  
  resetImage = loadImage("reset.png")
}

function setup()
{
  createCanvas(700,600)
  bg = createSprite(350,300)
  bg.addImage(backgroundImage)
  bg.scale = 1.5
  bg.velocityX = -1
  
  ground = createSprite(350,450,700,20)
  ground.visible = false
  
  hunter = createSprite(100,350,20,20)
  hunter.addAnimation("hunter",hunterImage)
  hunter.scale = 1
  hunter.setCollider("rectangle",0,0,50,160)
  
  gameOver = createSprite(350,300,20,20)  
  gameOver.addImage(gameOverImage)
  gameOver.scale = 1

  reset = createSprite(355,360,20,20)
  reset.addImage(resetImage)
  reset.scale = 0.2

  gameOver.visible = false
  reset.visible = false

  coingp = new Group()
  cactusgp = new Group()
  animalgp = new Group()
  bulletgp = new Group()
  rockgp = new Group
  
  fill("black") 
 
}

function draw()
{

  background("black")
if(gameState === "play")
{
  if(bg.x -220<0)
    {
      bg.x = bg.width/2
    }
  if (keyDown ("m"))
  {
   hunter.velocityY = -10
  }
  hunter.velocityY = hunter.velocityY + 0.5
  hunter.collide (ground)

  if(cactusgp.isTouching(hunter))
  {
    cactusgp.destroyEach()
    life = life-1
  }

  if(animalgp.isTouching(hunter))
  {
    animalgp.destroyEach()
    life = life-1
  }

  if(rockgp.isTouching(hunter))
  {
    rockgp.destroyEach()
    life = life-1
  }

  if(coingp.isTouching(hunter))
  {
    coingp.destroyEach()
    score = score+10
  }
    
  if(life === 0)
  {
    gameState = "end"
  }  

  if(bulletgp.isTouching(animalgp))
  {
    animalgp.destroyEach()
    bulletgp.destroyEach()
    score = score + 5
  }

  Spawnanimals()
  Spawnrock()
  Spawncactus()
  Spawncoins()
}

if(gameState === "end")
{
 gameOver.visible = true
 reset.visible = true
 bg.velocityX = 0
 animalgp.setVelocityXEach(0)
 cactusgp.setVelocityXEach(0)
 hunter.velocityY = 0
 rockgp.setVelocityXEach(0)
 coingp.setVelocityXEach(0)
 bulletgp.setVelocityXEach(0)

 animalgp.setLifetimeEach(-1)
 cactusgp.setLifetimeEach(-1)
 rockgp.setLifetimeEach(-1)
 coingp.setLifetimeEach(-1)
 bulletgp.setLifetimeEach(-1)

 if(mousePressedOver(reset))
 {
  gameState = "play"
  score = 0
  life = 5
  gameOver.visible = false
  reset.visible = false
  bg.velocityX = -1
 }
}

  drawSprites()
  
  fill("red")
  textSize(15)
  text("LIFE :- "+life,20,40)

  text("SCORE :- "+score,600,40)   
  
}

function Spawnanimals()
{
  if(World.frameCount%500===0)
  {
  lion = createSprite(750,400,20,20)
    lion.addAnimation("lion",lionImage)
    lion.scale= 0.5
  lion.velocityX = -5
  lion.lifetime = 150
  animalgp.add(lion)
  }
}

function Spawnrock ()
{
  if (World.frameCount%213===0)
  {
    rock = createSprite(750,400,20,20)
    rock.addImage(rockImage)
    rock.scale = 0.5
    rock.velocityX = -5  
    rock.lifetime = 150
    rockgp.add(rock)
  }
}

function Spawncactus ()
{
 if (World.frameCount%353===0)
 {
   cactus = createSprite(750,400,20,20)
   cactus.addImage(cactusImage)
   cactus.scale = 0.5
   cactus.velocityX = -5
   cactus.lifetime = 150
   cactusgp.add(cactus)
 }
}

function Spawnbullets ()
{
 bullet = createSprite(130,377,20,20)
 bullet.addImage(bulletImage)
 bullet.scale = 0.1
 bullet.velocityX = 5 
 bullet.lifetime = 150 
 bulletgp.add(bullet) 
}

function Spawncoins ()
{
  if (World.frameCount%500===0)
  {
    coin = createSprite(700,random(100,300),20,20)
    coin.addImage(coinImage)
    coin.scale = 0.3
    coin.velocityX = -5
    coin.lifetime = 150    
    coingp.add(coin)
  }
}

function keyPressed ()
{
  if(keyCode === 32)
  {
    Spawnbullets()
  }
}
