const mineflayer = require('mineflayer');

const botOptions = {
  host: 'easyplay.aternos.me',
  port: 62029,
  username: 'AFKBOT',
  version: '1.20.4',
  hideErrors: false,
  
  checkTimeoutInterval: 60000
};

let bot = null;

function connectBot() {
  console.log(`Connecting to ${botOptions.host}:${botOptions.port}...`);

  bot = mineflayer.createBot(botOptions);

  bot.on('login', () => {
    console.log(`Logged in successfully as: ${bot.username}`);
  });

  bot.on('spawn', () => {
    console.log(`Spawned successfully as: ${bot.username}`);
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
  });

  bot.on('end', (reason) => {
    console.log(`Connection ended: ${reason}`);
    setTimeout(connectBot, 5000);
  });

  bot.on('kicked', (reason, loggedIn) => {
    console.log(`Kicked from server: ${reason} | loggedIn: ${loggedIn}`);
  });

  bot.on('error', (err) => {
    console.error('Bot error:', err && err.message ? err.message : err);
  });
}

connectBot();


process.stdin.resume();
setInterval(() => {
  
}, 60000);
