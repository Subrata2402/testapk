import os from 'os';
import fs from 'fs';
import path from 'path';

export interface SystemMetrics {
  cpu: {
    model: string;
    cores: number;
    usage: number;
  };
  memory: {
    total: number;
    free: number;
    used: number;
    usagePercentage: number;
    processMemory: number;
  };
  os: {
    platform: string;
    release: string;
    uptime: number;
    processUptime: number;
  };
}

// Helper to calculate CPU usage
const getCpuUsage = (): Promise<number> => {
  return new Promise((resolve) => {
    const startMeasure = cpuAverage();
    setTimeout(() => {
      const endMeasure = cpuAverage();
      const idleDifference = endMeasure.idle - startMeasure.idle;
      const totalDifference = endMeasure.total - startMeasure.total;
      const percentageCPU = 100 - Math.round((100 * idleDifference) / totalDifference);
      resolve(percentageCPU);
    }, 100);
  });
};

const cpuAverage = () => {
  const cpus = os.cpus();
  let idleMs = 0;
  let totalMs = 0;

  cpus.forEach((core) => {
    for (const type in core.times) {
      totalMs += (core.times as any)[type];
    }
    idleMs += core.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
};

export const getSystemMetrics = async (): Promise<SystemMetrics> => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const usagePercentage = Math.round((usedMem / totalMem) * 100);
  const processMemory = process.memoryUsage().heapUsed;

  const cpuUsage = await getCpuUsage();

  return {
    cpu: {
      model: os.cpus()[0]?.model || 'Unknown',
      cores: os.cpus().length,
      usage: cpuUsage,
    },
    memory: {
      total: totalMem,
      free: freeMem,
      used: usedMem,
      usagePercentage,
      processMemory,
    },
    os: {
      platform: os.platform(),
      release: os.release(),
      uptime: os.uptime(),
      processUptime: process.uptime(),
    },
  };
};

// Helper to read the last N lines of a file
export const readLastLines = (filePath: string, maxLines: number = 100): string[] => {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    
    // Return the last N lines
    return lines.slice(-maxLines);
  } catch (error) {
    console.error(`Error reading log file ${filePath}:`, error);
    return [];
  }
};
