<script setup>
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import {Herd} from "../../domain/model/herd.entity.js";
import useLivestockStore from "../../application/livestock.store.js";
import useIamStore from "../../../iam/application/iam.store.js";

const {t} = useI18n();

const route = useRoute();

const router = useRouter();

const store = useLivestockStore();

const iam = useIamStore();

const isEdit = computed(() => {
  if (route.params.id) {
    return true;
  }

  return false;
});

const mainTypeOptions = ['Bovino', 'Ovino', 'Caprino', 'Porcino', 'Aves', 'Mixto', 'Otro'];

let owner = '';
let ownerId = null;
let veterinarianId = null;

if (iam.currentFullName) owner = iam.currentFullName;
if (iam.currentUserId) ownerId = iam.currentUserId;
if (iam.currentUser) veterinarianId = iam.currentUser.veterinarianId;

const form = ref({name: '', location: '', owner, ownerId, veterinarianId, mainType: 'Mixto'});

onMounted(async () => {
  if (!store.herds.length) await store.fetchHerds();
  if (isEdit.value) {

    const herd = store.getHerdById(route.params.id);
    if (herd) {
      form.value.name = herd.name;
      form.value.location = herd.location;
      form.value.owner = herd.owner;
      form.value.ownerId = herd.ownerId;
      form.value.veterinarianId = herd.veterinarianId;
      form.value.mainType = herd.mainType;
    } else {
      router.push({name: 'livestock-herds'});
    }
  }
});

/**
 * Saves the farm from the form, creating a new one or updating the existing one.
 * @returns {Promise<void>}
 */
const save = async () => {

  let id = null;
  if (isEdit.value) id = route.params.id;

  const herd = new Herd({
    id,
    name: form.value.name,
    location: form.value.location,
    owner: form.value.owner,
    ownerId: form.value.ownerId,
    veterinarianId: form.value.veterinarianId,
    mainType: form.value.mainType
  });
  if (isEdit.value) await store.updateHerd(herd); else await store.addHerd(herd);
  router.push({name: 'livestock-herds'});
};

const formTitle = computed(() => {
  if (isEdit.value) return t('herds.editTitle');
  return t('herds.newTitle');
});
</script>

<template>
  <form class="panel form-grid friendly-form" @submit.prevent="save">
    <div class="form-hero full">
      <i class="pi pi-map-marker"></i>
      <div>
        <span class="section-chip">Livestock BC</span>
        <h2>{{ formTitle }}</h2>
        <p>Registra la finca para separar animales, actividades sanitarias y analiticas por ubicacion.</p>
      </div>
    </div>
    <label>{{ t('herds.name') }}<pv-input-text v-model="form.name" placeholder="Ej. Finca Santa Rosa" required/></label>
    <label>{{ t('herds.location') }}<pv-input-text v-model="form.location" placeholder="Distrito, provincia o referencia" required/></label>
    <label>{{ t('herds.mainType') }}<pv-select v-model="form.mainType" :options="mainTypeOptions" editable required/></label>
    <label>{{ t('herds.owner') }}<pv-input-text v-model="form.owner" placeholder="Responsable principal" required/></label>
    <div class="form-actions friendly-actions full">
      <pv-button :label="t('common.save')" icon="pi pi-save" type="submit"/>
      <pv-button :label="t('common.cancel')" severity="secondary" outlined @click="router.push({name: 'livestock-herds'})"/>
    </div>
  </form>
</template>
