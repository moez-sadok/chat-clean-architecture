//run api app localy before 
'use strict';
const autocannon = require('autocannon');

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
      connections: 100,
      amount: 1000,
      duration: 5,
      workers: 1,
      requests: [
        {
          method: 'POST',
          path: '/api/send-message',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(msg),
        },
      ],
      idReplacement: true,
    },
    finishedBench
  );

  autocannon.track(instance);
}
function finishedBench(err, res) {
  console.log('Finished bench erros:', err);
  console.log('Finished bench result', res);
}
startBench();