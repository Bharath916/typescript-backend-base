"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const pidusage = require("pidusage");
const { exec } = require("child_process");
// Function to check CPU utilization
function checkCPUUtilization() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usage = yield pidusage(process.pid);
            const cpuUsagePercent = usage.cpu;
            // console.log(`Current CPU usage: ${cpuUsagePercent}%`);
            if (cpuUsagePercent > 70) {
                console.log("CPU usage exceeds 70%.");
                // Perform actions here when CPU usage exceeds 70%
                restartServer();
            }
        }
        catch (error) {
            console.error("Error checking CPU utilization:", error);
        }
    });
}
function restartServer() {
    // Execute a command to restart the Node.js server
    exec("pm2 restart index.ts", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error restarting server: ${error}`);
            return;
        }
        console.log(`Server restarted: ${stdout}`);
    });
}
// Set up CPU utilization monitoring
setInterval(checkCPUUtilization, 5000); // Check every 5 seconds
//# sourceMappingURL=monitor.js.map