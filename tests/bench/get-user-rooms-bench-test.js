//run api app localy before 
'use strict';
const autocannon = require('autocannon');
//for bun
//import autocannon from 'autocannon';

function startBench() {
  const url = 'http://localhost:3333';
  const instance = autocannon(
    {
      url,
      connections: 1000,
      // amount: 10000,
      duration: 10,//use duration or amount
      workers: 1,
      requests: [
        {
          method: 'GET',
          path: '/api/chat-user-rooms/1',
          headers: {'Content-Type': 'application/json'}
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
  // console.log('Finished bench result', res);
}
startBench();