const electron = require('electron');
const url = require('url')
const path = require('path')

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

// Ouvir se o aplicativo está pronto
app.on('ready', function () {
  // Criar nova janela
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });
  // Carregar HTML dentro da janela
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Saia do aplicativo quando estiver fechado
  mainWindow.on('closed', function () {
    app.quit();
  })

  // Construir menu a partir do template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Inserir menu
  Menu.setApplicationMenu(mainMenu)
});

// Lidar com criação da janela de adição
function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add shopping list item'
  });
  // Carregar HTML dentro da janela
  addWindow.loadURL(url.format({
    webPreferences: {
      nodeIntegration: true
    },
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Garbage collection
  addWindow.on('close', function () {
    addWindow = null;
  });

}

// Pegar item:add
ipcMain.on('item:add', function (e, item) {
  console.log(item);
  mainWindow.webContents.send('item:add', item)
  addWindow.close();
})

// Criar template do menu
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Item',
        click() {
          createAddWindow();
        }
      },
      {
        label: 'Clear Items',
        click() {
          mainWindow.webContents.send('item:clear');
        }
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

// Se mac, adicionar um objeto vazio no menu
if (process.platform == 'darwin') {
  mainMenuTemplate.unshift({});
}

// Adicionar item de ferramentas de desenvolvedor se não estiver em produção
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}