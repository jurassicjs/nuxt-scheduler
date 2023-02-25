import { useScheduler } from "#scheduler";
import say from "~~/server/app/services/say";

export default function startScheduler() {
  const scheduler = useScheduler();

  scheduler.start();

  scheduler.run(() => {
    say("this should run every 5 seconds");
  }).everySeconds(5);

  // create as many jobs as you want here
}
