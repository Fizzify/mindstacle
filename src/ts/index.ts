import { app, BrowserWindow } from "electron";
import path from "path";

let win: BrowserWindow | null;

app.on("ready", () => {
  win = new BrowserWindow({
    width: 1400,
    height: 800,
    autoHideMenuBar: true,
    resizable: false,
  });

  win.loadFile(path.join(__dirname, "../index.html"));

  win.on("closed", () => {
    win = null;
  });
});

app.on("window-all-closed", () => {
  {
    app.quit();
  }
});
