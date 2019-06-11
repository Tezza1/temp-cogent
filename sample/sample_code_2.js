// process1.js ---------------------------------------------------

const kue = require('kue');

// a queue is created in redis
// if need any option for connection to redis - pass as object to this function
const queue = kue.createQueue();

let job = queue.create('myQueue', {
    from: 'process1',
    type: 'testMessage',
    data: {
        msg: 'Hello world'
    }
}). save((err) => {
    if (err) throw err;
    console.log(`Job ${job.id} saved to the queue`);
});

// the first parameter of the queue.ceate call is the name of the queue - it must be the same in the sender and receiver in order for them to read each other's messages
// the second parameter is the json object containing the data that you want to send
// the last block contains the "job complete" event listener, which deletes a message from the databse when it is marked as complete
// a simpler, easier way is }).removeOnComplete(true).save((err) => {

queue.on('job complete', (id, result) => {
    kue.Job.get(id, (err, job) =>{
        if (err) throw err;
        job.remove((err) => {
            if (err) throw err;
            console.log('Removed completed job ${job.id}');
        });
    });
})

// process2.js ---------------------------------------------------
const kue = require('kue');
const queue = kue.createQueue();

function processMessage(data, callback) {
    switch(data.from){
        case 'process1':
            switch(data.type){
                case 'testMessage':
                    handleTestMessage(data.data, callback);
                    break;
                default:
                    callback();
            }
            break;
        default:
            callback();
    }
}

function handleTestMessage(data, callback) {
    console.log(`process1 wants me to say ${data.msg}`);
    callback();
}

// this is an event handle and it will be called whenever a new message is available
// first parameter is the name of the queue to obsever
// second parameter is the function to handle the messages
queue.process('myQueue', function(job, done){
    processMessage(job.data, done);
})