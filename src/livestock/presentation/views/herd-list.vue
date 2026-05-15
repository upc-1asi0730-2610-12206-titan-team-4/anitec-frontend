<script setup>
import { computed, onMounted, toRefs } from "vue";
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
const { herds, errors } = toRefs(store);

/**
 * Returns the farms that the current user should see.
 */
const userHerds = computed(() => {
  if (iam.currentRole === "rancher") {
    return store.getHerdsByOwnerId(iam.currentUserId);
  }

  return herds.value;
});

onMounted(() => {
  if (!store.herds.length) store.fetchHerds();
  if (!store.loaded) store.fetchAnimals();
});

/**
 * Shows the confirmation before deleting a farm.
 * @param {Object} herd Selected farm.
 */
const confirmDelete = (herd) => {
  confirm.require({
    message: t("herds.confirmDelete", { name: herd.name }),
    header: t("common.confirmDelete"),
    icon: "pi pi-exclamation-triangle",
    accept: () => store.deleteHerd(herd),
  });
};
</script>

<template>
  <section class="panel">
    <div class="panel-header">
      <div>
        <span class="section-chip">Livestock BC</span>
        <h2>{{ t("herds.title") }}</h2>
        <p>{{ t("herds.subtitle") }}</p>
      </div>
      <pv-button
        :label="t('herds.new')"
        icon="pi pi-plus"
        @click="router.push({ name: 'livestock-herd-new' })"
      />
    </div>

    <div class="record-card-grid">
      <article v-for="herd in userHerds" :key="herd.id" class="record-card">
        <header>
          <div>
            <span>{{ herd.mainType }}</span>
            <h3>{{ herd.name }}</h3>
          </div>
          <strong>{{ store.getAnimalCountByHerd(herd.id) }} animales</strong>
        </header>

        <dl>
          <div>
            <dt>{{ t("herds.location") }}</dt>
            <dd>{{ herd.location }}</dd>
          </div>
          <div>
            <dt>{{ t("herds.mainType") }}</dt>
            <dd>{{ herd.mainType }}</dd>
          </div>
          <div>
            <dt>{{ t("herds.owner") }}</dt>
            <dd>{{ herd.owner }}</dd>
          </div>
          <div>
            <dt>{{ t("herds.animalCount") }}</dt>
            <dd>{{ store.getAnimalCountByHerd(herd.id) }}</dd>
          </div>
        </dl>

        <footer>
          <pv-button
            :label="t('common.edit')"
            icon="pi pi-pencil"
            outlined
            @click="
              router.push({
                name: 'livestock-herd-edit',
                params: { id: herd.id },
              })
            "
          />
          <pv-button
            :label="t('common.delete')"
            icon="pi pi-trash"
            severity="danger"
            text
            @click="confirmDelete(herd)"
          />
        </footer>
      </article>
    </div>

    <p v-if="!userHerds.length" class="empty-state">
      No hay fincas registradas.
    </p>
    <p v-if="errors.length" class="error-text">{{ t("common.errors") }}</p>
  </section>
</template>
