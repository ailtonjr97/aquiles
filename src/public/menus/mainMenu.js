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
                    BrowserWindow.getFocusedWindow().webContents.loadURL('http://192.168.221.131:3000/lgpd/novo-documento');
                }}
            ]},
        ]
    },
    {
        label: "Dev Tools",
        role: 'toggleDevTools'
    }
]