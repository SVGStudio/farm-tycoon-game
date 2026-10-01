const SAVE_KEY = 'farm-tycoon-save-v1';
const MAX_PLOTS = 12;

const animalConfig = {
  chicken: {
    key: 'chicken',
    label: 'Poules',
    baseCost: 12,
    baseIncome: 1,
    icon: '🐔',
    xp: 8,
    building: 'coop'
  },
  cow: {
    key: 'cow',
    label: 'Vaches',
    baseCost: 80,
    baseIncome: 8,
    icon: '🐄',
    xp: 18,
    building: 'barn'
  },
  pig: {
    key: 'pig',
    label: 'Cochons',
    baseCost: 180,
    baseIncome: 18,
    icon: '🐖',
    xp: 28,
    building: 'pigsty'
  },
  sheep: {
    key: 'sheep',
    label: 'Moutons',
    baseCost: 360,
    baseIncome: 36,
    icon: '🐑',
    xp: 38,
    building: 'sheepfold'
  }
};

const buildingConfig = {
  coop: {
    key: 'coop',
    label: 'Poulailler',
    baseCost: 60,
    bonus: 0.25,
    icon: '🏡',
    xp: 18
  },
  barn: {
    key: 'barn',
    label: 'Étable',
    baseCost: 220,
    bonus: 0.35,
    icon: '🏠',
    xp: 28
  },
  pigsty: {
    key: 'pigsty',
    label: 'Porcherie',
    baseCost: 500,
    bonus: 0.45,
    icon: '🏗️',
    xp: 40
  },
  sheepfold: {
    key: 'sheepfold',
    label: 'Bergerie',
    baseCost: 900,
    bonus: 0.6,
    icon: '🛖',
    xp: 55
  },
  silo: {
    key: 'silo',
    label: 'Silo',
    baseCost: 1800,
    bonus: 0.8,
    icon: '🌾',
    xp: 70
  },
  workshop: {
    key: 'workshop',
    label: 'Atelier',
    baseCost: 3200,
    bonus: 1,
    icon: '🔧',
    xp: 90
  }
};

const objectiveTemplates = [
  { id: 'firstAnimal', text: 'Avoir 1 poule', check: (state) => state.animals.chicken >= 1 },
  { id: 'fiveBirds', text: 'Avoir 5 poules', check: (state) => state.animals.chicken >= 5 },
  { id: 'threeCows', text: 'Avoir 3 vaches', check: (state) => state.animals.cow >= 3 },
  { id: 'level3', text: 'Atteindre le niveau 3', check: (state) => state.level >= 3 },
  { id: 'buildings2', text: 'Acheter 2 bâtiments', check: (state) => getTotalBuildings(state) >= 2 },
  { id: 'income100', text: 'Avoir 100 € de revenu par seconde', check: (state) => state.incomePerSecond >= 100 },
  { id: 'allAnimals', text: 'Avoir au moins une poule, une vache, un cochon et un mouton', check: (state) => state.animals.chicken >= 1 && state.animals.cow >= 1 && state.animals.pig >= 1 && state.animals.sheep >= 1 },
  { id: 'level5', text: 'Atteindre le niveau 5', check: (state) => state.level >= 5 }
];

const defaultState = () => ({
  money: 30,
  level: 1,
  xp: 0,
  nextLevelXp: 100,
  incomePerSecond: 0,
  plots: Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    occupied: false,
    type: null
  })),
  animals: { chicken: 0, cow: 0, pig: 0, sheep: 0 },
  buildings: { coop: 0, barn: 0, pigsty: 0, sheepfold: 0, silo: 0, workshop: 0 },
  boostUntil: 0,
  totalCollected: 0,
  objectiveProgress: {}
});

let state = loadState();

