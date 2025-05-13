import http from 'k6/http';
import { check } from 'k6';

const base_url = 'https://am1.development.bartendercloud.com/api/actions?keepStatus=2h&Wait=60s&messageCount=100&messageSeverity=Info';
const rootFolder = 'librarian://Main/QA/Keith';
const Admin_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkY1RTNDMjlGN0ZEMkNDNEMzNTZBQkVFN0U4N0UxNTQxN0NFQTQ5MzFSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IjllUENuM19TekV3MWFyN242SDRWUVh6cVNURSJ9.eyJuYmYiOjE3NDcwOTgyODQsImV4cCI6MTc0NzEzNDI4NCwiaXNzIjoiaHR0cHM6Ly9iaWRzLmFtMS5kZXZlbG9wbWVudC5iYXJ0ZW5kZXJjbG91ZC5jb20iLCJhdWQiOiJodHRwczovL0JhclRlbmRlckNsb3VkU2VydmljZUFwaSIsImNsaWVudF9pZCI6IkFjY291bnRNYW5hZ2VtZW50Q2xpZW50Iiwic3ViIjoiNjg1Yjc4OWEtNzJlOC00ZGMwLWIzNGItNjI1OWFiZjUyYTE5IiwiYXV0aF90aW1lIjoxNzQ2NjA4ODY4LCJpZHAiOiJsb2NhbCIsImh0dHBzOi8vQmFyVGVuZGVyQ2xvdWQuY29tL1RlbmFudElEIjoiNzM4ZGMxYmQtMjgzNy00ZDFlLTgzMTItZTRjMWFkY2M1NzlhIiwiaHR0cHM6Ly9CYXJUZW5kZXJDbG91ZC5jb20vVXNlcklEIjoiODdmYmIwNzYtMjJjOS00ZmJlLTg1NTAtM2IwNmY2YWIwNTcyIiwiaHR0cHM6Ly9CYXJUZW5kZXJDbG91ZC5jb20vRGF0YUNlbnRlclVSSSI6Imh0dHBzOi8vYW0xLmRldmVsb3BtZW50LmJhcnRlbmRlcmNsb3VkLmNvbS8iLCJqdGkiOiJGQ0NBOThBMzc4QTYzMDk2N0M2MThCNDE5NTg0NjAxMiIsInNpZCI6IjIwRDg4MzJGNUNFRjNENzA3NjczNzM0QzRFNDQ0RDg0IiwiaWF0IjoxNzQ3MDk4Mjg0LCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiLCJCYXJUZW5kZXJTZXJ2aWNlQXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.qALYshjejhbZPcvHhUxS2dL7EljcxU3Lr061tnU540oGCIWeQ28GrYlYYGm3KZ2COE5D8_uI1L7nrApVMyO5kLbbrnV3uEY9WFrNOv-bTl1ebBVo_PosNy2sFjlUyTXXBBYXBq9FTxk28ph_i0M5MjRJDDbbm5rciFK_ExxJb3otjnYn35GGgUUpbRTQ3MGkl1XqSndru6CEpEPtQbSpl_KLSECqh93-6xTx6doORhOlrm4gEblwRHyJ6K6WBAxqxyV6V2BAHyzos6QwB4C1McuznzA1qA8KM9_gd_3Y587dwcZ8rRn7FOZQNosQftxFVGqiKRlnkxqYSIlc88nOng'; // 實際請填入

export let options = {
    vus: 1,
    iterations: 5
};

export default function () {
    const index = __ITER + 1; // 取得第幾次執行
    const jobName = `Seq-${index}`; // 取代 %index%

    const payload = JSON.stringify({
        PrintBTWAction: {
            DocumentFile: `${rootFolder}/AssetLabel.btw`,
            CloseDocumentAfterPrint: true,
            SaveAfterPrint: true,
            Printer: "printer:KL-Win11-FFM7F.corp.seagullscientific.com/TSC_TX200",
            Copies: 1,
            QueueAndContinue: false,
            VerifyPrintJobIsComplete: false,
            JobName: jobName,
            Name: "PrintToLocaPrinter"
        }
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Admin_token}`
        }
    };

    const res = http.post(base_url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    console.log(`✅ Job ${jobName} posted. Response status: ${res.status}`);
}