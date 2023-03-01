import say from "~/server/app/services/say";
import { useScheduler } from "#scheduler";

export function addSalesTasks() {
  const scheduler = useScheduler();
  scheduler.run(() => {
    say("running form salesTasks.ts");
  }).everySeconds(5);
}
