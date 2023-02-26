import startScheduler from '~/server/app/scheduler'

const Singleton = (function () {
  let instance: Object | null;

  function registerSingletonPlugin() {
      const object = new Object("I am the instance");
      startScheduler()
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


export default function () {
  Singleton.getInstance()
}

