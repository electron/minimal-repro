// Modules to control application life, create windows, and handle IPC
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

// Function to create the main browser window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Preload script exposes safe APIs to renderer
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,  // keep renderer isolated for security
      nodeIntegration: false   // disable Node access in renderer
    }
  })

  mainWindow.loadFile('index.html') // load UI
  // mainWindow.webContents.openDevTools() // optional for debugging
}

// Called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow()

  // macOS: re-create window when dock icon clicked and no windows open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit app when all windows are closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// ----------------------
// IPC: listen for time requests from renderer
// Sends back local system time as string
ipcMain.on('get-time', (event) => {
  const now = new Date() // get local system time
  event.reply('time-response', now.toLocaleTimeString()) // send formatted time back
})
