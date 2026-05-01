export async function startScan(payload) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'START_SCAN', ...payload }, (response) => {
      if (chrome.runtime.lastError) return reject(new Error(chrome.runtime.lastError.message));
      if (!response.success) return reject(new Error(response.error));
      resolve(response);
    });
  });
}

export async function getScan(scanId) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'GET_SCAN', scanId }, (response) => {
      if (chrome.runtime.lastError) return reject(new Error(chrome.runtime.lastError.message));
      if (!response.success) return reject(new Error('Failed to fetch scan'));
      resolve(response.scan);
    });
  });
}

export async function cancelScan(scanId) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'CANCEL_SCAN', scanId }, (response) => {
      if (chrome.runtime.lastError) return reject(new Error(chrome.runtime.lastError.message));
      if (!response.success) return reject(new Error('Failed to cancel scan'));
      resolve(response);
    });
  });
}

export async function getActiveTabUrl() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'GET_ACTIVE_TAB' }, (response) => {
      if (chrome.runtime.lastError) return reject(new Error(chrome.runtime.lastError.message));
      if (response.error) return reject(new Error(response.error));
      resolve(response.url);
    });
  });
}
