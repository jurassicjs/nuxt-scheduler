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

  // create as many tasks as you want here
}
