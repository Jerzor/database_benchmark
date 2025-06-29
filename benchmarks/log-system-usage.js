import os from 'os';
import fs from 'fs';
import path from 'path';

const [, , db, type, duration = 30] = process.argv;

const fileName = `system-${db}-${type}-${Date.now()}.json`;
const filePath = path.join('benchmarks/', fileName);

let log = [];

console.log(`📊 Logging system usage to ${filePath} for ${duration}s...`);

const interval = setInterval(() => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const cpus = os.cpus();

  const cpuLoad = cpus.map((cpu) => {
    const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
    const idle = cpu.times.idle;
    return 1 - idle / total;
  });

  log.push({
    timestamp: Date.now(),
    cpuAvg: (cpuLoad.reduce((a, b) => a + b, 0) / cpuLoad.length).toFixed(4),
    memoryUsed: totalMem - freeMem,
    memoryTotal: totalMem,
  });
}, 1000);

setTimeout(() => {
  clearInterval(interval);
  fs.writeFileSync(filePath, JSON.stringify(log, null, 2));
  console.log(`✅ Saved system log: ${filePath}`);
}, duration * 1000);
