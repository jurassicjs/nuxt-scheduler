
![NuxtSchedulerBlack](https://user-images.githubusercontent.com/45824492/221433099-051fe13c-089d-4578-9021-a338a2aac80d.png)

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

> This is a Server-Side task scheduler for Nuxt which depends on node-scheduler. 

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
Create as many scheduler you like as plugins. 
> ~/server/plugins/smileScheduler.ts

```js
import { useScheduler } from "#scheduler"
import say from "~~/server/app/services/say";

export default defineNitroPlugin(() => {
  startScheduler()
})

function startScheduler() {
  const scheduler = useScheduler();

  scheduler.run(() => {
    say("cool beans! I run once a second! 😀");
  }).everySecond();

  // create as many tasks as you want here
}
```

Each scheduler can have multiple tasks
> ~/server/plugins/rocketScheduler.ts

```js
import { useScheduler } from "#scheduler"
import say from "~~/server/app/services/say";


export default defineNitroPlugin(() => {
  startScheduler()
})

function startScheduler() {
  const scheduler = useScheduler();

  scheduler.run(() => {
    say("I run every 3 seconds, 🚀🚀🚀");
  }).everySeconds(3);

  scheduler.run(() => {
    say("I run every 5 seconds, 🚀🚀🚀🚀🚀");
  }).everySeconds(5);

  // create as many tasks as you want here
}
```

>  use Human Readable intervals
```
 everySecond
 everySeconds
 everyMinute
 everyMinutes
 everyTwoMinutes
 everyThreeMinutes
 everyFourMinutes
 everyFiveMinutes
 everyTenMinutes
 everyFifteenMinutes
 everyThirtyMinutes
 hourly
 hourlyAt
 everyOddHour
 everyHours
 everyTwoHours
 everyThreeHours
 everyFourHours
 everySixHours
 daily
 dailyAt
 everyDays
 weekly
 quarterly
 yearly
```

> or set using cron syntax
```
cron('* * * * *')
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

Special thanks to [Atinux](https://github.com/Atinux) for making suggestions that have made this module better 🚀 

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-scheduler/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-scheduler

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-scheduler.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-scheduler

[license-src]: https://img.shields.io/npm/l/nuxt-scheduler.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-scheduler

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
