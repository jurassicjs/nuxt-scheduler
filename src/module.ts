import { defineNuxtModule, createResolver, addTemplate, resolveModule, extendPages } from '@nuxt/kit'
import defu from 'defu'

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

    extendPages((pages) => {
      pages.push({
        name: 'Schedule Log',
        path: '/schedule-log',
        file: resolve(__dirname, './runtime/pages/scheduleLog.vue')
      })
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


