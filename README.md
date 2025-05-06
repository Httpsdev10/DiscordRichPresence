# Roblox Rich Presence

Show your current Roblox game on Discord automatically.

## Features
- Detects the Roblox game you're playing
- Shows game name and Roblox logo in Discord
- Updates every few seconds
- Easy configuration with `config.json`

## Setup

1. Install Node.js (https://nodejs.org/)
2. Clone this repo:
    ```bash
    git clone https://github.com/Httpsdev10/DiscordRichPresence
    cd DiscordRichPresence
    ```
3. Install dependencies:
    ```bash
    npm install discord-rpc ps-list node-fetch
    ```
4. Create a Discord Application:
    - Go to https://discord.com/developers/applications
    - Create an App
    - Enable Rich Presence
    - Add an image called `roblox_logo` under "Rich Presence Assets"
5. Edit `config.json`:
    ```json
    {
      "clientId": "YOUR_DISCORD_CLIENT_ID",
      "updateInterval": 15000
    }
    ```
6. Run the app:
    ```bash
    node index.js
    ```

7. (OPTIONAL) Package to application:
   ```bash
   npm install -g pkg
   pkg .
   ```
## License

MIT License
