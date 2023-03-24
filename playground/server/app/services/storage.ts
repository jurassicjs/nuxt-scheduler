import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";
import redisDriver from "unstorage/drivers/redis";

export const storage = createStorage({
  driver: redisDriver({
    url: 'localhost',
    base: "unstorage",
    host: '127.0.0.1',
    tls: false as any,
    port: 6379,
    password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
  })
});

export const defaultStorage = createStorage({
  driver: memoryDriver(),
});

