import { useScheduler } from "#scheduler"
import say from "~~/server/app/services/say";


export default defineNitroPlugin(() => {
  startScheduler()
})

function startScheduler() {
  const scheduler = useScheduler();

  scheduler.run('Launch', () => {
    say("I run every 5 seconds, 🚀");
  }).everySeconds(5);

  scheduler.run('starship:launch', () => {
    say("I run every 15 seconds, 🚀🚀🚀");
  }).everySeconds(15);

  // create as many tasks as you want here
}
