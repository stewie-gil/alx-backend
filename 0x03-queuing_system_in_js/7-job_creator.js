import kue from 'kue';

// Create an array of jobs
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account',
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account',
  },
];

// Create a Kue queue
const queue = kue.createQueue();

// Process each job in the array
for (const jobData of jobs) {
  // Create a new job in the 'push_notification_code_2' queue
  const job = queue.create('push_notification_code_2', jobData);

  // Event handler when the job is created without error
  job.on('enqueue', () => {
    console.log(`Notification job created: ${job.id}`);
    // Optionally, you can add more processing logic here.
  });

  // Event handler when the job is completed
  job.on('complete', () => {
    console.log(`Notification job ${job.id} completed`);
    // Optionally, you can add more processing logic here.
  });

  // Event handler when the job encounters an error
  job.on('failed', (err) => {
    console.error(`Notification job ${job.id} failed: ${err}`);
    // Optionally, you can add more error handling logic here.
  });

  // Event handler for job progress
  job.on('progress', (progress, data) => {
    console.log(`Notification job ${job.id} ${progress}% complete`);
    // Optionally, you can add more progress tracking logic here.
  });

  // Save the job to the queue
  job.save((err) => {
    if (err) {
      console.error('Error creating job:', err);
      // Optionally, you can handle the error here.
    }
  });
}

// Log a message when all jobs are created
console.log('All jobs created.');

// Exit the script (you may need to add more logic here to keep it running)
process.exit(0);
