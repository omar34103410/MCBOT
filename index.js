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
    bot.chat('AFKBOT مرحبا انا.');
  });

  bot.on('end', (reason) => {
    console.log(`Connection lost (${reason}). Reconnecting in 10s...`);
    setTimeout(createBotInstance, 10000);
  });

  bot.on('error', (err) => {
    console.error('Bot error:', err.message);
  });
}

createBotInstance();
