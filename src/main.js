const { app, BrowserWindow, Menu, ipcMain} = require('electron');
const dbProdutos = require('./models/dbProdutos');

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow

const menuPrincipal = Menu.buildFromTemplate(require('./public/menus/mainMenu'))

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    height: 1200,
    width: 1500,
    icon: './images/logofibra.ico',
    title: 'Fibracem',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadURL('http://192.168.2.87/login')

/*   Menu.setApplicationMenu(menuPrincipal)
 */
  // mainWindow.webContents.openDevTools();

};

app.on('ready', ()=>{
  createWindow()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


ipcMain.on("produtos", async(e, data)=>{
  console.log(data)
  e.sender.send('produtos-resposta', await dbProdutos.produtos());
})