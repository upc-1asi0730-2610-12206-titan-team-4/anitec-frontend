<script setup>
import {onMounted, toRefs} from "vue";
import {useConfirm} from "primevue";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import useActivitiesStore from "../../application/activities.store.js";

const {t} = useI18n();

const router = useRouter();

const confirm = useConfirm();

const store = useActivitiesStore();
const {activities, loaded, errors} = toRefs(store);

onMounted(() => { if (!store.loaded) store.fetchActivities(); });

/**
 * Defines the visual color based on the activity priority.
 * @param {string} priority Activity priority.
 * @returns {string}
 */
const severityFor = (priority) => {
  if (priority === 'Alta') return 'danger';
  if (priority === 'Media') return 'warn';
  return 'info';
};

/**
 * Shows the confirmation before deleting an activity.
 * @param {Object} activity Selected activity.
 */
const confirmDelete = (activity) => confirm.require({
  message: t('activities.confirmDelete', {title: activity.title}),
  header: t('common.confirmDelete'),
  icon: 'pi pi-exclamation-triangle',
  accept: () => store.deleteActivity(activity)
});
</script>

<template>
  <div class="panel">
    <div class="panel-header">
      <div><span class="section-chip">Activities BC</span><h2>{{ t('activities.title') }}</h2></div>
      <pv-button :label="t('activities.new')" icon="pi pi-plus" @click="router.push({name:'activity-new'})"/>
    </div>
    <div class="timeline-list">
      <article v-for="activity in activities" :key="activity.id" class="timeline-item">
        <time>{{ activity.date }}</time>
        <div>
          <strong>{{ activity.title }}</strong>
          <span>{{ activity.type }} - {{ activity.status }}</span>
        </div>
        <pv-tag :value="activity.priority" :severity="severityFor(activity.priority)"/>
        <div class="row-actions">
          <pv-button icon="pi pi-pencil" rounded text @click="router.push({name:'activity-edit', params:{id:activity.id}})"/>
          <pv-button icon="pi pi-trash" rounded text severity="danger" @click="confirmDelete(activity)"/>
        </div>
      </article>
    </div>
    <p v-if="!activities.length && loaded" class="empty-state">No hay actividades programadas.</p>
    <p v-if="errors.length" class="error-text">{{ t('common.errors') }}</p>
  </div>
</template>
