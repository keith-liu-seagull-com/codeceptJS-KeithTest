
import assert from 'assert';

const { I } = inject();

let res;
let id;
Given(/^I have valid credentials$/, async function () {

    I.amBearerAuthenticated(secret(environment.SECRET));
    console.log("✅ Connected into the API:");

});
When(/^I send a get request$/, async function () {
    res = await I.sendGetRequest('/users');
});
Then(/^I expect a value (\d+)$/, function (status:number) {
    id = res.data.id;
    assert.strictEqual(res.status, Number(status));

});
When("I send a get request to {string} endpoint", async function (endpoint: string) {
    endpoint = endpoint.replace("$id",id);
    res = await I.sendGetRequest(endpoint);
});
When("I send a post request to {string} with the next json body:", async function (endpoint: string, body: string) {

    res = await I.sendPostRequest(endpoint, body);
});
Then(/^I expect a value in name "([^"]*)"$/, function (expectedValue: string) {
    let name = res.data.name;
    assert.strictEqual(name,expectedValue);
});
Then(/^I expect a "([^"]*)" in "([^"]*)" field$/, function (expectedValue: string, field: string) {
    let currentStatus = res.data.Scripts[0].Status;
    console.log('current STATUS',currentStatus);
    assert.strictEqual(currentStatus,expectedValue);
});
