const electron = require('electron');
const url = require('url')
const path = require('path')

const { app, BrowserWindow } = electron;

let mainWindow;

// Ouvir se o aplicativo está pronto
app.on('ready', function () {
  // Criar nova janela
  mainWindow = new BrowserWindow({});
  // Carregar HTML dentro da janela
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
})