import kue from 'kue';

const queue = kue.createQueue();

const jobData = {
    phoneNumber: '1234567890',
    message: 'Hello, this is a text message.',
};

const job = queue.create('push_notification_code', jobData);

job
  .on('enqueue', () => {
    console.log('Notification job created:', job.id);
  })
  .on('complete', () => {
    console.log('Notification job completed');
  })
  .on('failed attempt', () => {
    console.log('Notification job failed');
  });
job.save();
