const clearButton = document.getElementById('clear-button');
const reloadAfterCheckbox = document.getElementById('reload-after-checkbox');

clearButton.addEventListener('click', () => {
  chrome.tabs.query({ active: true }, tabs => {
    const currentTab = tabs.find(tab => tab.selected);

    chrome.browsingData.remove(
      {
        "since": 0,
        "origins": [currentTab.url]
      },
      {
        "appcache": true,
        "cache": true,
        "cacheStorage": true,
        "cookies": true,
        "fileSystems": true,
        "indexedDB": true,
        "localStorage": true,
        "serviceWorkers": true,
        "webSQL": true
      },
      () => {
        if (reloadAfterCheckbox.checked) {
          chrome.tabs.reload(currentTab.id);
        }
      }
    );
  });
});