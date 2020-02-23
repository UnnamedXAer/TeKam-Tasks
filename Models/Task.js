import ImportanceLevels from '../Constants/ImportanceLevels';
export default class Task {
    /**
     *Creates an instance of Task.
     * @param {string} title
     * @param {string} description
     * @param {boolean} isCompleted
     * @param {ImportanceLevels} importance
     * @param {string | undefined} reminderAt
     * @memberof Task
     */
    constructor(
        title,
        description,
        isCompleted,
        importance,
        reminderAt,
        taskDate
    ) {
        this.id = Math.random() + '_' + Math.random()
        this.title = title;
        this.description = description;
        this.isCompleted = isCompleted;
        this.importance = importance;
        this.reminderAt = reminderAt  && reminderAt.toISOString();
        this.taskDate = taskDate  && taskDate.toISOString();
        this.createDate = new Date().toISOString();
        this.completedAt = void 0;
    }
}