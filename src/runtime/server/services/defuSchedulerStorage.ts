import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";

export const defaultStorage = createStorage({
  driver: memoryDriver(),
});
