function getAttackDamage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let currentMonster = monster;
let currentPlayer = player;
const monHealth = document.querySelector('#monster-health');
const plrHealth = document.querySelector('#player-health');
const resutlLine = document.querySelector('#results');

let monDeath = 0;

function playerBattle(){
currentMonster.hitPoints -=  getAttackDamage(player.attackMin, player.attackMax); 
monHealth.innerText = currentMonster.hitPoints;
if (currentMonster.hitPoints > 0){
    player.hitPoints -= getAttackDamage(currentMonster.attackMin, currentMonster.attackMax);
    plrHealth.innerText = player.hitPoints;
} else if (currentMonster.hitPoints <= 0 && monDeath < 1){
    monDeath++
    resutlLine.innerText = 'You slayed the monster, but here comes the boss...'
    currentMonster = boss;
    monHealth.innerText = boss.hitPoints;
    player.hitPoints -= getAttackDamage(boss.attackMin, boss.attackMax);
    plrHealth.innerText = player.hitPoints;
} else if (currentMonster.hitPoints <= 0 && monDeath !== 0){
    resutlLine.innerText = 'You slayed the boss! You win!'
}
}

document.querySelector('#fight').addEventListener('click', playerBattle)