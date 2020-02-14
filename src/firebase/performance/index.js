import firebase from '@firebase/app';
import '@firebase/performance';

const performance = firebase.performance();

const startTrace = (customTraceName) => {
  const trace = performance.trace(customTraceName);
  trace.start();
  return trace;
};

const stopTrace = (trace) => {
  trace.stop();
  console.log('Trace', trace.name, `${trace.durationUs / 1000} msec`, new Date(trace.startTimeUs / 1000).toLocaleString('JP'));
};

export default {
  startTrace: startTrace,
  stopTrace: stopTrace
};