import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";
import redisDriver from "unstorage/drivers/redis";

export const redisStorage = createStorage({
  driver: redisDriver({
    url: 'localhost',
    base: "unstorage",
    host: '127.0.0.1',
    tls: false as any,
    port: 6379,
    password: useRuntimeConfig().redisPassword
  })
});

export const defaultStorage = createStorage({
  driver: memoryDriver(),
});

