export function initHours() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  document.querySelectorAll('.hours-row').forEach(row => {
    row.classList.remove('bg-accent/20', 'font-semibold');
    if (row.dataset.day === today) {
      row.classList.add('bg-accent/20', 'font-semibold');
    }
  });
}
