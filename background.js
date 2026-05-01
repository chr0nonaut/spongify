
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "spongify-text",
    title: "Spongify",
    contexts: ["editable"]
  });
});


browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "spongify-text") {
    browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: spongifyLogic
    });
  }
});


function spongifyLogic() {
  const activeEl = document.activeElement;
  
  if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
    const start = activeEl.selectionStart;
    const end = activeEl.selectionEnd;
    const selectedText = activeEl.value.substring(start, end);

    if (selectedText) {
      const sponged = selectedText
        .split('')
        .map((char, i) => i % 2 ? char.toUpperCase() : char.toLowerCase())
        .join('');

      
      activeEl.setRangeText(sponged, start, end, 'select');
    }
  }
}