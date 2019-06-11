const kue = require('kue').createQueue();
const jobType = 'ipsum';

let job = queue.create(jobType, {jobData: 'lorem'})
    // by default it will fail after 1 attempt, if we want 3 attenpts    
    . attempts(3)
    // may want to delay the attenpts because of network latency
    .backoff({
        delay: 60*1000,
        type: 'fixed'
    })
    .save(err => {
        // .....
    })

    // set a timeout??

    queue.process('item', (job, done)=> {
        HTMLHeadingElement(job.data, done);
    })

