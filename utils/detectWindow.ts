import { spawn } from "child_process";
import { windowManager } from "node-window-manager";
import * as fs from "fs";
import * as path from "path";

const wait = (ms: number) => new Promise(res => setTimeout(res, ms));
let windows = windowManager.getWindows();
// Leer argumentos desde la CLI
const [,, exeName, titleContains] = process.argv;

if (!exeName || !titleContains) {
    console.error("❌ Uso correcto: ts-node detectWindow.ts <exeName> <windowTitlePart>");
    process.exit(1);
}


const exePath = exeName ? path.join(process.env.USERPROFILE || "", "Downloads", exeName) : null;

async function detectWindow() {
    console.log(exePath);
    if (!exePath.includes("null")) {
        console.log(`🚀 Launching: ${exePath}`);
        spawn(exePath, [], {detached: true, stdio: "ignore"}).unref();
    }
    const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

    await wait(4000);
    console.log(`🔍 Waiting for window with title containing: "${titleContains}"`);
    windows = windowManager.getWindows();
    const targetWindow = windows.find(win =>
        win.getTitle().includes(titleContains)
    );

    await wait(1000);

    if (!targetWindow) {
        console.error("❌ No se encontró la ventana.");
        return;
    }

    const hexHandle =  "0x" + targetWindow.id.toString(16);

    const outputPath = path.join("window.json");
    fs.writeFileSync(outputPath, JSON.stringify({ appTopLevelWindow: hexHandle }, null, 2));

    console.log(`✅ Ventana detectada y guardada: ${hexHandle}`);
}

detectWindow();
