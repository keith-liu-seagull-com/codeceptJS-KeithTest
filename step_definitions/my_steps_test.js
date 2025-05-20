const { I } = inject();
const assert = require('assert');

Given("I have valid credentials", async function () {

    I.amBearerAuthenticated(secret('eyJhbGciOiJSUzI1NiIsImtpZCI6IkY1RTNDMjlGN0ZEMkNDNEMzNTZBQkVFN0U4N0UxNTQxN0NFQTQ5MzFSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IjllUENuM19TekV3MWFyN242SDRWUVh6cVNURSJ9.eyJuYmYiOjE3NDczNzYxMjgsImV4cCI6MTc0ODI0MDEyOCwiaXNzIjoiaHR0cHM6Ly9hdXRoLnN0YWdlLmJhcnRlbmRlcmNsb3VkLmNvbSIsImF1ZCI6Imh0dHBzOi8vQmFyVGVuZGVyQ2xvdWRTZXJ2aWNlQXBpIiwiY2xpZW50X2lkIjoiQWNjb3VudE1hbmFnZW1lbnRDbGllbnQiLCJzdWIiOiJmZDhkZWNiOC1kZmY1LTRjZmItYWRlNi1iNzljOTcwODlmOWMiLCJhdXRoX3RpbWUiOjE3NDYxNjk3ODYsImlkcCI6ImxvY2FsIiwiaHR0cHM6Ly9CYXJUZW5kZXJDbG91ZC5jb20vVGVuYW50SUQiOiJjMzU4OWM3Ni1mMzU3LTQwODItOTE3Yy1iZDQyMWY2MDYyYzciLCJodHRwczovL0JhclRlbmRlckNsb3VkLmNvbS9Vc2VySUQiOiI5MWJkMGVlYy02OTVkLTQyZDItOGQ2OC1mMDhiNTAwNTA0ZjciLCJodHRwczovL0JhclRlbmRlckNsb3VkLmNvbS9EYXRhQ2VudGVyVVJJIjoiaHR0cHM6Ly9zdGFnZS5iYXJ0ZW5kZXJjbG91ZC5jb20iLCJqdGkiOiJBNzUyMEQwMDQ3MzcwNkZEM0NGRjQxMTZGNDcxNTVFRSIsInNpZCI6IjMzMjEwMjA4OEY3NERGNzVERjIxMjIwQUMyMTYzNEM1IiwiaWF0IjoxNzQ3Mzc2MTI4LCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiLCJCYXJUZW5kZXJTZXJ2aWNlQXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.mbwy2WmGOeG50UhHZr5gOlrQX-CgT2Bcfd_XosGh7kndGyWp1UkVRmOwBEQUmE7zlOxElWZKZnjroBUWWawYzjJcqaKA3espbc59yrgiP6Rlm5J638Q7IJrfTJzf5hGit-Ip6l_p5NKz_TyxQdWXQOtReRWZ8FTfKUcPs71GA5RQPK5W7n81MEcytGXSmYpXa_1PUZjfHbBHkdVj1NQVwJkeuzwGN0sqHIU0Azx8MGbSegikFZyXxwlCrMvMA1Tt0qqF2aanyA5NNK_nN5i7YR977V8e8E9GE9mQns04w2UEo6tS4LVs9Q44VImvc1Yr4LJ-uV0a0Gy-YRDn6-iS6w'));
    console.log("✅ Connected into the API:");

Given('I use Zebra_ZT411_(300_dpi) to print', () => {
    // 硬編碼使用 printer name
    I.say('Using printer: Zebra_ZT411_(300_dpi)');
});

When('I send a POST request to {string} with the following JSON body:', async (url, jsonString) => {
    const body = JSON.parse(jsonString);

    // 因為 printer URI 已經硬寫在 JSON 裡，不需要替換變數
    const response = await I.sendPostRequest(url, body);
    I.storeResponse(response);
});

Then('the ActionScript should complete {int} loop iterations without being cancelled', async (expectedCount) => {
    const response = await I.getLastResponse?.(); // 假設你有自定義儲存的 response
    I.say('Verifying response...');

    // 根據你的實際 API 回傳資料結構進行驗證
    assert.ok(response, 'No response received');
    assert.strictEqual(response.status, 200, 'Expected HTTP 200 OK');

    // 模擬判斷是否完成了 500 次迴圈
    // 這要你根據實際 API 結果結構調整：
    assert.ok(response.data?.success, 'Expected success=true in response');
    assert.strictEqual(response.data?.iterationCount, expectedCount, `Expected ${expectedCount} iterations`);
});