<script setup>
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import {Animal} from "../../domain/model/animal.entity.js";
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

const speciesOptions = ['Bovino', 'Ovino', 'Caprino', 'Porcino', 'Equino', 'Pollo', 'Pato', 'Gallina', 'Pavo', 'Cuy', 'Otro'];

const genderOptions = ['Hembra', 'Macho', 'Mixto'];

const statusOptions = ['Saludable', 'Observacion', 'En tratamiento'];

const form = ref({tag: '', name: '', species: 'Bovino', breed: '', gender: 'Hembra', birthDate: '', weight: 0, status: 'Saludable', herdId: null});

const herdOptions = computed(() => {
  if (iam.currentRole === 'rancher') {
    return store.getHerdsByOwnerId(iam.currentUserId);
  }

  return store.herds;
});

onMounted(async () => {
  if (!store.herds.length) await store.fetchHerds();
  if (!store.loaded) await store.fetchAnimals();
  if (isEdit.value) {

    const animal = store.getAnimalById(route.params.id);
    if (animal) {
      form.value.tag = animal.tag;
      form.value.name = animal.name;
      form.value.species = animal.species;
      form.value.breed = animal.breed;
      form.value.gender = animal.gender;
      form.value.birthDate = animal.birthDate;
      form.value.weight = animal.weight;
      form.value.status = animal.status;
      form.value.herdId = animal.herdId;
    } else {
      router.push({name: 'livestock-animals'});
    }
  } else {
    if (herdOptions.value[0]) {
      form.value.herdId = herdOptions.value[0].id;
    } else {
      form.value.herdId = null;
    }
  }
});

/**
 * Saves the animal from the form, creating a new one or updating the existing one.
 * @returns {Promise<void>}
 */
const save = async () => {

  let id = null;
  if (isEdit.value) id = route.params.id;

  const animal = new Animal({
    id,
    tag: form.value.tag,
    name: form.value.name,
    species: form.value.species,
    breed: form.value.breed,
    gender: form.value.gender,
    birthDate: form.value.birthDate,
    weight: form.value.weight,
    status: form.value.status,
    herdId: form.value.herdId
  });
  if (isEdit.value) await store.updateAnimal(animal); else await store.addAnimal(animal);
  router.push({name: 'livestock-animals'});
};

const formTitle = computed(() => {
  if (isEdit.value) return t('animals.editTitle');
  return t('animals.newTitle');
});
</script>

<template>
  <form class="panel form-grid friendly-form" @submit.prevent="save">
    <div class="form-hero full">
      <i class="pi pi-id-card"></i>
      <div>
        <span class="section-chip">Livestock BC</span>
        <h2>{{ formTitle }}</h2>
        <p>Completa la ficha basica para identificar al animal dentro de su finca o hato.</p>
      </div>
    </div>
    <label>{{ t('animals.tag') }}<pv-input-text v-model="form.tag" placeholder="Ej. BOV-2026-034" required/></label>
    <label>{{ t('animals.name') }}<pv-input-text v-model="form.name" placeholder="Nombre o identificador corto" required/></label>
    <label>{{ t('animals.species') }}<pv-select v-model="form.species" :options="speciesOptions" editable required/></label>
    <label>{{ t('animals.breed') }}<pv-input-text v-model="form.breed" placeholder="Ej. Holstein, Pekin, Hampshire" required/></label>
    <label>{{ t('animals.gender') }}<pv-select v-model="form.gender" :options="genderOptions"/></label>
    <label>{{ t('animals.birthDate') }}<pv-input-text v-model="form.birthDate" type="date"/></label>
    <label>{{ t('animals.weight') }}<pv-input-number v-model="form.weight" :min="0"/></label>
    <label>{{ t('animals.status') }}<pv-select v-model="form.status" :options="statusOptions"/></label>
    <label>{{ t('animals.herd') }}<pv-select v-model="form.herdId" :options="herdOptions" option-label="name" option-value="id"/></label>
    <div class="form-actions friendly-actions full">
      <pv-button :label="t('common.save')" icon="pi pi-save" type="submit"/>
      <pv-button :label="t('common.cancel')" severity="secondary" outlined @click="router.push({name: 'livestock-animals'})"/>
    </div>
  </form>
</template>
