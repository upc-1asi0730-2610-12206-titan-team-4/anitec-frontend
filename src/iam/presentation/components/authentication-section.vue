<script setup>
import {useRouter} from "vue-router";
import useIamStore from "../../application/iam.store.js";

const router = useRouter();

const store = useIamStore();

const roleLabel = () => {
  if (store.currentRole === 'rancher') return 'Ganadero';
  return 'Veterinario';
};
</script>

<template>
  <div class="auth-section" v-if="store.isSignedIn">
    <div>
      <strong>{{ store.currentFullName }}</strong>
      <span>{{ roleLabel() }}</span>
    </div>
    <pv-button label="Salir" icon="pi pi-sign-out" text @click="store.signOut(router)"/>
  </div>
</template>
