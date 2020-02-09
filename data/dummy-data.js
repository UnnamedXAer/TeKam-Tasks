import Task from '../Models/Task';
import ImportanceLevel from '../Constants/ImportanceLevels';
export const myTasks = [
    new Task(
        'Finish TeKam Tasks app, Finish TeKam Tasks app, Finish TeKam Tasks app, Finish TeKam Tasks app',
        'Make app working (minimal viable product)',
        false,
        ImportanceLevel.IMPORTANT,
        new Date(2020, 1, 9, 19, 20, 0, 0)
    ),
    new Task(
        'React native styling. width: percentage - number',
        'You set the flexDirection of the formRow to row, and then the first child (the holder View for your AutoComplete component to flex: 1. This makes it fill all available space. The next child View is your icon holder. Which you can set to whatever value you want (in this case 50).',
        false,
        ImportanceLevel.IMPORTANT,
        new Date(2020, 1, 10, 21, 20, 0, 0)
    ),
    new Task(
        'Create Tasks List',
        'Display a list of tasks',
        false,
        ImportanceLevel.IMPORTANT,
        new Date(2020, 1, 9, 14, 40, 0, 0)
    ),
    new Task(
        'Create Completed Tasks List',
        'Display Completed Tasks List',
        false,
        ImportanceLevel.NORMAL,
        new Date(2020, 1, 9, 16, 20, 0, 0)
    ),
    new Task(
        'Create "New Task" Form',
        'Prepare form that allows to enter new task',
        false,
        ImportanceLevel.NORMAL,
        new Date(2020, 1, 9, 17, 25, 0, 0)
    ),
    new Task(
        'Take a shower',
        '',
        true,
        ImportanceLevel.NORMAL,
        new Date(2020, 1, 9, 17, 25, 0, 0)
    ),
    new Task(
        'Add more elements to dummy data',
        'There is need for more compled tasks in dummy data :)',
        true,
        ImportanceLevel.IMPORTANT,
        new Date(2020, 1, 9, 17, 25, 0, 0)
    ),
    new Task(
        'Make Dinner',
        'Prepare a lunch boxes for next days',
        false,
        ImportanceLevel.IMPORTANT,
        new Date(2020, 1, 9, 13, 0, 0, 0)
    ),
    new Task(
        'Take Out Laundry',
        'Make app working (minimal viable product)',
        true,
        ImportanceLevel.IMPORTANT,
        new Date(2020, 1, 9, 12, 38, 0, 0)
    ),
    new Task(
        'Clear PC',
        'Clean PC of dust',
        false,
        ImportanceLevel.NOT_IMPORTANT,
        new Date(2020, 1, 10, 16, 10, 0, 0)
    ),
    new Task(
        'Make Dummy Task List',
        'Prepare a dummy ToDo list for development purpose.',
        true,
        ImportanceLevel.IMPORTANT
    ),
].map(x => {
    if (x.isCompleted)  {
        x.completedAt = new Date().toISOString();
    } 
    return x;
})