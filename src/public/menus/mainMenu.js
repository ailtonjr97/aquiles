const { BrowserWindow, webContents} = require('electron');
const ejs = require('ejs');

module.exports = [
    {
        label: "Logística",
        submenu: [
            {label: 'Korp'},
            {label: 'Totvs', 
            submenu: [
                {label: 'Produtos', click: () => {
                    BrowserWindow.getFocusedWindow().webContents.loadFile('src/views/logistica/totvs/produtos/produtos.html');
                }}
            ]},
        ]
    },
    {
        label: "Dev Tools",
        role: 'toggleDevTools'
    }
]