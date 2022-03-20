// Games constants and variables.
let inputDir = {x: 0, y: 0};
const foodsound = new Audio('food_music.mp3');
const gameoversound = new Audio('gameover_music.mp3');
const movesound = new Audio('move_music.mp3');
const musicsound = new Audio('background_music.mp3');
let score = 0;
let speed = 5;
let lastPaintTime = 0;
// First element of this snakearray i.e.snakeArr[0] will always represent head of snake and snakeArr[0].x and snakeArr[0].y represent x,y coordinates (acco to 18 * 18 grid taking left-top corner as origin) of snake head at every time.
let snakeArr = [{x: 13, y: 15}];          //Snake is an array of objects(location at a time x,y) because it will grow after eating food.
food = { x:6, y:7};                      //food is just an object not an array.

// Game Functions.
function main(ctime){                              /* main function take "current-time" i.e. 'ctime' as an argument. */
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed)      /* divided by 1000 becoz to convert milloseconds into seconds */
    {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(sarr)
{
    // If snake collide with its own body part.
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y)
        {
            return true;
        }
    }
    //If snake bump into the wall.(snakeArr[0] represent head of snake.)
    if(snakeArr[0].x >=18 || snakeArr[0].x <= 1  ||  snakeArr[0].y >=18 || snakeArr[0].y <= 1)  /*becoz board is divided into 18 * 18 grids. */
    {
        return true;
    }
    return false;
}
function gameEngine()
{
    //Part1 of this function : Updating the snake Array.
    if(isCollide(snakeArr))
    {
        musicsound.pause();
        gameoversound.play();
        inputDir = {x:0 , y:0};
        alert('!! G A M E  O V E R !! \nPresss any Key to Play Again');
        scorebox.innerHTML = "Score : 0";
        score=0;
        snakeArr = [{x:13, y:15}];
        musicsound.play();
    }
    //If snake had eaten the food, increment the score and regenerate the food.
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
    {
        foodsound.play();
        score++;
        scorebox.innerHTML = "Score : " + score;
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x , y : snakeArr[0].y + inputDir.y});
        let a=2,b=16;
        food = {x : Math.round(a + (b-a)*Math.random()), y : Math.round(a + (b-a)*Math.random())}
    }
    //Moving the snake.
    for (let i = snakeArr.length-2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //Part2 of this function : Display the snake and food.
    //Display the Snake.
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index == 0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //Display the Food.
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}




// Main Logic is here.

window.requestAnimationFrame(main);                   /*main is a function which is passed to it. */

window.addEventListener('keydown', e => {
    inputDir = {x:0, y:1}  //START THE GAME.
    movesound.play();
    musicsound.play();
    switch (e.key)
    {
        case "ArrowUp":
            console.log("Up");
            inputDir.x = 0;
            inputDir.y = -1;
             break;
        case "ArrowDown":
            console.log("Down");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("Left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("Right");
            inputDir.x = 1;
            inputDir.y = 0;
                break;
        default:
                break;
    }

})
