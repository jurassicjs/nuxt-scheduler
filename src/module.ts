import { defineNuxtModule, createResolver, addTemplate, addServerPlugin, useLogger } from '@nuxt/kit'
import defu from 'defu'
import fs from 'fs'

// Module options TypeScript inteface definition
export interface ModuleOptions { }

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
    const logger = useLogger('nuxt-scheduler')

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.alias = nitroConfig.alias || {}
      nitroConfig.externals = defu(typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {}, {
        inline: [resolve('./runtime')]
      })
      nitroConfig.alias['#scheduler'] = resolve('./runtime/server/services')
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

    const schedulerPath = resolve(nuxt.options.rootDir + '/server/app/scheduler.ts')
    const scheduleFileExists = fs.existsSync(schedulerPath)

    if (scheduleFileExists) {
      const Singleton = (function () {
        let instance: Object | null;

        function registerSingletonPlugin() {
            const object = new Object("I am the instance");
            addServerPlugin(resolve('./runtime/server/plugins/scheduler'))
            return object;
        }

        return {
            getInstance: function () {
                if (!instance) {
                    instance = registerSingletonPlugin();
                }
                return instance;
            }
        };
      })();


      Singleton.getInstance()
      logger.success('nuxt-scheduler is active.')

    } else {
      logger.error('nuxt-scheduler not active: cannot find ~/server/app/scheduler.ts')
    }
  }
})


