<script setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n();
</script>

<template>
  <article class="panel readable">
    <span class="section-chip">Titan Team</span>
    <h2>{{ t('about.title') }}</h2>
    <p>{{ t('about.content') }}</p>
    <div class="module-grid">
      <div class="module-card"><i class="pi pi-id-card"></i><strong>Livestock</strong><span>Registro, hatos e historial animal.</span></div>
      <div class="module-card"><i class="pi pi-heart"></i><strong>Sanitary</strong><span>Vacunas, visitas y tratamientos.</span></div>
      <div class="module-card"><i class="pi pi-wallet"></i><strong>Financial</strong><span>Ingresos, egresos y rentabilidad.</span></div>
      <div class="module-card"><i class="pi pi-chart-line"></i><strong>Analytics</strong><span>Indicadores y trazabilidad.</span></div>
    </div>
  </article>
</template>
