"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
let win;
electron_1.app.on("ready", () => {
    win = new electron_1.BrowserWindow({
        width: 1400,
        height: 800,
        autoHideMenuBar: true,
        resizable: false,
    });
    win.loadFile(path_1.default.join(__dirname, "../index.html"));
    win.on("closed", () => {
        win = null;
    });
});
electron_1.app.on("window-all-closed", () => {
    {
        electron_1.app.quit();
    }
});
