<script setup lang="ts">
import LoginBox from "@/components/LoginBox.vue";
const title: string = "Join the board!";
</script>

<template>
  <div
    class="d-flex flex-column justify-center align-center full-height bg-lightgrey-lighten-1"
  >
    <div class="login-box">
      <h1 class="text-h4 font-weight-thin mb-4">{{ title }}</h1>
      <LoginBox />
    </div>
  </div>
</template>

<style scoped>
.bg-lightgrey-lighten-1 {
  background-color: #ccc;
}

.full-height {
  height: 100vh;
}

.login-box {
  background-color: white;
  width: 60%;
  min-width: 350px;
  padding: 20px;
}
</style>
