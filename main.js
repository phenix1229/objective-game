function getAttackDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let currentMonster = monster;
const currentPlayer = player;
const monHealth = document.querySelector('#monster-health');
const plrHealth = document.querySelector('#player-health');
const resultLine = document.querySelector('#results');
const pDamageMessage = document.querySelector('#player-damage-taken');
const mDamageMessage = document.querySelector('#monster-damage-taken');
const fightButton = document.querySelector('#fight');
let monDeath = 0;

function playerBattle(){
  if (fightButton.innerText === 'Start Over'){
    currentMonster = monster;
    currentMonster.hitPoints = 30;
    monHealth.innerText = currentMonster.hitPoints;
    monHealth.style.width = '60px';
    currentPlayer.hitPoints = 100;
    plrHealth.innerText = currentPlayer.hitPoints;
    plrHealth.style.width = '200px';
    fightButton.innerText = 'Fight'
  } else {
    let monDamage = getAttackDamage(player.attackMin, player.attackMax)
    currentMonster.hitPoints -=  monDamage; 
    monHealth.innerText = currentMonster.hitPoints;
    monHealth.style.width = `${currentMonster.hitPoints * 2}px`;
    mDamageMessage.innerText = `You clobbered the monster with ${monDamage}`
    if (currentMonster.hitPoints > 0){
      let plrDamage = getAttackDamage(currentMonster.attackMin, currentMonster.attackMax);
      player.hitPoints -= plrDamage
      plrHealth.innerText = player.hitPoints;
      plrHealth.style.width = `${currentPlayer.hitPoints * 2}px`;
      pDamageMessage.innerText = `The monster clobbered you with ${plrDamage}`
      if (player.hitPoints <= 0){
        resultLine.innerText = 'You died! Game over...';
        fightButton.innerText = 'Start Over'
      }
    } else if (currentMonster.hitPoints <= 0 && monDeath < 1){
      monDeath++
      resultLine.innerText = 'You slayed the monster, but here comes the boss...'
      currentMonster = boss;
      monHealth.innerText = boss.hitPoints;
      monHealth.style.width = `${currentMonster.hitPoints * 2}px`;
      player.hitPoints -= getAttackDamage(boss.attackMin, boss.attackMax);
      plrHealth.innerText = player.hitPoints;
      plrHealth.style.width = `${currentPlayer.hitPoints * 2}px`;
      if (player.hitPoints <= 0){
        resultLine.innerText = 'You died! Game over...';
        fightButton.innerText = 'Start Over'
      }
    } else if (currentMonster.hitPoints <= 0 && monDeath !== 0){
      resultLine.innerText = 'You slayed the boss! You win!';
      fightButton.innerText = 'Start Over';
    }
  } 
}

fightButton.addEventListener('click', playerBattle)