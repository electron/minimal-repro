/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // Function to request local time from main process
  getTime: () => ipcRenderer.send('get-time'),

  // Function to listen for the time response
  onTimeResponse: (callback) => ipcRenderer.on('time-response', callback)
})
