import { getDate } from "../date";

const ITEM_TYPE = "tasks";

const setTaskActions = (calendar) => {
  calendar.getTask = function getTask(callback) {
    const { day, month, year } = getDate("selected");

    if (day) {
      calendar.checkIfDayExists();
      calendar.selected = calendar.data[year][month][day][ITEM_TYPE];
    } else {
      calendar.selected = calendar.data.daily;
    }

    if (callback)
      return callback(Object.assign([], calendar.selected), ITEM_TYPE);
  };

  calendar.updateTask = function update(position, item, value) {
    if (calendar.selected[position]) calendar.selected[position][item] = value;
  };

  calendar.createTask = function create(text) {
    if (!calendar.selected.length) {
      calendar.selected.push({ text, checked: false });

      calendar.removeMarkFromDays().setDayWithItems();
      return;
    }
    calendar.selected.push({ text, checked: false });
  };

  calendar.deleteTask = function deleteTask(from, to) {
    calendar.selected.splice(from, to);
    if (!calendar.selected.length)
      calendar.removeMarkFromDays().setDayWithItems();
  };
};

export default setTaskActions;
