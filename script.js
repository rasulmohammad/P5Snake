let size = 30; //Each square will be 15x15 in height and width
let board = [];
let rows;
let cols;
let food;
let head;
let direction;
let gameOver = false;
let length = 1;
let sound;


function preload(){
    soundFormats('mp3');
    sound = loadSound("munch.mp3");
}


function setup(){

    let canvas = createCanvas(510, 510) // 15x15 grid 
    canvas.style.display = "block";
    canvas.style.margin = "auto";
    
    rows = width/size;
    cols = height/size;

    frameRate(10);

    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < cols; j++){
            board[i][j] = 0;
        }
    }

    background(0);

    // console.log(board[23][13]);


    food = createVector(int(random(0, rows-1)), int(random(0, cols-1)));
    head = createVector(int(random(0, rows-1)), int(random(0, cols-1)));
    direction = createVector(0,0);
}



function draw(){

    background(0);
    update();
    if(!gameOver){
        drawBoard();
        board[food.x][food.y] = -1;
        board[head.x][head.y] = length;
    }

}


function update(){

    head.add(direction); //basically adding head.x + direction.x and head.y + direction.y;
    // shifts one block entirely


    // Eating food
    if(head.x == food.x && head.y == food.y){
        sound.play();
        let validX = int(random(0, rows-1));
        let validY = int(random(0, cols-1));
        while(board[validX][validY] != 0){
            validX = int(random(0, rows-1));
            validY = int(random(0, cols-1));
        }
        food = createVector(validX, validY);
        length += 1;
    }

    // Collision
    if(head.x < 0 || head.x > rows-1 || head.y < 0 || head.y > cols-1 || (board[head.x][head.y] > 0 && length > 1)){
        gameOver = true;
        background(0);
        text(`GAME OVER\nYour score is: ${length}`, height/3, width/3);
        textSize(32);
        fill(255);
    } 
    else{
        board[head.x][head.y] = 1 + length; // basically gives highest value
        console.log(board[head.x][head.y])
        removeExcess();
    }

}

function removeExcess(){
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            if(board[i][j] > 0){
                board[i][j] -= 1;
            }
        }
    }
}



function drawBoard(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            if(board[i][j] == 0){
                rect(size*i, size*j, size, size);
                fill(0);
            }
            else if(board[i][j] < 0){
                rect(size*i, size*j, size, size);
                fill(255, 0, 0);
            }
            else{
                rect(size*i, size*j, size, size);
                fill(255, 255, 0);
            }
        }
    }
}



function keyPressed(){
    if(keyCode == LEFT_ARROW){
        direction = createVector(-1, 0);
    }
    else if(keyCode == RIGHT_ARROW){
        direction = createVector(1, 0);
    }
    else if(keyCode == UP_ARROW){
        direction = createVector(0, -1);
    }
    else if(keyCode == DOWN_ARROW){
        direction = createVector(0, 1);
    }
}


