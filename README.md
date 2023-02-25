<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: Nuxt Scheduler
- Package name: nuxt-scheduler
- Description: Schedule Jobs within Nuxt 3
-->

# Nuxt Scheduler

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Schedule Jobs within Nuxt 3.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- 👩🏼‍🌾 human readable
- 😌 easy to use

## Quick Setup

1. Add `nuxt-scheduler` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-scheduler

# Using yarn
yarn add --dev nuxt-scheduler

# Using npm
npm install --save-dev nuxt-scheduler
```

2. Add `nuxt-scheduler` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-scheduler'
  ]
})
```

That's it! You can now use Nuxt Scheduler in your Nuxt app ✨

## Example Usage
You must create a file here
> ~/server/app/scheduler.ts

```js
import { useScheduler } from "#scheduler";
import say from "~/server/app/services/say";

export default function startScheduler() {
  const scheduler = useScheduler();

  scheduler.start();

  scheduler.run(() => {
    say("this should run every 5 seconds");
  }).everySeconds(5);

  // create as many jobs as you want here
}
```

>  use Human Readable intervals
```
everySecond
everySeconds(5)
everyMinute
everyFiveMinutes
everyMinutes(15)
everyHour
everyHours(3)
everyDay
everyDays(2)
```

> or set using cron syntax
```
setRawInterval('* * * * *')
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-scheduler/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-scheduler

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-scheduler.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-scheduler

[license-src]: https://img.shields.io/npm/l/nuxt-scheduler.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-scheduler

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
