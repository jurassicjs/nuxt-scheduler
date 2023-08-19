<template>
  <div class="dark-background">
    <div class="container">
      <!-- <div class="logo-top">
        <img
          src="/nuxtscheduler.png"
          alt="Nuxt Scheduler"
          height="100"
          width="100"
        >
      </div> -->
      <div v-for="(task, index) in data?.register" :key="index" class="register">
        <div class="col">
           Key {{ task.key }}
        </div>
        <div class="col">
           Description {{ task.internalSchedulerObject.jobDescription }}
        </div>
        <div class="col">
           interval: {{ task.internalSchedulerObject.interval }}
        </div>
      </div>
      <div
        v-for="(log, index) in data?.schedulerLog"
        :key="index"
        class="log"
      >
        <h2 class="title">
          {{ log.jobKey }}
        </h2>
        <p class="desc">
          {{ log.entries[0]?.jobDescription }}
        </p>
        <button
          v-if="log.entries.length > 10"
          class="more-button"
          @click="toggleExpanded(index)"
        >
          {{ expandedRows[index] ? 'Show less' : 'Show more' }}
        </button>
        <div class="entry-container">
          <div
            v-for="(entry, entryIndex) in log.entries.slice().reverse().slice(0, expandedRows[index] ? log.entries.length : 10).reverse()"
            :key="entryIndex"
            :class="entry.passed ? 'box success' : 'box failure'"
            class="box"
            @mouseenter="hoverEntry = entry"
            @mouseleave="hoverEntry = null"
          >
            <div
              v-if="hoverEntry === entry"
              class="tooltip"
            >
              <p><strong>Description:</strong> {{ entry.jobDescription }}</p>
              <p><strong>Passed:</strong> {{ entry.passed ? 'Yes' : 'No' }}</p>
              <p><strong>Interval:</strong> {{ entry.interval }}</p>
              <p><strong>Output:</strong> {{ entry.output }}</p>
              <p><strong>Date Time:</strong> {{ entry.dateTime }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, useFetch } from '#imports'

type Entry = {
  jobDescription: string;
  passed: boolean;
  interval: string;
  output: string;
  dateTime: string;
};

type Log = {
  jobKey: string;
  entries: Entry[];
};

type SchedulerData = {
  all: string[];
  schedulerLog: Log[];
};

const hoverEntry = ref<Entry | null>(null)
const expandedRows = ref({})

const toggleExpanded = (index) => {
  expandedRows.value[index] = !expandedRows.value[index]
}

const { data } = await useFetch<SchedulerData>('/api/schedule')
</script>
<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #1c1c1c;
  color: #f5f5f5;
}

.dark-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1c1c1c;
}

.container {
  width: calc(100% - 4em);
  margin: 2em;
  background-color: #1c1c1c;
  color: #f5f5f5;
}

.log {
  padding: 1em;
  border: 1px solid #444;
  border-radius: 5px;
  margin-bottom: 1em;
}

.register {
  border: 1px solid #0db92c;
  display: flex;
  justify-content: space-between;
  width: 100%;  /* optional, based on your design requirement */
}

.col {
  flex: 1;
  padding: 5px;  
  border: 1px solid #ccc; 
}

.title {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.5em;
}

.desc {
  color: #ccc;
  margin-bottom: 0.5em;
}

.entry-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
}

.box {
  width: 2em;
  height: 2em;
  border-radius: 4px;
  position: relative;
}

.success {
  background-color: #00b894;
}

.failure {
  background-color: #e17055;
}

.tooltip {
  position: absolute;
  background-color: #f5f5f5;
  color: #000;
  padding: 0.5em;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  margin-top: 0.5em;
  font-size: 0.8em;
  z-index: 10;
}

.more-button {
  background-color: #555;
  color: #fff;
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-start;
  margin-bottom: 0.5em;
}

.logo-top {
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
}
</style>
