import kue from 'kue';


const queue = kue.createQueue();


function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

}


queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;


  sendNotification(phoneNumber, message);


  done();
});


queue.on('ready', () => {
  console.log('Job processor is ready to process jobs.');
});


queue.on('error', (err) => {
  console.error('Job processor error:', err);
});

process.exit(0);
