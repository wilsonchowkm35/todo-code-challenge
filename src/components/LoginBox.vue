<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthService } from "@/machines/auth";

const router = useRouter();
const { state, send } = useAuthService();
const minLength: number = 3;
const username = ref("");
const loginForm = ref<HTMLFormElement>();

if (state.value.value === "loggedIn") {
  router.push("board");
}

watch(state, async (changedState) => {
  if (changedState.value === "loggedIn") {
    router.push("board");
  }
});

const rules: any[] = [];
if (minLength) {
  const rule = (val: string) =>
    (val || "").length < minLength
      ? `Username should be more than ${minLength} characters.`
      : true;
  rules.push(rule);
}

async function login(): Promise<void> {
  const result: any = await loginForm.value?.validate();
  if (result?.valid) {
    localStorage.setItem("username", username.value);
    send({
      type: "USER_LOGGING",
      username: localStorage.getItem("username"),
    });
  }
}
</script>
<template>
  <v-form ref="loginForm" @submit.prevent="login" lazy-validation>
    <v-container>
      <v-row justify="space-between">
        <v-col cols="12" md="12">
          <v-text-field
            v-model="username"
            :rules="rules"
            label="Your Username:"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" class="text-right">
          <v-btn color="success" class="me-4" @click="login"> Join </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
