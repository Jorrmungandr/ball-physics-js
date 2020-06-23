// ============ Global Variables ============ //

const ballPos = {
  top: 15,
  left: 15,
};

let ballSize = 20;
const ballArray = [];

const friction = 0.011;
const acceleration = 0.05;

// ============ Generate Food ============ //

const generateFood = () => {
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
};

// ============ Ball Movement ============ //

const movementVector = [0, 0];

const keys = [];

// Add key pressed to keys
window.addEventListener('keydown', (event) => {
  const { key } = event;

  if (!keys.includes(key)) keys.push(key);
});

// Remove key pressed from keys
window.addEventListener('keyup', (event) => {
  const { key } = event;

  if (keys.includes(key)) keys.splice(keys.indexOf(key), 1);
});

setInterval(() => {
  const up = keys.includes('w');
  const left = keys.includes('a');
  const down = keys.includes('s');
  const right = keys.includes('d');

  const forceVector = [+up, +left, +down, +right];

  movementVector[0] += forceVector[3] * acceleration;
  movementVector[1] += forceVector[0] * acceleration;
  movementVector[0] -= forceVector[1] * acceleration;
  movementVector[1] -= forceVector[2] * acceleration;
}, 10);

// ============ Apply Movement Vector ============ //

setInterval(() => {
  const ballStyle = document.querySelector('.ball').style;

  const { top, left } = ballPos;

  ballPos.top = +(top - movementVector[1]).toFixed(2);
  ballPos.left = +(left + movementVector[0]).toFixed(2);

  // console.log(ballPos);

  ballArray.forEach((bolinha) => {
    if (bolinha.active) {
      const radius = ballSize / 2;

      if ((bolinha.left - ballPos.left) ** 2 + (bolinha.top - ballPos.top) ** 2 <= radius ** 2) {
        bolinha.active = false;
        document.querySelector(`#${bolinha.id}`).style.display = 'none';
        ballSize += 1;

        ballStyle.width = `${ballSize}px`;
        ballStyle.height = `${ballSize}px`;
      }
    }
  });

  ballStyle.top = `${ballPos.top}px`;
  ballStyle.left = `${ballPos.left}px`;
}, 10);

// ============ Apply Friction ============ //

setInterval(() => {
  movementVector[0] = movementVector[0] * (1 - friction);
  movementVector[1] = movementVector[1] * (1 - friction);
}, 10);

// ============ Wall Collision ============ //

setInterval(() => {
  const radius = ballSize / 2;

  if (ballPos.top <= radius + 5) {
    // top
    movementVector[1] = movementVector[1] * -1;
  }
  if (ballPos.left <= radius + 5) {
    // left
    movementVector[0] = movementVector[0] * -1;
  }
  if (window.innerHeight - ballPos.top <= radius + 5) {
    // bottom
    movementVector[1] = movementVector[1] * -1;
  }
  if (window.innerWidth - ballPos.left <= radius + 5) {
    // right
    movementVector[0] = movementVector[0] * -1;
  }
}, 10)
