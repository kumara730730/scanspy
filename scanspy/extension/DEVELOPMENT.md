# FuzzForge Extension Development Guide

This extension is built with Manifest V3 and React.

## Project Structure

- `public/`: Manifest, icons, and popup HTML.
- `src/background/`: Service worker handling the scanning logic.
- `src/content/`: Isolated content script using Shadow DOM for page interaction.
- `src/popup/`: React-based user interface.
- `src/shared/`: Logic shared between background and popup.

## How to Test

### 1. Build the Extension
Run the following in the `extension` directory:
```bash
npm install
npm run build
```

### 2. Load into Browser

#### Chrome / Edge / Brave
1. Open `chrome://extensions/`.
2. Enable **Developer Mode**.
3. Click **Load unpacked**.
4. Select the `extension/dist` folder (after build) or `extension/public` if you're testing manifest changes.

#### Firefox
1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on**.
3. Select the `manifest.json` file in your build directory.

## Isolation and Security

- **Shadow DOM**: The content script UI is injected using a closed Shadow Root to prevent the host website from accessing or styling the extension's UI.
- **CSP**: Strict Content Security Policy prevents the execution of remote scripts and ensures all logic is bundled locally.
- **Message Passing**: Components communicate via standard `chrome.runtime` messaging, keeping the UI separate from the scanning engine.
