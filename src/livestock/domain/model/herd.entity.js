/**
 * Represents a rancher's farm or herd.
 */
export class Herd {
    /**
     * Creates a farm with owner, location, and main type.
     * @param {Object} herd Farm data.
     */
    constructor({
        id = null,
        name = "",
        location = "",
        owner = "",
        ownerId = null,
        veterinarianId = null,
        mainType = "Mixto",
    }) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.owner = owner;

        if (ownerId) {
            this.ownerId = Number(ownerId);
        } else {
            this.ownerId = null;
        }

        if (veterinarianId) {
            this.veterinarianId = Number(veterinarianId);
        } else {
            this.veterinarianId = null;
        }

        this.mainType = mainType;
    }
}
