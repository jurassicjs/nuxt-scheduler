import { useScheduler } from "#scheduler"
import say from "~~/server/app/services/say";


export default defineNitroPlugin(() => {
  startScheduler()
})

function startScheduler() {
  const scheduler = useScheduler();

  scheduler.run(() => {
    say("I run every 3 seconds, 🚀🚀🚀");
  }).everySeconds(3);

  scheduler.run(() => {
    say("I run every 5 seconds, 🚀🚀🚀🚀🚀");
  }).everySeconds(5);

  // create as many tasks as you want here
}