const refs = {
  moneyDisplay: document.getElementById('moneyDisplay'),
  incomeDisplay: document.getElementById('incomeDisplay'),
  levelDisplay: document.getElementById('levelDisplay'),
  xpFill: document.getElementById('xpFill'),
  xpText: document.getElementById('xpText'),
  farmGrid: document.getElementById('farmGrid'),
  animalsList: document.getElementById('animalsList'),
  buildingsList: document.getElementById('buildingsList'),
  objectivesList: document.getElementById('objectivesList'),
  rewardAdBtn: document.getElementById('rewardAdBtn'),
  boostStatus: document.getElementById('boostStatus'),
  quickCollectBtn: document.getElementById('quickCollectBtn'),
  saveBtn: document.getElementById('saveBtn'),
  resetBtn: document.getElementById('resetBtn'),
  plotsSummary: document.getElementById('plotsSummary'),
  chickenSummary: document.getElementById('chickenSummary'),
  cowSummary: document.getElementById('cowSummary'),
  pigSummary: document.getElementById('pigSummary'),
  sheepSummary: document.getElementById('sheepSummary')
};

function loadState() {
  const saved = localStorage.getItem(SAVE_KEY);
  if (!saved) return defaultState();

  try {
    const parsed = JSON.parse(saved);
    return {
      ...defaultState(),
      ...parsed,
      animals: { ...defaultState().animals, ...(parsed.animals || {}) },
      buildings: { ...defaultState().buildings, ...(parsed.buildings || {}) },
      plots: Array.isArray(parsed.plots) && parsed.plots.length ? parsed.plots : defaultState().plots
    };
  } catch (error) {
    console.warn('Sauvegarde invalide, réinitialisation.', error);
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function getAnimalsTotal() {
  return Object.values(state.animals).reduce((acc, value) => acc + value, 0);
}

function getTotalBuildings(currentState) {
  return Object.values(currentState.buildings).reduce((acc, value) => acc + value, 0);
}

function getAnimalIncome(type, animalState = state) {
  const animal = animalConfig[type];
  const buildingBonus = getBuildingBonus(animal.building, animalState);
  const multiplier = getIncomeMultiplier(animalState);
  return animal.baseIncome * (animalState.animals[type] || 0) * (1 + buildingBonus) * multiplier;
}

function getBuildingBonus(buildingKey, animalState = state) {
  const buildingCount = animalState.buildings[buildingKey] || 0;
  const bonusEntry = buildingConfig[buildingKey];
  return buildingCount * (bonusEntry ? bonusEntry.bonus : 0);
}

function getIncomeMultiplier(currentState = state) {
  const totalBuildingBonus = Object.entries(buildingConfig).reduce((sum, [key, cfg]) => {
    return sum + (currentState.buildings[key] || 0) * cfg.bonus;
  }, 0);
  return 1 + totalBuildingBonus * 0.22;
}

function getIncomePerSecond(currentState = state) {
  const animalIncome = Object.keys(animalConfig).reduce((sum, key) => {
    return sum + getAnimalIncome(key, currentState);
  }, 0);

  const boostMultiplier = isBoostActive(currentState) ? 2 : 1;
  return animalIncome * boostMultiplier;
}

function isBoostActive(currentState = state) {
  return Date.now() < (currentState.boostUntil || 0);
}

function addMoney(amount) {
  state.money += amount;
  state.totalCollected += amount;
}

function addXP(amount) {
  state.xp += amount;
  while (state.xp >= state.nextLevelXp) {
    state.xp -= state.nextLevelXp;
    state.level += 1;
    state.nextLevelXp = Math.round(state.nextLevelXp * 1.42);
    state.money += 50;
  }
}

function buyAnimal(type) {
  const animal = animalConfig[type];
  const currentCount = state.animals[type] || 0;
  const cost = Math.round(animal.baseCost * Math.pow(1.15, currentCount));

  if (state.money < cost) return false;
  if (!hasFreePlot(type)) return false;

  state.money -= cost;
  state.animals[type] = currentCount + 1;
  addXP(animal.xp);
  assignAnimalToPlot(type);
  updateObjectives();
  return true;
}

function buyBuilding(type) {
  const building = buildingConfig[type];
  const currentCount = state.buildings[type] || 0;
  const cost = Math.round(building.baseCost * Math.pow(1.18, currentCount));

  if (state.money < cost) return false;

  state.money -= cost;
  state.buildings[type] = currentCount + 1;
  addXP(building.xp);
  updateObjectives();
  return true;
}

function hasFreePlot(type) {
  const freePlot = state.plots.find((plot) => !plot.occupied);
  if (!freePlot) return false;
  return true;
}

function assignAnimalToPlot(type) {
  const freePlot = state.plots.find((plot) => !plot.occupied);
  if (!freePlot) return null;
  freePlot.occupied = true;
  freePlot.type = type;
  return freePlot;
}

function unlockNextPlot() {
  const nextIndex = state.plots.length;
  if (state.plots.length >= MAX_PLOTS) return false;
  state.plots.push({ id: nextIndex + 1, occupied: false, type: null });
  return true;
}

function unlockPlotIfNeeded() {
  const totalAnimals = getAnimalsTotal();
  const plotTarget = Math.min(MAX_PLOTS, 6 + Math.floor(totalAnimals / 5));
  while (state.plots.length < plotTarget && state.plots.length < MAX_PLOTS) {
    unlockNextPlot();
  }
}

function updateObjectives() {
  const current = objectiveTemplates.map((objective) => ({
    ...objective,
    complete: objective.check(state)
  }));
  state.objectiveProgress = Object.fromEntries(current.map((objective) => [objective.id, objective.complete]));

  refs.objectivesList.innerHTML = current
    .map(
      (objective) => `
        <div class="objective-item ${objective.complete ? 'complete' : ''}">
          <span class="objective-check">✓</span>
          <div class="objective-text">${objective.text}</div>
        </div>
      `
    )
    .join('');
}

function renderFarmGrid() {
  const totalPlots = state.plots.length;
  refs.farmGrid.innerHTML = Array.from({ length: MAX_PLOTS }, (_, index) => {
    const plot = state.plots[index];
    const occupied = plot && plot.occupied;
    const type = plot ? plot.type : null;
    const animal = type ? animalConfig[type] : null;
    const isLocked = !plot;

    return `
      <div class="plot-tile ${isLocked ? 'locked' : ''}">
        <div>
          <div class="plot-type">${isLocked ? 'Bloqué' : occupied ? 'Occupé' : 'Libre'}</div>
          <div class="plot-name">${isLocked ? 'Parcelle' : `Parcelle ${index + 1}`}</div>
        </div>
        <div class="plot-icon">${animal ? animal.icon : isLocked ? '🔒' : '🌿'}</div>
      </div>
    `;
  }).join('');
}

function renderAnimals() {
  refs.animalsList.innerHTML = Object.entries(animalConfig)
    .map(([key, animal]) => {
      const currentCount = state.animals[key] || 0;
      const cost = Math.round(animal.baseCost * Math.pow(1.15, currentCount));
      const disabled = state.money < cost || !hasFreePlot(key);
      return `
        <div class="shop-item">
          <div class="item-info">
            <div class="item-name">${animal.icon} ${animal.label}</div>
            <div class="item-meta">${currentCount} possédés • +${animal.baseIncome} € / s</div>
          </div>
          <div>
            <div class="item-price">${formatMoney(cost)}</div>
            <button class="primary-btn" data-buy-animal="${key}" ${disabled ? 'disabled' : ''}>Acheter</button>
          </div>
        </div>
      `;
    })
    .join('');

  document.querySelectorAll('[data-buy-animal]').forEach((button) => {
    button.addEventListener('click', () => {
      const type = button.dataset.buyAnimal;
      const success = buyAnimal(type);
      if (!success && !hasFreePlot(type)) {
        alert('Toutes les parcelles sont occupées. Débloquez plus de terrain ou laissez du vide.');
      }
      render();
    });
  });
}

function renderBuildings() {
  refs.buildingsList.innerHTML = Object.entries(buildingConfig)
    .map(([key, building]) => {
      const currentCount = state.buildings[key] || 0;
      const cost = Math.round(building.baseCost * Math.pow(1.18, currentCount));
      const disabled = state.money < cost;
      return `
        <div class="shop-item">
          <div class="item-info">
            <div class="item-name">${building.icon} ${building.label}</div>
            <div class="item-meta">${currentCount} construit • +${(building.bonus * 100).toFixed(0)}% revenu</div>
          </div>
          <div>
            <div class="item-price">${formatMoney(cost)}</div>
            <button class="secondary-btn" data-buy-building="${key}" ${disabled ? 'disabled' : ''}>Acheter</button>
          </div>
        </div>
      `;
    })
    .join('');

  document.querySelectorAll('[data-buy-building]').forEach((button) => {
    button.addEventListener('click', () => {
      const type = button.dataset.buyBuilding;
      buyBuilding(type);
      render();
    });
  });
}

function renderSummary() {
  refs.plotsSummary.textContent = `${state.plots.length}`;
  refs.chickenSummary.textContent = state.animals.chicken || 0;
  refs.cowSummary.textContent = state.animals.cow || 0;
  refs.pigSummary.textContent = state.animals.pig || 0;
  refs.sheepSummary.textContent = state.animals.sheep || 0;
}

function renderStats() {
  state.incomePerSecond = getIncomePerSecond(state);
  refs.moneyDisplay.textContent = formatMoney(state.money);
  refs.incomeDisplay.textContent = formatMoney(state.incomePerSecond, true);
  refs.levelDisplay.textContent = state.level;

  const progress = Math.min(100, (state.xp / state.nextLevelXp) * 100);
  refs.xpFill.style.width = `${progress}%`;
  refs.xpText.textContent = `${state.xp} / ${state.nextLevelXp} XP`;

  const boostActive = isBoostActive(state);
  refs.rewardAdBtn.disabled = boostActive;
  refs.boostStatus.textContent = boostActive
    ? `Bonus actif jusqu'à ${new Date(state.boostUntil).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : 'Aucun bonus actif';
}

function formatMoney(value, isRate = false) {
  const formatted = Number(value).toLocaleString('fr-FR', {
    minimumFractionDigits: isRate ? 1 : 0,
    maximumFractionDigits: isRate ? 1 : 0
  });
  return `${formatted} €${isRate ? '/s' : ''}`;
}

function tick() {
  const earned = state.incomePerSecond;
  if (earned > 0) {
    state.money += earned / 2;
  }

  unlockPlotIfNeeded();
  render();
}

function render() {
  renderStats();
  renderFarmGrid();
  renderAnimals();
  renderBuildings();
  renderSummary();
  updateObjectives();
  saveState();
}

function quickCollect() {
  addMoney(25);
  addXP(6);
  render();
}

function resetGame() {
  if (!confirm('Réinitialiser complètement la ferme ?')) return;
  state = defaultState();
  localStorage.removeItem(SAVE_KEY);
  render();
}

function applyRewardBoost() {
  state.boostUntil = Date.now() + 60000;
  render();
}

function showRewardAd() {
  const sdk = window.CrazyGames && window.CrazyGames.SDK;

  if (sdk && typeof sdk.ad?.requestAd === 'function') {
    sdk.ad.requestAd('rewarded', () => {
      applyRewardBoost();
    });
    return;
  }

  applyRewardBoost();
}

function initCrazyGamesSDK() {
  const sdk = window.CrazyGames && window.CrazyGames.SDK;
  if (!sdk) return;

  if (typeof sdk.gameplayStart === 'function') {
    sdk.gameplayStart();
  }

  if (typeof sdk.gameplayStop === 'function') {
    window.addEventListener('beforeunload', () => sdk.gameplayStop());
  }
}

function setupEvents() {
  refs.quickCollectBtn.addEventListener('click', quickCollect);
  refs.rewardAdBtn.addEventListener('click', showRewardAd);
  refs.saveBtn.addEventListener('click', () => {
    saveState();
    alert('Sauvegarde locale enregistrée.');
  });
  refs.resetBtn.addEventListener('click', resetGame);
}

function initialize() {
  setupEvents();
  initCrazyGamesSDK();
  state = loadState();
  render();
  setInterval(tick, 500);
  setInterval(saveState, 4000);
}

initialize();

// This project is intentionally vanilla HTML/CSS/JS for CrazyGames compatibility.

