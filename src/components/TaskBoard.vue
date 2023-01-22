<script setup lang="ts">
import { ref } from "vue";
import TaskForm from "../components/TaskForm.vue";
import TaskCard from "../components/TaskCard.vue";
import { getColors } from "../composables/card";
import type { Position, Transform, Task } from "../interfaces/task";

const openForm = ref(false);
const transform = ref<Transform>({
  transform: `translate(0px, 0px)`,
});

// sample tasks
const colors = getColors();
const samplePos: Position[] = [
  { x: 91, y: 97 },
  { x: 104, y: 54 },
  { x: 118, y: 561 },
  { x: 122, y: 498 },
  { x: 949, y: 341 },
  { x: 629, y: 145 },
  { x: 427, y: 148 },
  { x: 242, y: 112 },
  { x: 1122, y: 83 },
  { x: 550, y: 300 },
];

const sampleTasks: Task[] = [];
for (let i = 0; i < 10; i++) {
  sampleTasks.push({
    id: i.toString(),
    title: `title ${i + 1}`,
    description: `description ${i + 1}`,
    color: colors[i % colors.length],
    createdBy: "wilsonchow",
    createdAt: new Date().getTime(),
    x: samplePos[i].x,
    y: samplePos[i].y,
  });
}

const tasks = ref<Task[]>(sampleTasks);
const focusTask = ref<string>("");

function createCard(event: Position) {
  console.log(event.x, event.y);
  openDialog({ x: event.x, y: event?.y });
}

function openDialog(pos: Position) {
  openForm.value = true;
  transform.value = {
    transform: `translate(${pos.x}px, ${pos.y}px)`,
  };
}

function closeDialog() {
  openForm.value = false;
}

function createTask(task: Task) {
  console.log("create", task);
}

function removeTask(task: Task) {
  console.log("removeTask", task);
}

function showCard(task: Task) {
  focusTask.value = task?.id || "";
}
</script>
<template>
  <div
    id="popover"
    class="task-form"
    :class="{ isActive: openForm }"
    :style="transform"
  >
    <v-card width="300">
      <v-toolbar color="rgba(0, 0, 0, 0)">
        <v-toolbar-title class="text-h6">Create Task</v-toolbar-title>
        <template v-slot:append>
          <v-btn
            size="x-small"
            variant="outlined"
            icon="mdi-close"
            @click="closeDialog"
          ></v-btn>
        </template>
      </v-toolbar>
      <v-card-text>
        <TaskForm
          title="hello"
          description="world"
          color="red"
          @create="createTask"
        />
      </v-card-text>
    </v-card>
  </div>
  <div id="board" class="board bg-grey-lighten-4" @click="createCard">
    <TaskCard
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      v-model="focusTask"
      @removeTask="removeTask"
      @showCard="showCard"
    />
  </div>
</template>

<style scoped>
#board {
  width: 100vw;
  height: 100vh;
  border: 1px solid #ccc;
  cursor: pointer;
  margin: 0 auto;
}

.task-form {
  position: absolute;
  width: 300px;
  z-index: 5;
  display: none;
}

.isActive {
  display: flex;
}
</style>
