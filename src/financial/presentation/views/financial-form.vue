<script setup>
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import {FinancialRecord} from "../../domain/model/financial-record.entity.js";
import useFinancialStore from "../../application/financial.store.js";
import useIamStore from "../../../iam/application/iam.store.js";

const {t} = useI18n();

const route = useRoute();

const router = useRouter();

const store = useFinancialStore();

const iam = useIamStore();

const isEdit = computed(() => {
  if (route.params.id) {
    return true;
  }

  return false;
});

const typeOptions = ['Ingreso', 'Egreso'];

const categoryOptions = ['Venta de leche', 'Venta de ganado', 'Alimento', 'Veterinaria', 'Transporte', 'Otros'];

const form = ref({ownerId: iam.currentUserId, type: 'Ingreso', category: '', amount: 0, date: '', description: ''});

onMounted(async () => {
  if (!store.loaded) await store.fetchRecords();
  if (isEdit.value) {

    const record = store.getRecordById(route.params.id);
    if (record) {
      form.value.ownerId = record.ownerId;
      form.value.type = record.type;
      form.value.category = record.category;
      form.value.amount = record.amount;
      form.value.date = record.date;
      form.value.description = record.description;
    } else {
      router.push({name: 'financial-records'});
    }
  }
});

/**
 * Saves the financial record from the form.
 * @returns {Promise<void>}
 */
const save = async () => {

  let id = null;
  if (isEdit.value) id = route.params.id;

  const record = new FinancialRecord({
    id,
    ownerId: form.value.ownerId,
    type: form.value.type,
    category: form.value.category,
    amount: form.value.amount,
    date: form.value.date,
    description: form.value.description
  });
  if (isEdit.value) await store.updateRecord(record); else await store.addRecord(record);
  router.push({name: 'financial-records'});
};

const formTitle = computed(() => {
  if (isEdit.value) return t('finance.editTitle');
  return t('finance.newTitle');
});
</script>

<template>
  <form class="panel form-grid friendly-form" @submit.prevent="save">
    <div class="form-hero full">
      <i class="pi pi-wallet"></i>
      <div>
        <span class="section-chip">Financial BC</span>
        <h2>{{ formTitle }}</h2>
        <p>Registra ingresos o egresos para mantener el balance de la produccion actualizado.</p>
      </div>
    </div>
    <label>{{ t('finance.type') }}<pv-select v-model="form.type" :options="typeOptions"/></label>
    <label>{{ t('finance.category') }}<pv-select v-model="form.category" :options="categoryOptions" editable required/></label>
    <label>{{ t('finance.amount') }}<pv-input-number v-model="form.amount" :min="0" mode="currency" currency="PEN" locale="es-PE"/></label>
    <label>{{ t('finance.date') }}<pv-input-text v-model="form.date" type="date" required/></label>
    <label class="full">{{ t('finance.description') }}<pv-textarea v-model="form.description" rows="4" placeholder="Detalle del movimiento, comprobante o motivo"/></label>
    <div class="form-actions friendly-actions full">
      <pv-button :label="t('common.save')" icon="pi pi-save" type="submit"/>
      <pv-button :label="t('common.cancel')" severity="secondary" outlined @click="router.push({name:'financial-records'})"/>
    </div>
  </form>
</template>
