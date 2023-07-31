// @ts-ignore
import {defaultStorage as storage} from '~/server/app/services/storage';
import {run} from "./run";

let mySchedulerStorage = storage
type Storage = typeof mySchedulerStorage
export function getSchedulerStorage() {
  return storage
}

export function setStorage(schedulerStorage: Storage) {
  mySchedulerStorage = schedulerStorage
}

export function useScheduler() {
  return {
    setStorage,
    run
  }
}
