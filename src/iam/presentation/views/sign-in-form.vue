<script setup>
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import useIamStore from "../../application/iam.store.js";

const { t } = useI18n();

const router = useRouter();

const store = useIamStore();

const showPassword = ref(false);

const form = reactive({
  username: "",
  password: "",
});

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
      <div class="login-card-panel">
        <div class="auth-brand">
          <img src="/AniTecLogo.png" alt="AniTec" />
          <div>
            <strong>AniTec</strong>
            <span>{{ t("iam.access") }}</span>
          </div>
        </div>

        <div class="auth-title">
        <span class="section-chip">{{ t("iam.access") }}</span>
        <h2>{{ t("iam.signIn") }}</h2>
        <p>{{ t("iam.signInSubtitle") }}</p>
      </div>

        <div class="auth-role-badges">
          <span>{{ t("iam.rancherAccount") }}</span>
          <span>{{ t("iam.veterinarianAccount") }}</span>
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
          <span class="password-field">
            <pv-input-text
              v-model="form.password"
              autocomplete="current-password"
              :type="showPassword ? 'text' : 'password'"
              required
            />
            <button
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? t("iam.hidePassword") : t("iam.showPassword") }}
            </button>
          </span>
        </label>
        <p v-if="store.errors.length" class="error-text">
          {{ store.errors[0].message }}
        </p>
        <pv-button :label="t('iam.enter')" icon="pi pi-sign-in" type="submit" />
      </form>

      <p class="auth-link">
        {{ t("iam.noAccount") }}
        <button type="button" @click="router.push({ name: 'iam-sign-up' })">
          {{ t("iam.createAccount") }}
        </button>
      </p>
      </div>
    </section>
  </main>
</template>
