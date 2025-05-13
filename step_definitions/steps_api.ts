
import assert from 'assert';

const { I } = inject();

let res;
let id;
Given(/^I have valid credentials$/, async function () {

    I.amBearerAuthenticated(secret('eyJhbGciOiJSUzI1NiIsImtpZCI6IkY1RTNDMjlGN0ZEMkNDNEMzNTZBQkVFN0U4N0UxNTQxN0NFQTQ5MzFSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IjllUENuM19TekV3MWFyN242SDRWUVh6cVNURSJ9.eyJuYmYiOjE3NDYxNzQwMzUsImV4cCI6MTc0NzAzODAzNSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmFtMS5iYXJ0ZW5kZXJjbG91ZC5jb20iLCJhdWQiOiJodHRwczovL0JhclRlbmRlckNsb3VkU2VydmljZUFwaSIsImNsaWVudF9pZCI6IkFjY291bnRNYW5hZ2VtZW50Q2xpZW50Iiwic3ViIjoiNjk5N2I2ZjYtZGQyNC00YTJiLWJkZDAtNDkyZWRiZDc4MmNiIiwiYXV0aF90aW1lIjoxNzQ2MTc0MDMwLCJpZHAiOiJsb2NhbCIsImh0dHBzOi8vQmFyVGVuZGVyQ2xvdWQuY29tL1RlbmFudElEIjoiNjQ4MjRlNGQtMzRkOC00ZGI5LWIyZDMtZDIzOTAzZDMxZTUxIiwiaHR0cHM6Ly9CYXJUZW5kZXJDbG91ZC5jb20vVXNlcklEIjoiYTQ5YTc0OWEtYjkxNi00MjBjLTkzMzktY2JlZDcxMTkwZWU1IiwiaHR0cHM6Ly9CYXJUZW5kZXJDbG91ZC5jb20vRGF0YUNlbnRlclVSSSI6Imh0dHBzOi8vYW0xLmJhcnRlbmRlcmNsb3VkLmNvbS8iLCJqdGkiOiJENjJDREM5RkYxRTUwNEI1Nzc2QjJDODEwQUU5NDMwQSIsInNpZCI6IjM2QkQ3RDI0MUI5M0ZDN0Y3MEFGRUJCMjI4OERDMUE3IiwiaWF0IjoxNzQ2MTc0MDM1LCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiLCJCYXJUZW5kZXJTZXJ2aWNlQXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.ACIhQYIb976xBY51OBaVXGKb7BHGr50vM_IfRS53Fa6BgWfXZBYKBl2X87Bm_l0u9AYmqGMPDHK3QN3avOkXDVtWo85npVS_nVe_erS1X_eSqL26sP-4L08ZUkdmcJECScXrXYL8aiEttGTi1Ei7Frc9hwYic6kTjDC3cq0B1UzKg3f0hvAbpzzu-LWl6TxHbCehyRVEiJzgD7_g2TvpCsF5zjn3JruAkuVbF66FTZv-Hy3NknCaPz3L9_BpzVCHszUrtcB9wH1I8SZqmF4AkigrOJQ2y1h-FPri6kCvucdM38jOkviuAerqWjOUE123C4fbNKuN2rkqLMOoKn7NDg'));
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
When("I send a post request to {string} with the next json body:", async function (endpoint: string, body) {

    res = await I.sendPostRequest(endpoint, body.content);
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
