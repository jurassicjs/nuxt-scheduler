import { useScheduler } from "#scheduler"
import say from "~~/server/app/services/say";
import { storage } from "~~/server/app/services/storage";

export default defineNitroPlugin(() => {
  startScheduler()
})

async function doSomething() {
  const examplePromise = new Promise((resolve, reject) => {
    // Simulating async operation using setTimeout
    setTimeout(() => {
      const isSuccessful = Math.random() >= 0.5; // Randomly decide if the operation is successful

      if (isSuccessful) {
        resolve('Operation successful!');
      } else {
        reject('Operation failed!');
      }
    }, 1000); // Wait for 1 second
  });
  return await examplePromise
}

async function sendNewsLetter() {
  return 'newsletter sent'
}

function startScheduler() {
  const scheduler = useScheduler();
  scheduler.setStorage(storage)

  scheduler.run(async() => {
    say("cool beans! I run every 20 seconds! But I don't save the output");
    return 'cool working'
  }).everySecond().saveOutputTo("scheduler:coolbeans")

  scheduler.run(async() => {
    say("I send a newsletter every minute!");
    return await sendNewsLetter()
  }).everyMinute().setJobDescription('send newsletter').saveOutputTo("scheduler:newsletter")

  scheduler.run(async () => {
    say("cool beans! I run every once a minute!");
    // throw new Error('This is the error and it is not cool yo 🥲')
    return doSomething()
  }).hourly().setJobDescription('I do Something').saveOutputTo("heyYou")

  scheduler.run(() => {
    say("Running a job at 21:23 PM at Europe/Berlin 😀");
  }).cron('23 21 * * *', 'Europe/Berlin').setJobDescription('I do Something via cron').saveOutputTo("cron");

  scheduler.run(() => {
    say("Running a job at 21:23 PM at Europe/Berlin 😀");
  }).hourly().setJobDescription('I do Something via cron').saveOutputTo("hahaha");
  // create as many tasks as you want here
}
