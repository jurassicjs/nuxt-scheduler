// @ts-ignore
import {storage} from '~~/server/app/services/storage';
import {run} from "./run";

let mySchedulerStorage = storage

export function getSchedulerStorage() {
  return storage
}

export function setStorage(schedulerStorage: Storage) {
  mySchedulerStorage = schedulerStorage
}

type Storage = typeof mySchedulerStorage

export function useScheduler() {

  return {
    setStorage,
    run
  }
}

