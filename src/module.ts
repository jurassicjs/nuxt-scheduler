import {defineNuxtModule, createResolver, addTemplate, addComponent, addServerHandler} from '@nuxt/kit'
import defu from 'defu'
import type { Storage, StorageValue } from 'unstorage'
export interface ModuleOptions {
  storage: Storage<StorageValue>
 }

export const scheduleStorage: {storage: Storage<StorageValue>|null} = {storage: null}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-scheduler',
    configKey: 'nuxtScheduler',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    addPlugin: false
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const {storage} = options

    if(storage) {
      //make storage available to the scheduler
      console.log('storage is here')
      registerStorage(storage)
    } else {
      console.log('no storage')
    }

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.alias = nitroConfig.alias || {}
      nitroConfig.externals = defu(typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {}, {
        inline: [resolve('./runtime')]
      })
      nitroConfig.alias['#scheduler'] = resolve('./runtime/server/services')
      nitroConfig.publicAssets ||= []
      nitroConfig.publicAssets.push({
        dir: resolve('./runtime/public'),
        maxAge: 60 * 60 * 24 * 365 // 1 year
      })
    })

    addServerHandler({
      route: '/api/schedule',
      handler: resolve(__dirname, './runtime/server/api/schedule'),
    })
    addComponent({
      filePath: resolve(__dirname, './runtime/components/ScheduleLog.vue'),
      name: 'ScheduleLog',
    })

    addTemplate({
      filename: 'types/scheduler.d.ts',
      getContents: () => [
        'declare module \'#scheduler\' {',
        `  const useScheduler: typeof import('${resolve('./runtime/server/services')}').useScheduler`,
        '}'
      ].join('\n')
    })

    nuxt.hook('prepare:types', (options) => {
      options.references.push({ path: resolve(nuxt.options.buildDir, 'types/scheduler.d.ts') })
    })
  }
})

function registerStorage(storage: any) {
  scheduleStorage.storage = storage
}

export function getSchedulerStorage(): Storage<StorageValue> {
  return scheduleStorage.storage
}



