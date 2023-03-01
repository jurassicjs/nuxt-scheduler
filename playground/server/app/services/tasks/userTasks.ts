import say from "~/server/app/services/say";
// import { useScheduler } from "#scheduler";

export function addUserTasks() {
  const scheduler = useScheduler();
  scheduler.run(() => {
    say("running form userTasks.ts");
  }).everySeconds(5);
}
