const electron = require('electron');
const url = require('url')
const path = require('path')

const { app, BrowserWindow, Menu } = electron;

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

  // Construir menu a partir do template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Inserir menu
  Menu.setApplicationMenu(mainMenu)
})

// Criar template do menu
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Item'
      },
      {
        label: 'Clear Items'
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit()
        }
      }
    ]
  }
];