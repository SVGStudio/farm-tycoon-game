:root {
  --bg: #f3efe8;
  --bg-strong: #dfe9d5;
  --panel: rgba(255, 255, 255, 0.8);
  --panel-strong: #fffef9;
  --primary: #4a8f3d;
  --primary-dark: #2f5d27;
  --secondary: #e9b850;
  --accent: #ffc857;
  --danger: #d9534f;
  --text: #213125;
  --muted: #5c6f5d;
  --success: #39b369;
  --shadow: 0 10px 25px rgba(29, 42, 27, 0.12);
  --radius: 18px;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: Inter, "Segoe UI", sans-serif;
  background: linear-gradient(180deg, #f7f1de 0%, #dfeecb 100%);
  color: var(--text);
}

body {
  min-height: 100vh;
  padding: 18px;
}

button {
  font: inherit;
  cursor: pointer;
  border: none;
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

.app-shell {
  max-width: 1500px;
  margin: 0 auto;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
  padding: 16px 20px;
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.72);
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
}

h1, h2, h3, p {
  margin: 0;
}

.eyebrow {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--muted);
  margin-bottom: 6px;
  font-weight: 700;
}

h1 {
  font-size: clamp(1.8rem, 2.7vw, 2.8rem);
}

.header-stats {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.stat-box {
  min-width: 120px;
  padding: 10px 14px;
  border-radius: 14px;
  background: var(--panel-strong);
  border: 1px solid rgba(35, 76, 42, 0.1);
  box-shadow: 0 4px 12px rgba(32, 46, 35, 0.06);
}

.stat-box .label {
  display: block;
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--muted);
  letter-spacing: 0.08em;
  margin-bottom: 6px;
}

.stat-box strong {
  font-size: 1.2rem;
}

.money strong {
  color: #1a7a2d;
}

.income strong {
  color: #9e6b00;
}

.level strong {
  color: #5d4b8d;
}

.game-layout {
  display: grid;
  grid-template-columns: 1.1fr 1.8fr 0.9fr;
  gap: 18px;
}

.panel,
.panel-section,
.hero-card,
.shop-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.panel {
  padding: 14px;
}

.panel-section {
  padding: 16px;
  margin-bottom: 14px;
}

.panel-section:last-child {
  margin-bottom: 0;
}

.center-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.hero-card {
  padding: 20px;
  background: linear-gradient(135deg, #f5f4ef, #edf7e4);
  border: 1px solid rgba(41, 105, 42, 0.1);
}

.hero-card h2 {
  margin-bottom: 16px;
  font-size: clamp(1.5rem, 2.2vw, 2rem);
}

.xp-bar-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.xp-bar {
  width: 100%;
  height: 18px;
  border-radius: 999px;
  background: rgba(29, 41, 30, 0.12);
  overflow: hidden;
}

#xpFill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #7bc96f, #3aa14d);
  border-radius: inherit;
  transition: width 0.25s ease;
}

#xpText {
  font-size: 0.84rem;
  color: var(--muted);
  font-weight: 600;
}

.boost-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 18px;
}

.boost-btn,
.secondary-btn,
.danger-btn,
.primary-btn {
  padding: 10px 14px;
  border-radius: 12px;
  font-weight: 700;
}

.primary-btn {
  background: linear-gradient(135deg, var(--primary), #6bb261);
  color: white;
  box-shadow: 0 8px 16px rgba(63, 123, 60, 0.28);
}

.secondary-btn {
  background: #eef9e6;
  color: var(--primary-dark);
  border: 1px solid rgba(47, 93, 39, 0.15);
}

.danger-btn {
  background: #ffe6e1;
  color: #b9473d;
  border: 1px solid rgba(185, 71, 61, 0.2);
}

.boost-btn {
  background: linear-gradient(135deg, #ffcd58, #ffc14d);
  color: #50380d;
  box-shadow: 0 8px 16px rgba(255, 180, 68, 0.28);
}

#boostStatus {
  font-size: 0.82rem;
  color: var(--muted);
  font-weight: 600;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.section-head h2 {
  font-size: 1.15rem;
}

.farm-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  gap: 10px;
}

.plot-tile {
  position: relative;
  min-height: 110px;
  border-radius: 16px;
  border: 2px dashed rgba(58, 92, 54, 0.2);
  background: linear-gradient(180deg, #e9f7d0, #d2ecb1);
  padding: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  overflow: hidden;
  color: var(--text);
}

.plot-tile::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.03));
}

.plot-tile > * {
  position: relative;
  z-index: 1;
}

.plot-tile.locked {
  opacity: 0.5;
  background: #dfe0df;
  border-style: solid;
  border-color: rgba(107, 132, 104, 0.25);
}

.plot-type {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 800;
  color: var(--muted);
}

.plot-name {
  font-size: 1rem;
  font-weight: 800;
}

.plot-icon {
  font-size: 1.7rem;
}

.shop-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.shop-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  padding: 12px 14px;
  background: linear-gradient(135deg, #f9faf7, #eef6e8);
  border: 1px solid rgba(50, 94, 41, 0.08);
  border-radius: 14px;
  align-items: center;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  font-weight: 800;
  font-size: 1rem;
}

.item-meta {
  color: var(--muted);
  font-size: 0.74rem;
}

.item-price {
  font-weight: 800;
  color: var(--primary-dark);
  font-size: 0.95rem;
  text-align: right;
}

.shop-item button {
  min-width: 110px;
}

.summary-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.summary-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f2f7ea;
  border-radius: 12px;
  padding: 10px 12px;
  font-weight: 700;
}

.summary-list span {
  color: var(--muted);
}

.objective-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.objective-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f4faf0;
  border: 1px solid rgba(35, 104, 59, 0.1);
}

.objective-item.complete {
  background: #e7f9e8;
  border-color: rgba(52, 160, 73, 0.25);
}

.objective-check {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #dfe7d9;
  color: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.objective-item.complete .objective-check {
  background: var(--success);
  color: #fff;
}

.objective-text {
  font-size: 0.82rem;
  color: var(--text);
  line-height: 1.4;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (max-width: 1100px) {
  .game-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  body {
    padding: 12px;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-stats {
    width: 100%;
  }

  .stat-box {
    flex: 1 1 calc(33.333% - 12px);
    min-width: 0;
  }

  .boost-panel {
    flex-direction: column;
    align-items: flex-start;
  }

  .farm-grid {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }

  .shop-item {
    grid-template-columns: 1fr;
  }

  .shop-item button {
    width: 100%;
  }
}
