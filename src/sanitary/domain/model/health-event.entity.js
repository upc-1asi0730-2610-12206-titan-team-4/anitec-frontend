/**
 * Represents a health record associated with an animal.
 */
export class HealthEvent {

    /**
     * Creates a health record with diagnosis, treatment, and follow-up.
     * @param {Object} healthEvent Health record data.
     */
    constructor({ id = null, animalId = null, type = '', date = '', description = '', veterinarian = '', diagnosis = '', treatment = '', prescription = '', followUp = '', nextDueDate = '' }) {
        this.id = id;

        if (animalId) {
            this.animalId = Number(animalId);
        } else {
            this.animalId = null;
        }

        this.type = type;
        this.date = date;
        this.description = description;
        this.veterinarian = veterinarian;
        this.diagnosis = diagnosis;
        this.treatment = treatment;
        this.prescription = prescription;
        this.followUp = followUp;
        this.nextDueDate = nextDueDate;
    }
}
