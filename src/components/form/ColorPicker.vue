<script setup lang="ts">
import { ref } from "vue";
import { getBgClass, getColors } from "../../composables/card";

const props = defineProps<{ modelValue: string }>();
const colors: string[] = getColors();
let selectedColor = ref(props.modelValue || colors[0]);

const emit = defineEmits<{
  (event: "update:modelValue", color: string): void;
}>();

function selectColor(color: string) {
  selectedColor.value = color;
  emit("update:modelValue", selectedColor.value);
}
</script>

<template>
  <ul class="color-list">
    <li
      v-for="(color, key) in colors"
      :key="key"
      :class="[getBgClass(color), selectedColor === color ? 'selected' : '']"
      @click="selectColor(color)"
    ></li>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.color-list li {
  width: 30px;
  height: 30px;
  cursor: pointer;
  list-style-type: none;
  margin-right: 10px;
}

.color-list li.selected {
  border: 1px solid #000;
}
</style>
