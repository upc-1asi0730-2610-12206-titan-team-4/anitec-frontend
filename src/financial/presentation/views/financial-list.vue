<script setup>
import { onMounted, toRefs } from "vue";
import { useConfirm } from "primevue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import useFinancialStore from "../../application/financial.store.js";

const { t } = useI18n();

const router = useRouter();

const confirm = useConfirm();

const store = useFinancialStore();
const { records, loaded, errors } = toRefs(store);

onMounted(() => {
  if (!store.loaded) store.fetchRecords();
});

/**
 * Defines the visual color depending on whether the record is income or expense.
 * @param {string} type Record type.
 * @returns {string}
 */
const severityFor = (type) => {
  if (type === "Ingreso") return "success";
  return "danger";
};

/**
 * Shows the confirmation before deleting a financial record.
 * @param {Object} record Selected record.
 */
const confirmDelete = (record) =>
  confirm.require({
    message: t("finance.confirmDelete"),
    header: t("common.confirmDelete"),
    icon: "pi pi-exclamation-triangle",
    accept: () => store.deleteRecord(record),
  });
</script>

<template>
  <div class="panel">
    <div class="panel-header">
      <div>
        <span class="section-chip">Financial BC</span>
        <h2>{{ t("finance.title") }}</h2>
      </div>
      <pv-button
        :label="t('finance.new')"
        icon="pi pi-plus"
        @click="router.push({ name: 'financial-record-new' })"
      />
    </div>
    <section class="metric-grid compact">
      <article class="metric-card">
        <span>Ingresos</span><strong>S/ {{ store.incomeTotal }}</strong>
      </article>
      <article class="metric-card">
        <span>Egresos</span><strong>S/ {{ store.expenseTotal }}</strong>
      </article>
      <article class="metric-card">
        <span>Balance</span><strong>S/ {{ store.balance }}</strong>
      </article>
    </section>
    <pv-data-table
      :value="records"
      :loading="!loaded"
      paginator
      :rows="8"
      striped-rows
    >
      <pv-column field="type" :header="t('finance.type')"
        ><template #body="slotProps"
          ><pv-tag
            :value="slotProps.data.type"
            :severity="severityFor(slotProps.data.type)" /></template
      ></pv-column>
      <pv-column field="category" :header="t('finance.category')" sortable />
      <pv-column field="amount" :header="t('finance.amount')" sortable
        ><template #body="slotProps"
          >S/ {{ slotProps.data.amount }}</template
        ></pv-column
      >
      <pv-column field="date" :header="t('finance.date')" sortable />
      <pv-column field="description" :header="t('finance.description')" />
      <pv-column :header="t('common.actions')">
        <template #body="slotProps">
          <pv-button
            icon="pi pi-pencil"
            rounded
            text
            @click="
              router.push({
                name: 'financial-record-edit',
                params: { id: slotProps.data.id },
              })
            "
          />
          <pv-button
            icon="pi pi-trash"
            rounded
            text
            severity="danger"
            @click="confirmDelete(slotProps.data)"
          />
        </template>
      </pv-column>
    </pv-data-table>
    <p v-if="errors.length" class="error-text">{{ t("common.errors") }}</p>
  </div>
</template>
