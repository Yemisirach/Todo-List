export default function clear() {
  (tasks) => tasks.filter((task) => !task.completed);
}
