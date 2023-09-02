import { defaultStorage } from "./storage";

export default defineNuxtConfig({
  modules: ['../src/module'],
  nuxtScheduler: {storage: defaultStorage},
  runtimeConfig: {}
})
