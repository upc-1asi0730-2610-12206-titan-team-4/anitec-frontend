/**
 * Represents a rancher's financial record.
 */
export class FinancialRecord {
    /**
     * Creates an income or expense record and converts the amount to a number.
     * @param {Object} record Financial record data.
     */
    constructor({
        id = null,
        ownerId = null,
        type = "Ingreso",
        category = "",
        amount = 0,
        date = "",
        description = "",
    }) {
        this.id = id;
        this.ownerId = ownerId;
        this.type = type;
        this.category = category;
        this.amount = Number(amount);
        this.date = date;
        this.description = description;
    }
}
