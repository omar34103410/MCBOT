const mineflayer = require('mineflayer');

const botOptions = {
  host: 'easyplay.aternos.me',
  port: 62029,
  username: 'AFKBOT',
  version: '1.20.4',
  hideErrors: false
};

let bot = null;
let reconnectDelay = 5000;
let jumpInterval = null;

function connectBot() {
  console.log(`Connecting to ${botOptions.host}:${botOptions.port}...`);

  bot = mineflayer.createBot(botOptions);

  bot.on('login', () => {
    console.log(`Logged in successfully as: ${bot.username}`);
  });

  bot.on('spawn', () => {
    console.log(`Spawned successfully as: ${bot.username}`);
    startAutoJump();
  });

  bot.on('end', (reason) => {
    console.log(`Connection lost: ${reason}`);
    stopAutoJump();

    console.log(`Reconnecting in ${reconnectDelay / 1000} seconds...`);
    setTimeout(connectBot, reconnectDelay);

    reconnectDelay = Math.min(reconnectDelay * 2, 30000);
  });

  bot.on('kicked', (reason, loggedIn) => {
    console.log(`Kicked from server: ${reason} | loggedIn: ${loggedIn}`);
  });

  bot.on('error', (err) => {
    console.error('Bot error:', err.message || err);
  });
}

function startAutoJump() {
  stopAutoJump();

  jumpInterval = setInterval(() => {
    if (!bot || !bot.entity) return;

    bot.setControlState('jump', true);

    setTimeout(() => {
      if (bot) {
        bot.setControlState('jump', false);
      }
    }, 500);

    const yaw = Math.random() * Math.PI * 2;
    const pitch = (Math.random() - 0.5) * Math.PI;

    bot.look(yaw, pitch, false);
  }, 10000);
}

function stopAutoJump() {
  if (jumpInterval) {
    clearInterval(jumpInterval);
    jumpInterval = null;
  }
}

connectBot();
