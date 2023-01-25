var Ghost;
var ground;
var obstacle
var PLAY = 1
var END = 0
var Gamestate = PLAY
var Score
var Name = "hello"




function preload()
{
    Ghostimg = loadImage("Ghost.jpg")
    groundImage = loadImage("Ground.png");
    obstacleimg = loadImage("Obstacle.png")
    restartimg = loadImage("Restart.png")

}

function setup()
{
    createCanvas(600, 200);
    //console.log("hello"+ Math.round(random(1,10)));

    

    //create a trex sprite
    Ghost = createSprite(50,160,20,50);
    Ghost.scale = 0.5;
    Ghost.debug = false
    Ghost.setCollider("circle", 0, 0, 40);

    //create a ground sprite
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;


    //create obstacle and cloud groups.
    score = 0

    gameover = createSprite(300, 100);
    gameover.addImage(gameoverimg);
    restart = createSprite(300, 140);
    restart.addImage(restartimg);
    gameover.scale = 0.5;
    restart.scale = 0.5;
    gameover.visible = false;
    restart.visible = false;

}

function spawnObstacle()
{
    if (frameCount%60 == 0){

        var obstacle = createSprite(600, 165, 10, 40);
        obstacle.scale = 0.5;
        obstacle.velocityX = -(6 + score / 1000)
        var rand = Math.round(random(1,6));
        switch(rand){
            case 1: obstacle.addImage(obstacle)
            break;
            deafault:break;

        }
        //console.log(rand)
        obstacle.lifetime = 205;
        //obstacle.debug = true
    }
}

function draw()
{
    background(180);

    console.log(name);
    
    text("Score: " + score,500, 50);
    

    if(gamestate == PLAY)
    {

        score = score+Math.round(getFrameRate()/60)
        ground.velocityX = -4

        //jump when the space button is pressed
        if (keyDown("space") && trex.y > 150)
        {
            trex.velocityY = -10;
            jumpsound.play();
        }
        
        trex.velocityY = trex.velocityY + 0.8
        
        
        if (ground.x < 0)
        {
            ground.x = ground.width / 2;
        }

        spawnObstacle();

        if(obstacle.isTouching(trex))
        {
            //trex.velocityY = -10
            gamestate = END
            diesound.play();
        }

        if(score % 100 == 0 && score > 0)
        {
            chekpointsound.play();
        }
        
    }
    else if(gamestate == END)
    {
        ground.velocityX = 0;
        obstacle.velocityX(0);
        trex.velocityY = 0;
        obstacle.lifetime(-1);
        trex.changeAnimation("collided", trex_collided);
        gameover.visible = true
        restart.visible = true

        if(mousePressedOver(restart)) 
        {  
            reset()
        }
    }
    
    trex.collide(Invisibleground);
    drawSprites();

    

}
function reset()
{
    obstacle.destroyEach();
    cloudsGroup.destroyEach();
    trex.changeAnimation("running", trex_running);
    gameover.visible = false
    restart.visible = false
    score = 0
    gamestate = PLAY
}
//lifetime decreases as framecount increases
//as soon as lifetime becomes 0 obstacles desapear
//what lifetime could we set in gamestate end so that in every frame the lifetime keeps moving farther away from 0
//obstaclesGroup.setLifetimeEach(-1)
//cloud