// queue.js

let kue = require('kue');

// create a queue instance
let queue = kue.createQueue();

// create a job by calling create()
queue.create('email', {
    title: 'Welcome',
    to: 'hkjhjkhjk'
})
    .priority('high')
    .attempts(5)
    .save();


// worker.js
// to run jobs which have been added to a queue, create a separate worker process
// call process() -> first arg is the job itself & a callback
let queue = kue.createQueue();

queue.process('email', function (job, done) {
    sendEmail(job.data, done);
})

// -------------------------------------------------------------
let kue = require('kue');
let queue = kue.createQueue();

queue.process('test', (job, done) => {
    console.log("job data", job.data);
    // Do your task here
    //....
    // ....
    // And we are done
    done();
})


app.post("/triggerJob", (req, res) => {
    let job = queue
        .create()
        .save(function(err) {
            if(!err){
                console.log(job.id);
            }
        })

    res.send(200);
})

