<script setup>
import { computed, onMounted, ref, toRefs } from "vue";
import { useConfirm } from "primevue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import useLivestockStore from "../../application/livestock.store.js";
import useIamStore from "../../../iam/application/iam.store.js";

const { t } = useI18n();

const router = useRouter();

const confirm = useConfirm();

const store = useLivestockStore();

const iam = useIamStore();
const { animals, loaded, errors } = toRefs(store);

const searchTerm = ref("");

/**
 * Returns visible animals based on the current user role.
 */
const visibleAnimals = computed(() => {
  if (iam.currentRole === "rancher")
    return store.getAnimalsByOwnerId(iam.currentUserId);
  if (iam.currentRole === "veterinarian")
    return store.getAnimalsByVeterinarianId(iam.currentUserId);
  return animals.value;
});

/**
 * Filters animals by the text entered in the search bar.
 */
const filteredAnimals = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();
  if (!term) return visibleAnimals.value;

  const animalsFound = [];

  visibleAnimals.value.forEach((animal) => {
    const herdName = store.getHerdName(animal.herdId);

    let tag = "";
    let name = "";
    let species = "";
    let breed = "";
    let gender = "";
    let status = "";
    let weight = "";
    let birthDate = "";
    let herd = "";

    if (animal.tag) tag = String(animal.tag).toLowerCase();
    if (animal.name) name = String(animal.name).toLowerCase();
    if (animal.species) species = String(animal.species).toLowerCase();
    if (animal.breed) breed = String(animal.breed).toLowerCase();
    if (animal.gender) gender = String(animal.gender).toLowerCase();
    if (animal.status) status = String(animal.status).toLowerCase();
    if (animal.weight) weight = String(animal.weight).toLowerCase();
    if (animal.birthDate) birthDate = String(animal.birthDate).toLowerCase();
    if (herdName) herd = String(herdName).toLowerCase();

    let matches = false;

    if (tag.includes(term)) matches = true;
    if (name.includes(term)) matches = true;
    if (species.includes(term)) matches = true;
    if (breed.includes(term)) matches = true;
    if (gender.includes(term)) matches = true;
    if (status.includes(term)) matches = true;
    if (weight.includes(term)) matches = true;
    if (birthDate.includes(term)) matches = true;
    if (herd.includes(term)) matches = true;

    if (matches) {
      animalsFound.push(animal);
    }
  });

  return animalsFound;
});

onMounted(() => {
  if (!store.loaded) store.fetchAnimals();
  if (!store.herds.length) store.fetchHerds();
});

/**
 * Shows the confirmation before deleting an animal.
 * @param {Object} animal Selected animal.
 */
const confirmDelete = (animal) => {
  confirm.require({
    message: t("animals.confirmDelete", { name: animal.name }),
    header: t("common.confirmDelete"),
    icon: "pi pi-exclamation-triangle",
    accept: () => store.deleteAnimal(animal),
  });
};

const animalSeverity = (status) => {
  if (status === "Saludable") return "success";
  return "warn";
};

const birthDateText = (birthDate) => {
  if (birthDate) {
    return birthDate;
  }

  return "Sin fecha";
};
</script>

<template>
  <div class="panel">
    <div class="panel-header">
      <div>
        <span class="section-chip">Livestock BC</span>
        <h2>{{ t("animals.title") }}</h2>
      </div>
      <pv-button
        :label="t('animals.new')"
        icon="pi pi-plus"
        @click="router.push({ name: 'livestock-animal-new' })"
      />
    </div>

    <div class="animal-searchbar">
      <span class="p-input-icon-left">
        <i class="pi pi-search"></i>
        <pv-input-text
          v-model="searchTerm"
          placeholder="Buscar por codigo, nombre, animal, raza, finca o estado"
          aria-label="Buscar animal"
        />
      </span>
      <small
        >{{ filteredAnimals.length }} de
        {{ visibleAnimals.length }} animales</small
      >
    </div>

    <div v-if="!loaded" class="empty-state">Cargando animales...</div>

    <div v-else class="animal-directory-grid">
      <article
        v-for="animal in filteredAnimals"
        :key="animal.id"
        class="animal-directory-card"
      >
        <header>
          <div>
            <span>{{ animal.tag }}</span>
            <h3>{{ animal.name }}</h3>
          </div>
          <pv-tag
            :value="animal.status"
            :severity="animalSeverity(animal.status)"
          />
        </header>

        <dl>
          <div>
            <dt>{{ t("animals.species") }}</dt>
            <dd>{{ animal.species }}</dd>
          </div>
          <div>
            <dt>{{ t("animals.breed") }}</dt>
            <dd>{{ animal.breed }}</dd>
          </div>
          <div>
            <dt>{{ t("animals.gender") }}</dt>
            <dd>{{ animal.gender }}</dd>
          </div>
          <div>
            <dt>{{ t("animals.birthDate") }}</dt>
            <dd>{{ birthDateText(animal.birthDate) }}</dd>
          </div>
          <div>
            <dt>{{ t("animals.weight") }}</dt>
            <dd>{{ animal.weight }} kg</dd>
          </div>
          <div>
            <dt>{{ t("animals.herd") }}</dt>
            <dd>{{ store.getHerdName(animal.herdId) }}</dd>
          </div>
        </dl>

        <footer>
          <pv-button
            :label="t('common.edit')"
            icon="pi pi-pencil"
            outlined
            @click="
              router.push({
                name: 'livestock-animal-edit',
                params: { id: animal.id },
              })
            "
          />
          <pv-button
            :label="t('common.delete')"
            icon="pi pi-trash"
            severity="danger"
            text
            @click="confirmDelete(animal)"
          />
        </footer>
      </article>
    </div>

    <p v-if="loaded && !filteredAnimals.length" class="empty-state">
      No se encontraron animales con esa busqueda.
    </p>
    <p v-if="errors.length" class="error-text">{{ t("common.errors") }}</p>
  </div>
</template>
