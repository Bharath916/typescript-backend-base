const pidusage = require("pidusage");
const { exec } = require("child_process");

// Function to check CPU utilization
async function checkCPUUtilization() {
  try {
    const usage = await pidusage(process.pid);
    const cpuUsagePercent = usage.cpu;

    // console.log(`Current CPU usage: ${cpuUsagePercent}%`);

    if (cpuUsagePercent > 70) {
      console.log("CPU usage exceeds 70%.");
      // Perform actions here when CPU usage exceeds 70%
      restartServer();
    }
  } catch (error) {
    console.error("Error checking CPU utilization:", error);
  }
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
