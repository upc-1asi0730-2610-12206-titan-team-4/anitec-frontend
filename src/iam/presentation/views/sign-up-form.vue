<script setup>
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import useIamStore from "../../application/iam.store.js";

const { t } = useI18n();

const router = useRouter();

const store = useIamStore();

const localError = ref("");

const showPassword = ref(false);

const showConfirmPassword = ref(false);

const form = reactive({
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  role: "Rancher",
});

const passwordsDoNotMatch = computed(() => {
  if (!form.confirmPassword) return false;
  return form.password !== form.confirmPassword;
});

const performSignUp = async () => {
  localError.value = "";

  if (passwordsDoNotMatch.value) {
    localError.value = t("iam.passwordsDoNotMatch");
    return;
  }

  await store.signUp(
    {
      fullName: form.fullName,
      username: form.username,
      password: form.password,
      role: form.role,
    },
    router,
  );
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
        <h2>{{ t("iam.signUp") }}</h2>
        <p>{{ t("iam.signUpSubtitle") }}</p>
      </div>

        <div class="auth-role-badges">
          <span>{{ t("iam.rancherAccount") }}</span>
          <span>{{ t("iam.veterinarianAccount") }}</span>
        </div>

      <form class="login-form" @submit.prevent="performSignUp">
        <label>
          {{ t("iam.fullName") }}
          <pv-input-text
            v-model="form.fullName"
            autocomplete="name"
            required
          />
        </label>
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
              autocomplete="new-password"
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
        <label>
          {{ t("iam.confirmPassword") }}
          <span class="password-field">
            <pv-input-text
              v-model="form.confirmPassword"
              autocomplete="new-password"
              :type="showConfirmPassword ? 'text' : 'password'"
              required
            />
            <button
              type="button"
              class="password-toggle"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              {{
                showConfirmPassword
                  ? t("iam.hidePassword")
                  : t("iam.showPassword")
              }}
            </button>
          </span>
          <small v-if="passwordsDoNotMatch" class="field-error">
            {{ t("iam.passwordsDoNotMatch") }}
          </small>
        </label>
        <label>
          {{ t("iam.role") }}
          <select v-model="form.role" class="role-select" required>
            <option value="Rancher">{{ t("iam.rancher") }}</option>
            <option value="Veterinarian">{{ t("iam.veterinarian") }}</option>
          </select>
        </label>
        <p v-if="localError" class="error-text">{{ localError }}</p>
        <p v-else-if="store.errors.length" class="error-text">
          {{ store.errors[0].message }}
        </p>
        <pv-button
          :label="t('iam.createAccount')"
          icon="pi pi-user-plus"
          type="submit"
        />
      </form>

      <p class="auth-link">
        {{ t("iam.alreadyAccount") }}
        <button type="button" @click="router.push({ name: 'iam-sign-in' })">
          {{ t("iam.backToSignIn") }}
        </button>
      </p>
      </div>
    </section>
  </main>
</template>
