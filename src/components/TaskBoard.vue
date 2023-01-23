<script setup lang="ts">
import { ref, onMounted } from "vue";
import TaskForm from "@/components/TaskForm.vue";
import TaskCard from "@/components/TaskCard.vue";
import type { Position, Transform, Task } from "@/interfaces/task";

const props = defineProps<{ tasks: Task[] }>();
const emit = defineEmits<{
  (event: "createTask", task: Task): void;
  (event: "deleteTask", task: Task): void;
}>();
const focusTask = ref<string>("");
const transform = ref<Transform>({ transform: `translate(0px, 0px)` });
const openForm = ref(false);
const board = ref();
let position: Position = { x: 0, y: 0 };
let boardHeight: number = 0;

window.addEventListener("resize", () => {
  boardHeight = board.value.clientHeight || 0;
});

onMounted(() => {
  boardHeight = board.value.clientHeight || 0;
});

function createCard(event: Position) {
  openDialog({ x: event.x, y: event?.y });
}

function openDialog(pos: Position) {
  position.x = pos.x;
  position.y = pos.y;
  openForm.value = true;
  transform.value = {
    transform: `translate(${pos.x}px, ${-(boardHeight - pos.y)}px)`,
  };
}

function closeDialog() {
  openForm.value = false;
}

function createTask(task: Task) {
  task.x = position.x;
  task.y = position.y;
  task.createdBy = localStorage.getItem("username") || "unknown";
  emit("createTask", task);
  closeDialog();
}

function removeTask(task: Task) {
  emit("deleteTask", task);
}

function showCard(task: Task) {
  focusTask.value = task?.id || "";
}
</script>
<template class="board bg-grey-lighten-4">
  <div id="board" @click="createCard" ref="board">
    <TaskCard
      v-for="task in props.tasks"
      :key="task.id"
      :task="task"
      v-model="focusTask"
      @removeTask="removeTask"
      @showCard="showCard"
    />
  </div>
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
        <TaskForm title="" description="" color="" @createTask="createTask" />
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
#board {
  background-color: #eee;
  height: 100vh;
  overflow-x: auto;
  cursor: pointer;
  margin: 0 auto;
  position: relative;
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
