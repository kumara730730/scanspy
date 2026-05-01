import { startScan, cancelScan, getScan } from './scanEngine.js';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'START_SCAN':
      startScan(message.targetUrl, message.wordlist)
        .then(scanId => sendResponse({ success: true, scanId }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true;

    case 'CANCEL_SCAN':
      cancelScan(message.scanId);
      sendResponse({ success: true });
      break;

    case 'GET_SCAN':
      const scan = getScan(message.scanId);
      sendResponse({ success: !!scan, scan });
      break;

    case 'GET_ACTIVE_TAB':
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          sendResponse({ url: tabs[0].url });
        } else {
          sendResponse({ error: 'No active tab' });
        }
      });
      return true;
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('FuzzForge Extension Installed');
});
