/**
 * Represents an activity or reminder inside the calendar.
 */
export class FarmActivity {

    /**
     * Creates an activity with date, priority, and status.
     * @param {Object} activity Activity data.
     */
    constructor({ id = null, ownerId = null, veterinarianId = null, title = '', type = '', date = '', priority = 'Media', status = 'Pendiente' }) {
        this.id = id;
        this.ownerId = ownerId;
        this.veterinarianId = veterinarianId;
        this.title = title;
        this.type = type;
        this.date = date;
        this.priority = priority;
        this.status = status;
    }
}
