/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
// Renderer process: handles UI interactions

// When button is clicked, request local time from main process
document.getElementById('timeBtn').addEventListener('click', () => {
    window.electronAPI.getTime()
  })
  
  // When main process replies, update output div with the received time
  window.electronAPI.onTimeResponse((event, time) => {
    document.getElementById('output').innerText = time
  })
  