/**
 * Represents an animal registered inside a farm or herd.
 */
export class Animal {
    /**
     * Creates an animal with its main data and converts numeric values when needed.
     * @param {Object} animal Animal data.
     */
    constructor({
        id = null,
        tag = "",
        name = "",
        species = "Bovino",
        breed = "",
        gender = "",
        birthDate = "",
        weight = 0,
        status = "Saludable",
        herdId = null,
    }) {
        this.id = id;
        this.tag = tag;
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.gender = gender;
        this.birthDate = birthDate;
        this.weight = Number(weight);
        this.status = status;

        if (herdId) {
            this.herdId = Number(herdId);
        } else {
            this.herdId = null;
        }
    }
}
