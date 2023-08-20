<template>
  <div class="dark-background">
    <div class="container">
      <div class="title">Registered Tasks</div>
      <div class="">
        <div class="log" v-for="(task, index) in tasks" :key="index">
          <div class="">key: {{ task.key }}</div>
          <div class="">description: {{ task.jobDescription }}</div>
          <div class="">Interval: {{ task.interval }}</div>
          <div class="">input: {{ task.input ?? 'n/a' }}</div>
          <div class="tasks" v-if="task.matchingLogs.length < 1"> No tasks have run yet</div>
          <div v-else>
            <div class="entry-container tasks">
              <div
                v-for="(entry, entryIndex) in task.matchingLogs.slice().reverse().slice(0, 10).reverse()"
                :key="entryIndex" :class="entry.passed ? 'box success' : 'box failure'" class="box"
                @mouseenter="hoverEntry = entry" @mouseleave="hoverEntry = null">
                <div v-if="hoverEntry === entry" class="tooltip">
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, useFetch } from '#imports'

type ScheduleLogEntry = {
  jobDescription: string;
  passed: boolean;
  interval: string;
  output: string;
  dateTime: string;
};

type tasks = {
  matchingLogs: [] | ScheduleLogEntry[];
  jobDescription: string;
  passed: boolean;
  schedulerKey: string;
  saveOutput: boolean;
  interval: string | undefined;
  input: string | undefined;
  timezone: string | undefined;
  key: string;
}[]


const hoverEntry = ref<ScheduleLogEntry | null>(null)
const { data: tasks } = await useFetch<tasks>('/api/schedule')
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
  overflow-y: scroll;
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

.flex-table {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.row {
  display: flex;
}

.cell {
  flex: 1;
  /* Equal distribution of space among children */
  padding: 5px;
  /* Adjust this value as per your requirements */
  border: 1px solid #ddd;
  /* This gives cell separation; you can remove if you don't need */
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
  width: 200 rem;
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

.tasks {
  margin-top: 20px ;
}
</style>
