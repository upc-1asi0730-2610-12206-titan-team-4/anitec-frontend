<script setup>
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import useIamStore from "../../application/iam.store.js";

const { t } = useI18n();

const router = useRouter();

const store = useIamStore();

const form = reactive({
  username: "",
  password: "",
});

/**
 * Fills the form with a selected test user.
 * @param {string} username Test username.
 */
const fillDemoUser = (username) => {
  form.username = username;
  form.password = "anitec123";
};

/**
 * Sends the credentials to the IAM store to sign in.
 */
const performSignIn = async () => {
  await store.signIn(form, router);
};
</script>

<template>
  <main class="login-page">
    <section class="login-hero">
      <div class="login-hero-content">
        <span class="section-chip">{{ t("iam.heroChip") }}</span>
        <h1>{{ t("iam.heroTitle") }}</h1>
        <p>{{ t("iam.heroSubtitle") }}</p>
      </div>
    </section>

    <section class="login-card">
      <div>
        <span class="section-chip">{{ t("iam.access") }}</span>
        <h2>{{ t("iam.signIn") }}</h2>
        <p>{{ t("iam.testUsers") }}</p>
      </div>

      <div class="demo-users">
        <button type="button" @click="fillDemoUser('ganadero')">
          <strong>Carlos Mendoza</strong>
          <span>{{ t("iam.username") }}: ganadero</span>
          <small>{{ t("iam.password") }}: anitec123</small>
        </button>
        <button type="button" @click="fillDemoUser('maria')">
          <strong>Maria Gonzales</strong>
          <span>{{ t("iam.username") }}: maria</span>
          <small>{{ t("iam.password") }}: anitec123</small>
        </button>
        <button type="button" @click="fillDemoUser('jose')">
          <strong>Jose Quispe</strong>
          <span>{{ t("iam.username") }}: jose</span>
          <small>{{ t("iam.password") }}: anitec123</small>
        </button>
        <button type="button" @click="fillDemoUser('rosa')">
          <strong>Rosa Huaman</strong>
          <span>{{ t("iam.username") }}: rosa</span>
          <small>{{ t("iam.password") }}: anitec123</small>
        </button>
        <button type="button" @click="fillDemoUser('veterinaria')">
          <strong>Dra. Ana Lopez</strong>
          <span>{{ t("iam.username") }}: veterinaria</span>
          <small>{{ t("iam.password") }}: anitec123</small>
        </button>
        <button type="button" @click="fillDemoUser('vetpedro')">
          <strong>Dr. Pedro Ramirez</strong>
          <span>{{ t("iam.username") }}: vetpedro</span>
          <small>{{ t("iam.password") }}: anitec123</small>
        </button>
        <button type="button" @click="fillDemoUser('vetlucia')">
          <strong>Dra. Lucia Torres</strong>
          <span>{{ t("iam.username") }}: vetlucia</span>
          <small>{{ t("iam.password") }}: anitec123</small>
        </button>
      </div>

      <form class="login-form" @submit.prevent="performSignIn">
        <label>
          {{ t("iam.username") }}
          <pv-input-text
            v-model="form.username"
            autocomplete="username"
            required
          />
        </label>
        <label>
          {{ t("iam.password") }}
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
        <pv-button :label="t('iam.enter')" icon="pi pi-sign-in" type="submit" />
      </form>
    </section>
  </main>
</template>
