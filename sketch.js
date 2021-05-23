var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;

function preload(){
sadDog=loadImage("images/Dog.png");
happyDog=loadImage("images/Happy.png");
garden=loadImage("images/Garden.png");
washroom=loadImage("images/WashRoom.png");
bedroom=loadImage("images/BedRoom.png");
livingroom=loadImage("images/Living Room.png");
milkImg=loadImage("images/milk.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,500);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);
   
  dog=createSprite(550,250,10,10);
  dog.addImage(sadDog);
  dog.scale=0.15;

  milkBottle1 = createSprite(140,435,10,10);
  milkBottle1.addImage(milkImg);
  milkBottle1.scale = 0.1;

  milkBottle2 = createSprite(210,280,10,10);
  milkBottle2.addImage(milkImg);
  milkBottle2.scale = 0.1;
  
}

function draw() {
  background("yellow")

  foodObj.display();
  writeStock(foodS);

  if(foodS == 0){
    dog.addImage(happyDog);
    milkBottle2.visible=false;
  }else{
    dog.addImage(sadDog);
    milkBottle2.visible=true;
  }
  
   if(gameState===1){
     dog.addImage(happyDog);
     dog.scale=0.175;
     dog.y=250;
   }
   if(gameState===2){
     dog.addImage(sadDog);
     dog.scale=0.175;
     milkBottle2.visible=false;
     dog.y=250
   }
   var Bath=createButton("I want to take bath");
   Bath.position(580,125);
   if(Bath.mousePressed(function(){
     gameState=3;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===3){
     dog.addImage(washroom);
     dog.scale=1;
     milkBottle2.visible=false;
   }
   var Sleep=createButton("I am very sleepy");
   Sleep.position(710,125);
   if(Sleep.mousePressed(function(){
     gameState=4;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===4){
     dog.addImage(bedroom);
     dog.scale=1;
     milkBottle2.visible=false;
   }
   var Play=createButton("lets Play!");
   Play.position(500,160);
   if(Play.mousePressed(function(){
     gameState=5;
     database.ref('/').update({'gameState':gameState});
   }))
   if(gameState===5){
     dog.addImage(livingroom);
     dog.scale=1;
     milkBottle2.visible=false;
   }
   var PlayInGarden=createButton("Lets play in park");
   PlayInGarden.position(585,160);
   if(PlayInGarden.mousePressed(function(){
     gameState=6;
     database.ref('/').update({'gameState':gameState})
   }))
   if(gameState===6){
     dog.y175;
     dog.addImage(garden);
     dog.scale=1;
     milkBottle2.visible=false;
   }

 
  drawSprites();
  textSize(17);
  fill("black");
  text("Milk Bottles Remaining  "+foodS,170,440);
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
   database.ref('/').update({
     food:x
   })
}


