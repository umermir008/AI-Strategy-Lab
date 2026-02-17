const simulateRun = async () => {
  let logs = [];
  let isRunning = false;
  const setLogs = (newLogs) => logs = newLogs;
  const setIsRunning = (val) => { isRunning = val; console.log(`State changed: isRunning = ${val}`); };
  const addLog = (msg, type) => {
    const newLog = {
      id: Date.now(),
      type,
      msg,
      time: new Date().toLocaleTimeString([], { hour12: false })
    };
    setLogs([newLog, ...logs].slice(0, 50));
    console.log(`[${newLog.time}] ${type.toUpperCase()}: ${msg}`);
  };
  const notify = (title, message, type) => {
     console.log(`NOTIFICATION: ${title} - ${message} (${type})`);
  };

  if (isRunning) return;
  setIsRunning(true);

  try {
    addLog('Starting strategy validation...', 'info');

    await new Promise(r => setTimeout(r, 2000));

    addLog('Neural weights optimized.', 'success');
    notify('Optimization Complete', 'Neural weights optimized.', 'success');

    await new Promise(r => setTimeout(r, 1500));

    addLog('Strategy execution completed.', 'success');
    notify('Simulation Finished', 'Backtest passed all parameters.', 'info');

  } catch (err) {
    addLog('Execution failed.', 'error');
    console.error(err);
  } finally {
    setIsRunning(false);
  }
};

console.log("Starting Simulation Test...");
simulateRun();
