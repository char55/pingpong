console.log('dsada')
const FRAMES_PER_SECOND = 30
const WINDOW_SIZE = {
  width: 1000,
  height: 500
}
const BALL_SIZE_RADIUS = 5
const PADDLE_SIZE = {
  width: 10,
  height: 50
}
let ball = {
  x: WINDOW_SIZE.width / 2,
  y: WINDOW_SIZE.height / 2
}
let IS_BALL_IN_PLAY = false
let BALL_SPEED = {
  x: 10,
  y: 0
}
const PLAYER_MOVEMENT = 20
const PLAYER_AI_MOVEMENT = 4
let player1 = {
  x: WINDOW_SIZE.width * (3 / 100),
  y: WINDOW_SIZE.height / 2 - PADDLE_SIZE.height / 2
}

let player2 = {
  x: WINDOW_SIZE.width - WINDOW_SIZE.width * (3 / 100),
  y: WINDOW_SIZE.height / 2 - PADDLE_SIZE.height / 2
}
const SCORE = {
  player1: 0,
  player2: 0
}

const ballMovement = () => {
  if (IS_BALL_IN_PLAY) {
    // wall perimeter
    if (ball.y <= 0 || ball.y >= WINDOW_SIZE.height) {
      BALL_SPEED.y *= -1
    }
    // for player 1
    if (ball.x === player1.x + PADDLE_SIZE.width) {
      if (ball.y >= player1.y && ball.y <= player1.y + PADDLE_SIZE.height) {
        BALL_SPEED.x *= -1

        const diff_player1 = ball.y - (player1.y + PADDLE_SIZE.height / 2)
        const speedMultiplier = diff_player1 > 0 ? 1 : diff_player1 < 0 ? -1 : 0
        BALL_SPEED.y = speedMultiplier * 4
      }
    }

    // player 2
    if (ball.x === player2.x) {
      if (ball.y >= player2.y && ball.y <= player2.y + PADDLE_SIZE.height) {
        BALL_SPEED.x *= -1

        const diff_player2 = ball.y - (player2.y + PADDLE_SIZE.height / 2)
        const speedMultiplier = diff_player2 > 0 ? 1 : diff_player2 < 0 ? -1 : 0
        BALL_SPEED.y = speedMultiplier * 4
      }
    }

    if (ball.x === WINDOW_SIZE.width || ball.x === 0) {
      console.log('POINT')
      ball.x = -10
      ball.y = -10
      IS_BALL_IN_PLAY = false
      if (ball.x === WINDOW_SIZE.width) {
        SCORE.player1 += 1
      }
      if (ball.x === 0) {
        SCORE.player2 += 1
      }
    }
    ball.x += BALL_SPEED.x
    ball.y += BALL_SPEED.y
  }
}
const player1Movement = goesUp => {
  if ((player1.y + PADDLE_SIZE.height >= WINDOW_SIZE.height && goesUp) || (player1.y <= 0 && !goesUp)) {
    // player stays put
  } else {
    player1.y += (goesUp ? 1 : -1) * PLAYER_MOVEMENT
  }
}
const player2Ai = () => {
  if (ball.y >= player2.y && ball.y <= player2.y + PADDLE_SIZE.height) {
    console.log('stay')
    // player stays put
  } else {
    // // go down
    if (BALL_SPEED.y > 0 && ball.y > player2.y) {
      player2.y += 1 * PLAYER_AI_MOVEMENT
    }

    // go up
    if (BALL_SPEED.y < 0 && ball.y < player2.y) {
      player2.y += -1 * PLAYER_AI_MOVEMENT
    }
  }
}

const resetBall = () => {
  IS_BALL_IN_PLAY = true
  ball.x = WINDOW_SIZE.width / 2
  ball.y = WINDOW_SIZE.height / 2
  // pause for a sec
}

const draw = ctx => {
  ctx.beginPath()
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, WINDOW_SIZE.width, WINDOW_SIZE.height)

  ctx.fillStyle = 'white'
  ctx.arc(ball.x, ball.y, BALL_SIZE_RADIUS, 0, 2 * Math.PI)
  ctx.fill()

  ctx.fillRect(player1.x, player1.y, PADDLE_SIZE.width, PADDLE_SIZE.height)
  ctx.fillRect(player2.x, player2.y, PADDLE_SIZE.width, PADDLE_SIZE.height)
}

const updateScore = (player1, player2) => {
  const scoreElement = document.getElementById('score')
  console.log('🚀 ~ file: index.js:129 ~ updateScore ~ scoreElement:', scoreElement)
}

window.onload = e => {
  updateScore(0, 0)
  addEventListener('keydown', event => {
    console.log('🚀 ~ file: index.js:129 ~ event:', event)

    if (event.code.toLowerCase().includes('space')) {
      resetBall()
    }
    if (event.key.toLowerCase().includes('up')) {
      player1Movement(false)
    }
    if (event.key.toLowerCase().includes('down')) {
      player1Movement(true)
    }
  })

  const canvas = document.getElementById('play-screen')
  const ctx = canvas.getContext('2d')
  console.log(e)

  setInterval(() => {
    draw(ctx)
    // do stuff
    ballMovement()
    player2Ai()
  }, 1000 / FRAMES_PER_SECOND)
}
