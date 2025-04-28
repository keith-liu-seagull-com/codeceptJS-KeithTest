import path from "path";
import { windowManager } from "node-window-manager";
import installer from "../pages/installer.page";


const { I } = inject();

const windows = windowManager.getWindows();



Given(/^The user has installed a driver on the system$/, async function () {


    console.log("✅ Connected to Zebra installer:", I);

});
When('the user proceeds with the installation', async () => {
    // const I = container.support().I;
    I.waitForElement("//RadioButton[@Name='I accept the terms in the license agreement']", 15);
    I.click("//RadioButton[@Name='I accept the terms in the license agreement']");
    I.click(installer.nextButton);
    I.click(installer.nextButton);
    I.click(installer.finishButton);
});
When(/^verify that the installer open the wizard$/, function () {

});
Given(/^The user is installing some driver$/, function () {

});
When(/^the user proceeds with the wizard installation$/, async function () {
    I.click(installer.nextButton);
    I.pressKey(["Alt", "o"]);
    I.wait(3);
    I.click(installer.nextButton);


    I.click(installer.nextButton);
    I.click(installer.nextButton);
    I.click(installer.nextButton);

    I.click(installer.finishButton);


});
When(/^verify that the wizard finish the installation$/, function () {

});