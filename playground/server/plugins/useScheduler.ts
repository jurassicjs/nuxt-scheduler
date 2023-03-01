import { useScheduler as usePluginScheduler } from "#scheduler";
import say from "~~/server/app/services/say";
import { addUserTasks } from "~/server/app/services/tasks/userTasks";
import { addSalesTasks } from "~/server/app/services/tasks/salesTasks";

export default function useScheduler() {
  return usePluginScheduler;
}

export function startScheduler() {
  const scheduler = usePluginScheduler();
  console.log('running startScheduler')

  //add jobs from other files
  addUserTasks();
  addSalesTasks();

  scheduler.run(() => {
    say("this should run every 5 seconds");
  }).everySeconds(5);

  // create as many jobs as you want here
}
