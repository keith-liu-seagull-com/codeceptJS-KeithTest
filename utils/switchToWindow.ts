import {spawn} from "child_process";
import {windowManager} from "node-window-manager";
import {container} from "codeceptjs";
const Appium = require('codeceptjs/lib/helper/Appium');


let windows = windowManager.getWindows();

export async function switchToWindow(titleContains: string, exePath?: string, waitTime = 8000) {
    if (exePath) {
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


    if (!targetWindow) throw new Error(`❌ No window found with title including "${titleContains}"`);

    const hexHandle = "0x" + targetWindow.id.toString(16);


    const appiumHelper = container.helpers("Appium");
    if (!appiumHelper) throw new Error("❌ Appium helper not found");

    console.log(`🔁 Switching Appium to window: ${hexHandle}`);

    // Cerrar sesión actual
    // await appiumHelper._after();

    // Setear nuevo handle
    delete appiumHelper.options.capabilities["appium:app"];
    appiumHelper.options.desiredCapabilities["appium:appTopLevelWindow"] = hexHandle;

    // Reiniciar sesión
    const newAppiumHelper = new Appium({
        appiumV2: true,
        platform: 'Windows',
        url: 'http://127.0.0.1:4723',
        desiredCapabilities: {
            platformName: 'Windows',
            'appium:automationName': 'Windows',
            'appium:newCommandTimeout': 800,
            'appium:appTopLevelWindow': hexHandle
        }
    });

// Inyectar nuevo helper en el contenedor


    // delete container.helpers()['Appium'];
    container.append({
        helpers: {
            Appium: {
                appiumV2: true,
                platform: 'Windows',
                url: 'http://127.0.0.1:4723',
                options:{
                    capabilities: {
                        platformName: 'Windows',
                        'appium:automationName': 'Windows',
                        'appium:newCommandTimeout': 800,
                        'appium:appTopLevelWindow': hexHandle
                    }
                }

            }
        }
    }
);


    console.log("✅ Appium helper reiniciado con nuevo handle");



    // console.log(newAppiumHelper.options.desiredCapabilities);
    console.log( container.helpers()['Appium']);
    await wait(2000);
    return container.support().I;

}
