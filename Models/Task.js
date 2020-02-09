import ImportanceLevels from '../Constants/ImportanceLevels';
export default class Task {
    /**
     *Creates an instance of Task.
     * @param {string} title
     * @param {string} description
     * @param {boolean} isCompleted
     * @param {ImportanceLevels} importance
     * @param {Date} reminderAt
     * @memberof Task
     */
    constructor(
        title,
        description,
        isCompleted,
        importance,
        reminderAt
    ) {
        this.title = title;
        this.description = description;
        this.isCompleted = isCompleted;
        this.importance = importance;
        this.reminderAt = reminderAt;
    }
}