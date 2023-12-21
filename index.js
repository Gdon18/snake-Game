const gamebord = document.getElementById("gameBoard")
const context = gamebord.getContext('2d')
// 2d is the game edit application
const scoreText = document.getElementById('scoreVal')

const WIDTH = gamebord.width;
const HEIGHT = gamebord.height;
const UNIT = 20;

let foodX;
let foodY;
let xVel =20;
let yVel =0;
let score =0;
let active=true;
let started = false;


let snake = [
     {x:UNIT*3,y:0}, 
     {x:UNIT*2,y:0},
     {x:UNIT,y:0},
     {x:0,y:0}
];

window.addEventListener('keydown',keypress);
startGame();

function startGame(){
    context.fillStyle = '#212121';
    // fillrect(x startGame,ystart,width,hight)
    context.fillRect(0,0,WIDTH,HEIGHT)
    createFood();
    displayFood();
    // drawSnake();
    // moveSnake();
    // clearSnake();
    drawSnake();
    
}
function clearSnake(){
    context.fillStyle = '#212121';
    // fillrect(x startGame,ystart,width,hight)
    context.fillRect(0,0,WIDTH,HEIGHT)
}




 function createFood(){
        foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
        foodY = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
 }

 function displayFood(){
        context.fillStyle = 'red';
        context.fillRect(foodX,foodY,UNIT,UNIT);
 }

 function drawSnake(){
    context.fillStyle = 'aqua';
    context.strokeStyle = '#212121'
    snake.forEach((snkaePart) => {
        context.fillRect(snkaePart.x,snkaePart.y,UNIT,UNIT)
        context.strokeRect(snkaePart.x,snkaePart.y,UNIT,UNIT)
    })
 }

 function moveSnake(){
     const head = {x:snake[0].x+xVel,y:snake[0].y+yVel}
     snake.unshift(head)
     if(snake[0].x==foodX && snake[0].y==foodY){
        score+=1;
        scoreText.textContent = score;
        createFood();
     }else{
     snake.pop()
     }
 }
  
function nextTick(){
    if(active){
    setTimeout(() => {
        clearSnake();
        displayFood();
        moveSnake();
        drawSnake();
        nextTick();
        checkGameover();
    },200);
  }else{
    clearSnake();
    context.font = "bold  50px serif"
    context.fillStyle = "white"
    context.textAlign = "center"
    context.fillText("Game Over!!",WIDTH/2,HEIGHT/2)
  }
}

function keypress(event){
    if(!started){
        started = true;
        nextTick();
    }
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN =40

    switch(true){
        // left key presssed and not going RIGHT
         case(event.keyCode==LEFT && xVel!=UNIT):
              xVel=-UNIT;
              yVel=0;
              break;
         // right key presssed and not going left      
         case(event.keyCode==RIGHT && xVel!=-UNIT):
              xVel=UNIT;
              yVel=0;
              break;
         // up key presssed and not going down      
         case(event.keyCode==UP  && yVel!=UNIT):
             xVel=0;
             yVel=-UNIT;
             break;
        // down key presssed and not going up      
         case(event.keyCode==DOWN && yVel!=-UNIT):
             xVel=0;
             yVel=UNIT;
             break;
    }
}

function checkGameover(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):
           active=false;
           break;
    }
}