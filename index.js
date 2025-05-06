const RPC = require('discord-rpc');
const psList = require('ps-list');
const fetch = require('node-fetch');
const fs = require('fs');

// Load config
let config;
try {
  config = JSON.parse(fs.readFileSync('config.json'));
} catch (error) {
  console.error('Error loading config.json:', error);
  process.exit(1);
}

const clientId = config.clientId;
const updateInterval = config.updateInterval || 15000; // default 15 seconds

const rpc = new RPC.Client({ transport: 'ipc' });

async function findRobloxPlaceId() {
  const processes = await psList();
  const robloxProc = processes.find(p => p.name.toLowerCase().includes('robloxplayerbeta'));

  if (robloxProc && robloxProc.cmd) {
    const match = robloxProc.cmd.match(/placeId=(\d+)/);
    if (match) {
      return match[1]; // Found the placeId
    }
  }

  return null;
}

async function getGameName(placeId) {
  try {
    const url = `https://games.roblox.com/v1/games?universeIds=${placeId}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data && data.data && data.data[0]) {
      return data.data[0].name;
    }
  } catch (err) {
    console.error('Error fetching game name:', err);
  }

  return 'Unknown Game';
}

async function setActivity(gameName) {
  rpc.setActivity({
    details: `Playing ${gameName}`,
    state: 'On Roblox',
    largeImageKey: 'roblox_logo', // make sure you uploaded this asset in your Discord app
    largeImageText: 'Roblox',
    instance: false,
  });
}

rpc.on('ready', async () => {
  console.log('✅ Connected to Discord!');

  setInterval(async () => {
    const placeId = await findRobloxPlaceId();

    if (placeId) {
      const gameName = await getGameName(placeId);
      console.log(`🎮 Detected: ${gameName}`);
      setActivity(gameName);
    } else {
      console.log('⚠️ No active Roblox game detected.');
    }
  }, updateInterval);
});

rpc.login({ clientId }).catch(console.error);
