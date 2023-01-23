<script setup lang="ts">
import { ref } from "vue";
import type { Task } from "@/interfaces/task";
import { getColors } from "@/composables/card";
import ColorPicker from "@/components/form/ColorPicker.vue";

// Known issue with vue3, ref: https://github.com/vuejs/core/issues/4294
export interface TaskForm extends Task {}

const task = defineProps<TaskForm>();
const emit = defineEmits<{
  (event: "createTask", task: Task): void;
}>();

const createForm = ref<HTMLFormElement>();
const taskTitle = ref<string>(task.title);
const taskDesc = ref<string>(task.description);
const taskColor = ref<string>(task.color || getColors()[0]);
const minLength: number = 3;
const titleRules: any[] = [];
const descRules: any[] = [];

if (minLength) {
  const rule = (val: string) =>
    (val || "").length < minLength
      ? `Title should be more than ${minLength} characters.`
      : true;
  titleRules.push(rule);
}

async function create(): Promise<void> {
  const result: any = await createForm.value?.validate();
  if (result?.valid) {
    emit("createTask", {
      title: taskTitle.value,
      description: taskDesc.value,
      color: taskColor.value,
    });
  }
}
</script>
<template>
  <v-form ref="createForm" lazy-validation>
    <v-text-field
      v-model="taskTitle"
      label="Title"
      variant="outlined"
      :rules="titleRules"
    ></v-text-field>
    <v-textarea
      label="Description"
      v-model="taskDesc"
      variant="outlined"
      :rules="descRules"
    ></v-textarea>
    <ColorPicker v-model="taskColor"></ColorPicker>
    <v-btn color="success" class="me-4" @click="create"> Create </v-btn>
  </v-form>
</template>
