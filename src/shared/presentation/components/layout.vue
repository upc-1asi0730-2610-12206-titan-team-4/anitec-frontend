<script setup>
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import {useI18n} from "vue-i18n";
import LanguageSwitcher from "./language-switcher.vue";
import AuthenticationSection from "../../../iam/presentation/components/authentication-section.vue";
import useIamStore from "../../../iam/application/iam.store.js";

const {t} = useI18n();

const route = useRoute();

const drawer = ref(false);

const iamStore = useIamStore();

const rancherItems = [
  {label: 'option.rancherDashboard', to: '/rancher/dashboard', icon: 'pi pi-warehouse'},
  {label: 'option.herds', to: '/livestock/herds', icon: 'pi pi-map-marker'},
  {label: 'option.animals', to: '/livestock/animals', icon: 'pi pi-id-card'},
  {label: 'option.health', to: '/sanitary/health-events', icon: 'pi pi-heart'},
  {label: 'option.activities', to: '/activities/calendar', icon: 'pi pi-calendar'},
  {label: 'option.finance', to: '/financial/records', icon: 'pi pi-wallet'},
  {label: 'option.analytics', to: '/analytics/dashboard', icon: 'pi pi-chart-line'}
];

const veterinarianItems = [
  {label: 'option.veterinarianDashboard', to: '/veterinarian/dashboard', icon: 'pi pi-briefcase'},
  {label: 'option.clients', to: '/veterinary/clients', icon: 'pi pi-users'},
  {label: 'option.patients', to: '/veterinary/patients', icon: 'pi pi-id-card'},
  {label: 'option.health', to: '/sanitary/health-events', icon: 'pi pi-heart'},
  {label: 'option.activities', to: '/activities/calendar', icon: 'pi pi-calendar'},
  {label: 'option.analytics', to: '/analytics/dashboard', icon: 'pi pi-chart-line'}
];

const navItems = computed(() => {
  if (iamStore.currentRole === 'rancher') return rancherItems;
  if (iamStore.currentRole === 'veterinarian') return veterinarianItems;
  return [];
});

const activeTitle = computed(() => {
  if (route.meta.title) {
    return route.meta.title;
  }

  return 'AniTec';
});

const isActive = (to) => {
  if (route.path === to) {
    return true;
  }

  if (route.path.startsWith(`${to}/`)) {
    return true;
  }

  return false;
};

const showShell = computed(() => !route.path.startsWith('/iam'));

const homePath = computed(() => {
  if (iamStore.currentRole === 'veterinarian') return '/veterinarian/dashboard';
  return '/rancher/dashboard';
});
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <router-view v-if="!showShell"/>
  <div v-else class="app-shell">
    <aside class="sidebar">
      <router-link :to="homePath" class="brand">
        <span class="brand-mark">A</span>
        <span>
          <strong>{{ t('app.name') }}</strong>
          <small>{{ t('app.tagline') }}</small>
        </span>
      </router-link>

      <nav class="side-nav">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="['nav-link', {active: isActive(item.to)}]">
          <i :class="item.icon"></i>
          <span>{{ t(item.label) }}</span>
        </router-link>
      </nav>
    </aside>

    <main class="workspace">
      <header class="topbar">
        <div>
          <p class="eyebrow">AniTec Web App</p>
          <h1>{{ activeTitle }}</h1>
        </div>
        <div class="topbar-actions">
          <language-switcher/>
          <authentication-section/>
          <pv-button icon="pi pi-bars" rounded text class="mobile-menu-button" @click="drawer = true"/>
        </div>
      </header>

      <section class="content-surface">
        <router-view/>
      </section>
    </main>

    <pv-drawer v-model:visible="drawer" header="AniTec">
      <nav class="drawer-nav">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          @click="drawer = false">
          <i :class="item.icon"></i>
          <span>{{ t(item.label) }}</span>
        </router-link>
      </nav>
    </pv-drawer>
  </div>
</template>
