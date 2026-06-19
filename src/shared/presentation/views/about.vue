<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <article class="panel readable">
    <span class="section-chip">Titan Team</span>
    <h2>{{ t("about.title") }}</h2>
    <p>{{ t("about.content") }}</p>
    <div class="module-grid">
      <div class="module-card">
        <i class="pi pi-id-card"></i><strong>Livestock</strong
        ><span>{{ t("about.livestock") }}</span>
      </div>
      <div class="module-card">
        <i class="pi pi-heart"></i><strong>Sanitary</strong
        ><span>{{ t("about.sanitary") }}</span>
      </div>
      <div class="module-card">
        <i class="pi pi-wallet"></i><strong>Financial</strong
        ><span>{{ t("about.financial") }}</span>
      </div>
      <div class="module-card">
        <i class="pi pi-chart-line"></i><strong>Analytics</strong
        ><span>{{ t("about.analytics") }}</span>
      </div>
    </div>
  </article>
</template>
