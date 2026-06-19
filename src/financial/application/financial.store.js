import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { FinancialApi } from "../infrastructure/financial-api.js";
import { FinancialRecordAssembler } from "../infrastructure/financial-record.assembler.js";

const api = new FinancialApi();

/**
 * Store that manages financial records and their totals.
 */
const useFinancialStore = defineStore("financial", () => {
    const records = ref([]);

    const errors = ref([]);

    const loaded = ref(false);

    const incomeTotal = computed(() => {
        let total = 0;

        records.value.forEach((record) => {
            if (record.type === "Ingreso") {
                total = total + Number(record.amount);
            }
        });

        return total;
    });

    const expenseTotal = computed(() => {
        let total = 0;

        records.value.forEach((record) => {
            if (record.type === "Egreso") {
                total = total + Number(record.amount);
            }
        });

        return total;
    });

    const balance = computed(() => incomeTotal.value - expenseTotal.value);

    /**
     * Loads financial records from the API.
     * @returns {Promise}
     */
    function fetchRecords() {
        return api
            .getRecords()
            .then((response) => {
                records.value =
                    FinancialRecordAssembler.toEntitiesFromResponse(response);
                loaded.value = true;
            })
            .catch((error) => errors.value.push(error));
    }

    /**
     * Finds a financial record by its identifier.
     * @param {number|string} id Financial record identifier.
     * @returns {Object|null}
     */
    function getRecordById(id) {
        let selectedRecord = null;

        for (let i = 0; i < records.value.length; i++) {
            const record = records.value[i];

            if (Number(record.id) === Number(id)) {
                selectedRecord = record;
            }
        }

        return selectedRecord;
    }

    /**
     * Registers a new financial record.
     * @param {Object} record Record data.
     * @returns {Promise}
     */
    function addRecord(record) {
        return api
            .createRecord(record)
            .then((response) => {
                records.value.push(
                    FinancialRecordAssembler.toEntityFromResource(
                        response.data,
                    ),
                );
                errors.value = [];
                return true;
            })
            .catch((error) => {
                errors.value.push(error);
                return false;
            });
    }

    /**
     * Updates an existing financial record.
     * @param {Object} record Updated record data.
     * @returns {Promise}
     */
    function updateRecord(record) {
        return api
            .updateRecord(record)
            .then((response) => {
                const updated = FinancialRecordAssembler.toEntityFromResource(
                    response.data,
                );

                let index = -1;

                for (let i = 0; i < records.value.length; i++) {
                    const item = records.value[i];

                    if (Number(item.id) === Number(updated.id)) {
                        index = i;
                    }
                }

                if (index !== -1) records.value[index] = updated;
                errors.value = [];
                return true;
            })
            .catch((error) => {
                errors.value.push(error);
                return false;
            });
    }

    /**
     * Deletes a financial record and updates the local list.
     * @param {Object} record Selected record.
     * @returns {Promise}
     */
    function deleteRecord(record) {
        return api
            .deleteRecord(record.id)
            .then(() => {
                const newRecords = [];

                records.value.forEach((item) => {
                    if (Number(item.id) !== Number(record.id)) {
                        newRecords.push(item);
                    }
                });

                records.value = newRecords;
            })
            .catch((error) => errors.value.push(error));
    }

    return {
        records,
        errors,
        loaded,
        incomeTotal,
        expenseTotal,
        balance,
        fetchRecords,
        getRecordById,
        addRecord,
        updateRecord,
        deleteRecord,
    };
});

export default useFinancialStore;
