import { useScheduler } from "#scheduler"
import say from "~~/server/app/services/say";
import { storage } from "~~/server/app/services/storage";




function startScheduler() {
  const scheduler = useScheduler();
  scheduler.setStorage(storage)
  //the name of the function to run should be the first arguement.
  // saveOutputTo  should be reserved for saving to something other than standard storage. 
//   scheduler.run('cool:beans', async() => {
//     say("cool beans! I run every 20 seconds! But I don't save the output");
//     return 'cool working'
//   }).everySeconds(10).setJobDescription('whatever').saveOutput()
}
