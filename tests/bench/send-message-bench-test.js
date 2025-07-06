//run api app localy before 
'use strict';
const autocannon = require('autocannon');
//for bun
//import autocannon from 'autocannon';

function startBench() {
  const url = 'http://localhost:3333';
  const msg = {
    roomId: 0,
    userId: 1,
    message: 'perf message-[<id>]',
  };

  const instance = autocannon(
    {
      url,
      connections: 1000,// 1000 max bun (or fastify) concurrent connections : 206k requests in 11.08s, 62.5 MB read, / p99% 100ms (less with helmet)
      // connections: 150 , max nodejs concurrent connections
      duration: 10,//use duration or amount //amount: 1000000, // bun 1 million on 100s 
      workers: 1,
      requests: [
        {
          method: 'POST',
          path: '/api/send-message',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify(msg),
        }
      ],
      idReplacement: true,
    },
    finishedBench
  );

  autocannon.track(instance);
}
function finishedBench(err, res) {
  console.log('Finished bench erros:', err);
  // console.log('Finished bench result', res);
}
startBench();