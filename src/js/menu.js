export function initMenu() {
  const tabs = document.querySelectorAll('.menu-tabs [role="tab"]');
  const cards = document.querySelectorAll('.menu-card');

  function selectTab(activeTab) {
    const cat = activeTab.dataset.category;

    // Filter cards
    cards.forEach(card => {
      card.hidden = (cat !== 'all' && card.dataset.category !== cat);
    });

    // Update aria-selected and visual state on all tabs
    tabs.forEach(t => {
      const isActive = t === activeTab;
      t.setAttribute('aria-selected', String(isActive));
      if (isActive) {
        t.classList.remove('bg-gray-100', 'text-gray-700');
        t.classList.add('bg-primary', 'text-white');
      } else {
        t.classList.remove('bg-primary', 'text-white');
        t.classList.add('bg-gray-100', 'text-gray-700');
      }
    });
  }

  // On load: auto-select the "coffee" tab
  const defaultTab = Array.from(tabs).find(t => t.dataset.category === 'coffee') || tabs[0];
  if (defaultTab) selectTab(defaultTab);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      selectTab(tab);
    });
  });
}
