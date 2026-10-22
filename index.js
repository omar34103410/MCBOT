const mineflayer = require('mineflayer');

const botOptions = {
  host: 'easyplay.aternos.me',
  port: 62029,
  username: 'AFKBOT',
  version: '1.20.4',
  hideErrors: true
};

let bot;

function createBotInstance() {
  console.log('Connecting to Minecraft server...');
  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log(`Successfully logged in as: ${bot.username}`);
    startAutoJump();
  });

  bot.on('end', (reason) => {
    console.log(`Connection lost (${reason}). Reconnecting in 120s...`);
    setTimeout(createBotInstance, 120000);
  });

  bot.on('error', (err) => {
    console.error('Bot error:', err.message);
  });
}

function startAutoJump() {
  setInterval(() => {
    if (!bot || !bot.entity) return;
    
    bot.setControlState('jump', true);
    setTimeout(() => {
      bot.setControlState('jump', false);
    }, 500);

    const yaw = Math.random() * Math.PI * 2;
    const pitch = (Math.random() - 0.5) * Math.PI;
    bot.look(yaw, pitch, false);
  }, 10000);
}

createBotInstance();
