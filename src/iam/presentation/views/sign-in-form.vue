<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import useIamStore from "../../application/iam.store.js";

const router = useRouter();

const store = useIamStore();

const form = reactive({
  username: "",
  password: "",
});

/**
 * Fills the form with a selected demo user.
 * @param {string} username Demo username.
 */
const fillDemoUser = (username) => {
  form.username = username;
  form.password = "anitec123";
};

/**
 * Sends the credentials to the IAM store to sign in.
 */
const performSignIn = () => {
  store.signIn(form, router);
};
</script>

<template>
  <main class="login-page">
    <section class="login-hero">
      <div>
        <span class="section-chip">AniTec Web App</span>
        <h1>Smart livestock management</h1>
        <p>
          Sign in as a rancher or veterinarian to see an experience adapted to
          your responsibilities.
        </p>
      </div>
    </section>

    <section class="login-card">
      <div>
        <span class="section-chip">Access</span>
        <h2>Sign in</h2>
        <p>Demo users:</p>
      </div>

      <div class="demo-users">
        <button type="button" @click="fillDemoUser('ganadero')">
          <strong>Carlos Mendoza</strong>
          <span>username: ganadero</span>
          <small>password: anitec123</small>
        </button>
        <button type="button" @click="fillDemoUser('maria')">
          <strong>Maria Gonzales</strong>
          <span>username: maria</span>
          <small>password: anitec123</small>
        </button>
        <button type="button" @click="fillDemoUser('jose')">
          <strong>Jose Quispe</strong>
          <span>username: jose</span>
          <small>password: anitec123</small>
        </button>
        <button type="button" @click="fillDemoUser('rosa')">
          <strong>Rosa Huaman</strong>
          <span>username: rosa</span>
          <small>password: anitec123</small>
        </button>
        <button type="button" @click="fillDemoUser('veterinaria')">
          <strong>Dra. Ana Lopez</strong>
          <span>username: veterinaria</span>
          <small>password: anitec123</small>
        </button>
        <button type="button" @click="fillDemoUser('vetpedro')">
          <strong>Dr. Pedro Ramirez</strong>
          <span>username: vetpedro</span>
          <small>password: anitec123</small>
        </button>
        <button type="button" @click="fillDemoUser('vetlucia')">
          <strong>Dra. Lucia Torres</strong>
          <span>username: vetlucia</span>
          <small>password: anitec123</small>
        </button>
      </div>

      <form class="login-form" @submit.prevent="performSignIn">
        <label>
          Username
          <pv-input-text
            v-model="form.username"
            autocomplete="username"
            required
          />
        </label>
        <label>
          Password
          <pv-input-text
            v-model="form.password"
            autocomplete="current-password"
            type="password"
            required
          />
        </label>
        <p v-if="store.errors.length" class="error-text">
          {{ store.errors[0].message }}
        </p>
        <pv-button label="Enter AniTec" icon="pi pi-sign-in" type="submit" />
      </form>
    </section>
  </main>
</template>
