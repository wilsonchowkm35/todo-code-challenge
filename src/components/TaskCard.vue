<script setup lang="ts">
import { ref } from "vue";
import type { Task } from "../interfaces/task";
import { formatDate, getBgClass } from "../composables/card";

interface Transform {
  transform: string;
}

const props = defineProps<{ task: Task; modelValue: string }>();

let transform = ref<Transform>({
  transform: `translate(${props.task.x || 0}px, ${props.task.y || 0}px)`,
});

const emit = defineEmits<{
  (event: "removeTask", task: Task): void;
  (event: "showCard", task: Task): void;
}>();

function removeTask(task: Task) {
  emit("removeTask", task);
}

function showCard() {
  emit("showCard", props.task);
}
</script>

<template>
  <div
    class="task-card"
    :class="{ isActive: props.modelValue === props.task.id }"
    :style="transform"
    v-on:click.stop
  >
    <v-card width="300" :class="getBgClass(props.task.color)" @click="showCard">
      <v-toolbar color="rgba(0, 0, 0, 0)">
        <v-toolbar-title class="text-h6 text-white">
          {{ props.task?.title }}
        </v-toolbar-title>
        <template v-slot:append>
          <v-btn
            size="x-small"
            variant="outlined"
            icon="mdi-check"
            color="white"
            @click="removeTask(props.task)"
          ></v-btn>
        </template>
      </v-toolbar>
      <v-card-text>
        <div class="font-weight-normal mb-4">
          <pre>{{ props.task?.description }}</pre>
        </div>
        <div>
          <strong>Created by {{ props.task?.createdBy }}</strong> @{{
            formatDate(props.task?.createdAt)
          }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.task-card {
  position: absolute;
  z-index: 0;
}

.task-card.isActive {
  z-index: 1;
}
</style>
