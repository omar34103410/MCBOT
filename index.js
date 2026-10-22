const mineflayer = require('mineflayer');

const botOptions = {
  host: 'easyplay.aternos.me',
  port: 62029,
  username: 'AFKBOT',
};

let bot;

function createBotInstance() {
  console.log('Connecting to Minecraft server...');
  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log(`Successfully logged in as: ${bot.username}`);
    bot.chat('Hello! I am running via GitHub.');
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;

    if (message === '!ping') {
      bot.chat('Pong!');
    }
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
