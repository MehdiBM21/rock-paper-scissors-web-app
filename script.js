let score = JSON.parse(localStorage.getItem('score'));
if(score === null){
    score = {
        wins: 0,
        losses: 0,
        draws: 0
    }
}

function randomChoice(){
    const random = Math.random();
    let result = '';
    if(random < 0.33){
        result = 'rock';
    }
    else if(random < 0.66){
        result = 'paper';
    }
    else{
        result = 'scissors';
    }
    return result;
}

function compare (player){
    const results = [];//add computer choice + win or lose
    const computer = randomChoice();
    results.push(computer);
    if(player === computer){
        score.draws++;
        results.push('draw');
    }
    else if(player === 'rock'){
        if(computer === 'paper'){
            score.losses++;
            results.push('lose');
        }
        else{
            score.wins++;
            results.push('win');
        }
    }
    else if(player === 'paper'){
        if(computer === 'scissors'){
            score.losses++;
            results.push('lose');
        }
        else{
            score.wins++;
            results.push('win');
        }
    }
    else if(player === 'scissors'){
        if(computer === 'rock'){
            score.losses++;
            results.push('lose');
        }
        else{
            score.wins++;
            results.push('win');
        }
    }
    localStorage.setItem('score', JSON.stringify(score));
    return results;
}

function updateResult (){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Draws: ${score.draws}`;
}

function result(player){
    const results = compare(player);
    document.querySelector('.js-result').innerHTML ="You chose <image src='" + player + ".png' class='result-image'>, " + "Computer chose <image src='" + results[0] + ".png' class='result-image'>" + "<p class='result-text'> You " + results[1] + " !</p>";
    updateResult();
}

function reset(){
    score.wins = 0;
    score.losses = 0;
    score.draws = 0;
    localStorage.removeItem('score');
    updateResult();
}

let autoPlaying = false;
let intervalId;
function autoPlay(){
    if (!autoPlaying){
    intervalId= setInterval(function(){
        result(randomChoice());
    }, 1000);
    autoPlaying = true;
}else{
    clearInterval(intervalId);
    autoPlaying = false;
}
}

/*--------------------------------------------------------eventListener--------------------------------------------------------*/
document.querySelector('.js-rock').addEventListener('click', function(){
    result('rock');
})

document.querySelector('.js-paper').addEventListener('click', function(){
    result('paper');
})

document.querySelector('.js-scissors').addEventListener('click', function(){
    result('scissors');
})

document.body.addEventListener('keydown', function(event){
    if(event.key.toLowerCase() === 'r'){
        result('rock');
    }
    else if(event.key.toLowerCase() === 'p'){
        result('paper');
    }
    else if(event.key.toLowerCase() === 's'){
        result('scissors');
    }
});