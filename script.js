//Código javascript usado para criar o clássio jogo da cobrinha.
// Código desenvolvido por: Paulo Otavio B. Abreu

var canvas = document.getElementById("snake"); //Cria e configura o elemento canvas
var context = canvas.getContext("2d"); //configura o elemento canvas em um plano cartesiano
let box = 8;//32;
let snake = []; 
snake[0] = {
    x: 2 * box,
    y: 2 * box
}
let direction = "right"; //define a direção inicial do jogo.

let food = { //define um valor randômico/aleatório onde a comidinha vai surgir primeiro.
    x: Math.floor(Math.random() * 63 + 1) * box,
    y: Math.floor(Math.random() * 63 + 1) * box
}

function criarBG(){   //Define a cor e o tamnho dos boxes do plano do jogo.
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 64 * box, 64 * box);
}

function criarCobrinha(){ //cria a cobrinha;
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function comidinha(){ //define a cor e o tamanho da comidinha.
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

// a função update cria a sequencia de movimentos da cobrinha.
function update(event){   
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function endgame(){ //Finaliza o jogo e gera uma mensagem de alerta.
    clearInterval(jogo);
    alert("FIM DE JOGO :(  -------  Aperte F5 para recomeçar");
}

function iniciarjogo(){
    // Define o que acontece quando a cobrinha atingir a parede.
    if(snake[0].x > 63 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 64 * box;
    if(snake[0].y > 63 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 64 * box;
    /*
        Código abaixo pode ser usado caso queira que o jogo termine quando a cobrinha "bater"
        em uma das parede.

    if(snake[0].x > 15 * box && direction == "right") endgame();;
    if(snake[0].x < 0 && direction == "left") endgame();
    if(snake[0].y > 15 * box && direction == "down") endgame();
    if(snake[0].y < 0 && direction == "up") endgame();
    */
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            endgame();
        }
    }

    criarBG();
    criarCobrinha();
    comidinha();

    let snakex =  snake[0].x;
    let snakey = snake[0].y;
    //define como qua a cobrinha vai andar;
    if(direction == "right") snakex += box;
    if(direction == "left") snakex -= box;
    if(direction == "up") snakey -= box;
    if(direction == "down") snakey += box;

    if(snakex != food.x || snakey != food.y){
        snake.pop();
    }

    else{ //define um valor randômico/aleatório onde a comidinha vai surgir.
        food.x = Math.floor(Math.random() * 63 + 1) * box;
        food.y = Math.floor(Math.random() * 63 + 1) * box;
    }

    let newhead = {
        x: snakex,
        y: snakey
    }

    snake.unshift(newhead);
}

let jogo = setInterval(iniciarjogo, 80);  //define a taxa de atualização do jogo em milissegundos.