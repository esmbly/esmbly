import sw from 'spawn-wrap';
import onExit from 'signal-exit';
import { Profiler } from './Profiler';

const profiler = new Profiler(process.env.TMP_PATH || '');

profiler.start().then(() => {
  onExit(() => profiler.stop(), { alwaysLast: true });
  sw.runMain();
});
