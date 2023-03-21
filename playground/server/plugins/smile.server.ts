import { useScheduler } from "#scheduler"
import say from "~~/server/app/services/say";

export default defineNitroPlugin(() => {
  startScheduler()
})

function startScheduler() {
  const scheduler = useScheduler();
  
  scheduler.run(() => {
    say("cool beans! I run once a second! 😀");
  }).everySecond();

  scheduler.run(() => {
    say("Running a job at 01:00 PM at America/Sao_Paulo timezone 😀");
  }).cron('0 13 * * *', 'America/Sao_Paulo');

  // create as many tasks as you want here
}
