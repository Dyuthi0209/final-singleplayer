var bg,bgImg,bgImg1,bgImg3;
var turtle, turtleImg,turtle1, turtleImg1,turtleImg2,turtleImg3;
var score=0,goal = 2500;
var plastic, plasticGroup;
var bag1,bottle1,fertilizer,oil,rings,straw1,bag2,bottle2,straw2;
var SERVE = 0;
var PLAY=1;
var END=2;
var WIN = 3;
var gameState=0;

var gameOver, gameOverImg;
var invisiblePlat, invisiblePlat2;
var restart, restartImg;
var up, upImg;
var down, dowmImg;
var map, mapImg,mapImg1,mapImg2,mapImg3,mapImg4,mapImg5,start,startImg;
var scoreboard,scoreboardImg;
var distance1, distanceImg,goal1,goalImg;

var sound1,sound2, sound3, sound4, soundon,soundoff;
var soundonImg,soundoffImg,soundstatus="on";
localStorage["HighestScore"] = 0;

function preload(){
bgImg=loadAnimation("images/bg.jpg")
turtleImg=loadAnimation("images/moving_turle.gif")
bgImg1=loadImage("images/bg2.jpg")
turtleImg1=loadAnimation("images/turtle.png")
bgImg2=loadImage("images/winbg.jpg")
turtleImg2=loadAnimation("images/turtlewin.png")
turtleImg3=loadAnimation("images/sad_turtle.png")
bgImg3=loadImage("images/overbg.png")

bag1=loadImage("images/bag.png")
bottle1=loadImage("images/bottle.png")
fertilizer=loadImage("images/fertilizer.png")
oil=loadImage("images/oil.png")
rings=loadImage("images/rings.png")
straw1=loadImage("images/straw.png")
bag2=loadImage("images/obs1.png")
bottle2=loadImage("images/obs2.png")
straw2=loadImage("images/obs3.png")

gameOverImg=loadImage("images/gameOver.jpg")
restartImg=loadImage("images/replay.png")

upImg=loadImage("images/uparrow.png")
downImg=loadImage("images/downarrow.png")

mapImg=loadAnimation("images/Go.png");
mapImg1=loadAnimation("images/Go1.png")
mapImg2=loadAnimation("images/Go2.png")
mapImg3=loadAnimation("images/Go3.png")
mapImg4=loadAnimation("images/Go4.png")
mapImg5=loadAnimation("images/Go5.png")

startImg=loadImage("images/start.png")

scoreboardImg=loadImage("images/score_board.png") 
distanceImg=loadImage("images/distance.png")
goalImg=loadImage("images/goal.png")


sound1 = loadSound("begin.wav");
sound2 = loadSound("sea.wav");
sound3 = loadSound("gameover.wav")
sound4 = loadSound("win.wav")
soundonImg = loadImage("images/soundon.png");
soundoffImg = loadImage("images/soundoff.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
bg=createSprite(width/2,0,width,height);
bg.addAnimation("play",bgImg);
//bg.addAnimation("win",bgImg2);

bg.scale=4;
bg.visible=false;  
bg.x = bg.width /2;

turtle=createSprite(200,height/2,50,50);
turtle.addAnimation("turtle", turtleImg);
turtle.addAnimation("sad", turtleImg3);
turtle.scale=0.6;
turtle.setCollider("rectangle",0,0,250,150);
turtle.visible = false;

turtle1=createSprite(450,470,50,50);
turtle1.addAnimation("play",turtleImg1);
turtle1.addAnimation("win",turtleImg2);
turtle1.scale=0.3;

gameOver=createSprite(800,250,50,50);
gameOver.addImage("gameOver", bgImg3);
gameOver.scale=1;
gameOver.visible=false;

restart=createSprite(800,500,50,50);
restart.addImage("reset", restartImg);
restart.scale=0.6;
restart.visible=false;

invisiblePlat = createSprite(0,40,400,10);
invisiblePlat.visible = false;

//invisiblePlat2 = createSprite(0,410,400,10);
//invisiblePlat2.visible = false;

up=createSprite(width-60,height-200,3,3);
up.addImage("up", upImg);
up.scale=0.25;
up.visible = false;

down=createSprite(width-60,height-90,3,3);
down.addImage("down", downImg);
down.scale=0.25;
down.visible = false;


map=createSprite(width-120,155,3,3);
map.addAnimation("start",mapImg);
map.addAnimation("one",mapImg1);
map.addAnimation("two",mapImg2);
map.addAnimation("three",mapImg3);
map.addAnimation("four",mapImg4);
map.addAnimation("five",mapImg5);

map.scale=0.15;
map.visible = false;

start=createSprite(width-200,height-130,3,3);
start.addImage(startImg);
start.scale=1;

scoreboard=createSprite(160,100,3,3);
scoreboard.addImage(scoreboardImg);
scoreboard.scale=0.12;
scoreboard.visible = false;

distance1=createSprite(160,70,3,3);
distance1.addImage(distanceImg);
distance1.scale=0.27;
distance1.visible = false;

goal1=createSprite(160,130,3,3);
goal1.addImage(goalImg);
goal1.scale=0.28;
goal1.visible = false;

soundon = createSprite(80,height-185,300,200);
soundon.addImage(soundonImg);
soundon.scale=0.1; 

soundoff = createSprite(181,height-75,300,200);
soundoff.addImage(soundoffImg);
soundoff.scale=0.1; 
soundoff.visible =false;

plasticGroup= new Group;

score=0;
}

function draw() {

 
  if(mousePressedOver(soundon))
  {
    soundstatus = "off";
    soundoff.visible = true;
    soundon.visible = false;
    sound1.stop();
    sound2.stop();
    sound4.stop();
    sound3.stop();
  }
 
  if(mousePressedOver(soundoff))
  {
    soundstatus = "on";
    soundoff.visible = false;
    soundon.visible = true;
  
  }
 if(gameState === SERVE)
 {

  background(bgImg1); 
  if(soundstatus==="on")
  {
    sound1.play();

  } 
  if(mousePressedOver(start)){
    gameState = PLAY;
  }
 }
 
  turtle.collide(invisiblePlat);
  //turtle.collide(invisiblePlat2);

  if (gameState===PLAY){
    bg.visible = true;
    start.visible = false;
    turtle1.visible = false;
    turtle.visible = true;
    up.visible = true;
    down.visible = true;
    map.visible = true;
    scoreboard.visible = true;
    goal1.visible = true;
    distance1.visible = true;
    if(soundstatus==="on")
    {
      sound2.play();
sound1.stop();
    }   

    
    bg.velocityX = -3;

    score = score + Math.round(getFrameRate()/60);
    goal = goal - Math.round(getFrameRate()/60);

    if(bg.x<0)
    {
      bg.x = width/2;
    }

    if(keyIsDown(DOWN_ARROW)){
      turtle.y=turtle.y+7;
      }
      
      if(keyIsDown(UP_ARROW)){
        turtle.y=turtle.y-7;
        }

        if(mousePressedOver(up)){
          turtle.y=turtle.y-7;
        }

        if(mousePressedOver(down)){
          turtle.y=turtle.y+7;
        }
      
          if (frameCount % 50 === 0) {
          plastic = createSprite(910, random(100, height-100), 100, 100);
          plastic.velocityX = -(6 + 3*score/100);
          var rand = Math.round(random(1,9));
          switch(rand){
              case 1: plastic.addImage("plastic",oil);
              break;
              case 2: plastic.addImage("plastic", fertilizer);
              break;
              case 3: plastic.addImage("plastic", rings);
              break;
              case 4: plastic.addImage("plastic", bag1);
              break;
              case 5: plastic.addImage("plastic",bottle1);
              break;
              case 6: plastic.addImage("plastic", straw1);
              break;
              case 7: plastic.addImage("plastic", bag2);
              break;
              case 8: plastic.addImage("plastic",bottle2);
              break;
              case 9: plastic.addImage("plastic", straw2);
              break;
          }
          plastic.scale=0.3;
          plasticGroup.add(plastic);
          turtle.depth = plastic.depth+1;
          scoreboard.depth =turtle.depth +1;;
    goal1.depth=scoreboard.depth+1;
    distance1.depth =scoreboard.depth+1;

     if(plasticGroup.isTouching(turtle)){
      turtle.scale=turtle.scale-0.1}
      
console.log(turtle.scale)
              }
      
if(turtle.scale<0.10000000000000003 ){
  gameState=END;
}
if(score ==500)
{
  map.changeAnimation("one",mapImg1);

}
else if(score ==1000)
{
  map.changeAnimation("two",mapImg2);

}
else if(score ==1500)
{
  map.changeAnimation("three",mapImg3);

}
else if(score ==2000)
{
  map.changeAnimation("four",mapImg4);

}
else if(score ==2400)
{
  
  map.changeAnimation("five",mapImg5);

}
else if(score>=2500)
{
  gameState = WIN;
  plasticGroup.destroyEach();
  
}

  }

  if(gameState===WIN)
  {
    background(bgImg2); 
    if(soundstatus==="on")
    {
      sound4.play();
      sound1.stop();
      sound2.stop();
    }
  background(bgImg2); 
  bg.visible = false; 
  turtle1.visible = true;
  turtle.visible = false;
  up.visible = false;
  down.visible = false;
  map.visible = false;
  scoreboard.visible = false;
  goal1.visible = false;
  distance1.visible = false;
  turtle1.changeAnimation("win",turtleImg2);

} 



if(gameState===END){
  background("black")
  if(soundstatus==="on")
  {
    sound3.play();
    sound4.stop();
    sound1.stop();
    sound2.stop();
  }

    gameOver.visible=true;
    restart.visible = true;
    turtle.x = 400;
    turtle.y = 350;
    turtle.scale = 0.8;
    map.visible = false;
    scoreboard.visible = false;
    goal1.visible = false;
    distance1.visible = false;
    turtle.velocityY = 0;
    bg.velocityX = 0;
    plasticGroup.setVelocityXEach(0)
    plasticGroup.setLifetimeEach(-1);
    plasticGroup.removeSprites();
    turtle.changeAnimation("sad", turtleImg3);

    up.visible=false;
    down.visible=false;
    
    if(mousePressedOver(restart)) {
      reset();
    }

    
    textSize(30)
    fill("white")
    text("Click on the home icon on the top left of the page to go back to the home page.", 200,400)

  }
  
  drawSprites();

  if(gameState === PLAY)
  {
    fill("yellow");
    textSize(25)
    textStyle(BOLDITALIC);
    textFont('Helvetica');
    text("Distance: "+ score + " m", 65,80);
    fill("purple");
    textSize(15)
    text("Your destination is : ",70,120)
    textSize(25)
    text( goal + "m far away",70,140)
    fill("lime");
    text("**use either the up and down arrows or the green buttons to move the turtle.", 210,height-20);
  }
 
 
}

function reset(){
  // background(bg);
 
   gameState = PLAY;
   gameOver.visible = false;
   restart.visible = false;
   bg.visible = true;
 
   plasticGroup.destroyEach();
   //plasticGroup.removeSprites();
   turtle.visible=true;
 
   up.visible = true;
   down.visible = true;
   map.visible = true;
   scoreboard.visible = true;
   goal1.visible = true;
   distance1.visible = true;
   turtle.changeAnimation("turtle", turtleImg);
 
   if(localStorage["HighestScore"]<score){
     localStorage["HighestScore"] = score;
   }
   console.log(localStorage["HighestScore"]);
   
   score = 0;
   goal = 2500;
   turtle.scale = 0.6;
   turtle.x = 200;
   turtle.y = height/2;
   
 
 }
 



// story: saving turtle from plastics and other pollution in the sea(infinite runner)
// parts: multiplayer game, single player game, and facts about turtles.