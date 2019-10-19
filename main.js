const ballPos = {
  top: 15,
  left: 15,
};

let speed = 2;
let ballSize = 20;
let ballOffSet = 5;
const ballArray = [];

for (let i = 0; i < 10; i++) {
  const randomHeight = Math.floor(Math.random() * window.innerHeight - (ballSize + 10));
  const randomWidth = Math.floor(Math.random() * window.innerWidth - (ballSize + 10));
  const food = document.createElement('div');
  food.id = `food-${Math.floor(Math.random() * 10 ** 10)}`;
  food.className = 'food';
  food.style.top = randomHeight + 'px';
  food.style.left = randomWidth + 'px';
  ballArray.push({
    id: food.id,
    top: randomHeight,
    left: randomWidth,
    active: true,
  });
  document.body.appendChild(food);
};
console.log(ballArray);

const moveBall = (direction) => {
  if (speed < 5) speed *= 1.02;

  let {
    top,
    left
  } = ballPos

  console.log(direction);

  if (direction === 'w' && ballPos.top > ballOffSet)
    ballPos.top -= speed;
  if (direction === 'a' && ballPos.left > ballOffSet)
    ballPos.left -= speed;
  if (direction === 's' && ballPos.top < window.innerHeight - (ballSize - ballOffSet))
    ballPos.top += speed;
  if (direction === 'd' && ballPos.left < window.innerWidth - (ballSize - ballOffSet))
    ballPos.left += speed;
  const ballStyle = document.querySelector('.ball').style;

  ballArray.forEach((bolinha) => {
    if (bolinha.active) {
      if (top < bolinha.top + (ballSize - ballOffSet) && top > bolinha.top - (ballSize - ballOffSet)) {
        if (left < bolinha.left + (ballSize - ballOffSet) && left > bolinha.left - (ballSize - ballOffSet)) {
          bolinha.active = false;
          document.querySelector(`#${bolinha.id}`).style.display = 'none';
          ballSize += 10;
          ballOffSet += 5;
          const ball = document.querySelector('.ball');
          ball.style.width = ballSize + 'px';
          ball.style.height = ballSize + 'px';
          console.log('ballSize', ballSize);
        }
      }
    }
  });

  ballStyle.top = `${top}px`;
  ballStyle.left = `${left}px`;
};

window.addEventListener('keypress', (event) => {
  const {
    key
  } = event;
  if (['w', 'a', 's', 'd'].indexOf(key) !== -1)
    moveBall(key);
  else
    console.log('Invalid Movement');
});


window.addEventListener('keyup', (event) => {
  speed = 2;
});