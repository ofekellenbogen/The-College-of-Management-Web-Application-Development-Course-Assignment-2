/**
 * ui.js - ממשק משתמש, אפקטים קוליים, אנימציות וניהול מודאלים
 * Space Orbit: Flexbox Navigator
 */

class SpaceOrbitUI {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;

    this.cacheElements();
    this.bindEvents();
  }

  cacheElements() {
    // Header & Navigation
    this.levelIndicatorText = document.getElementById('level-indicator-text');
    this.btnPrevLevel = document.getElementById('btn-prev-level');
    this.btnNextLevel = document.getElementById('btn-next-level');
    this.btnOpenLevels = document.getElementById('btn-open-levels');
    this.progressBarFill = document.getElementById('progress-bar-fill');
    this.currentAttemptsCount = document.getElementById('current-attempts-count');
    this.btnSoundToggle = document.getElementById('btn-sound-toggle');
    this.soundIcon = document.getElementById('sound-icon');
    this.btnCheatsheet = document.getElementById('btn-cheatsheet');

    // Mission & Editor
    this.missionLevelTag = document.getElementById('mission-level-tag');
    this.missionTitle = document.getElementById('mission-title');
    this.missionDesc = document.getElementById('mission-desc');
    this.dynamicControlsContainer = document.getElementById('dynamic-controls-container');
    this.editorDynLines = document.getElementById('editor-dyn-lines');

    // Action buttons & Feedback
    this.btnCheck = document.getElementById('btn-check');
    this.btnReset = document.getElementById('btn-reset');
    this.btnHint = document.getElementById('btn-hint');
    this.feedbackBanner = document.getElementById('feedback-banner');
    this.feedbackIcon = document.getElementById('feedback-icon');
    this.feedbackTitle = document.getElementById('feedback-title');
    this.feedbackText = document.getElementById('feedback-text');
    this.btnNextStepInline = document.getElementById('btn-next-step-inline');
    this.hintBox = document.getElementById('hint-box');
    this.hintContent = document.getElementById('hint-content');
    this.btnCloseHint = document.getElementById('btn-close-hint');

    // Simulation Board
    this.spaceBoard = document.getElementById('space-board');
    this.targetsContainer = document.getElementById('targets-container');
    this.fleetContainer = document.getElementById('fleet-container');
    this.hudFleetCount = document.getElementById('hud-fleet-count');

    // Modals
    this.modalLevels = document.getElementById('modal-levels');
    this.levelsGrid = document.getElementById('levels-grid');
    this.btnCloseLevelsModal = document.getElementById('btn-close-levels-modal');

    this.modalCheatsheet = document.getElementById('modal-cheatsheet');
    this.btnCloseCheatsheetModal = document.getElementById('btn-close-cheatsheet-modal');

    this.modalVictory = document.getElementById('modal-victory');
    this.victoryTitle = document.getElementById('victory-title');
    this.victoryMessage = document.getElementById('victory-message');
    this.victoryStars = document.getElementById('victory-stars');
    this.victoryAttempts = document.getElementById('victory-attempts');
    this.btnVictoryNext = document.getElementById('btn-victory-next');
    this.btnVictoryReplay = document.getElementById('btn-victory-replay');
    this.confettiContainer = document.getElementById('confetti-container');

    this.modalGameComplete = document.getElementById('modal-game-complete');
    this.finalTotalStars = document.getElementById('final-total-stars');
    this.btnRestartGame = document.getElementById('btn-restart-game');
    this.btnCloseFinal = document.getElementById('btn-close-final');
  }

  bindEvents() {
    // Sound Toggle
    this.btnSoundToggle.addEventListener('click', () => {
      this.toggleSound();
    });

    // Level Navigation
    this.btnPrevLevel.addEventListener('click', () => {
      this.playSound('click');
      window.spaceOrbit.prevLevel();
    });

    this.btnNextLevel.addEventListener('click', () => {
      this.playSound('click');
      window.spaceOrbit.nextLevel();
    });

    // Action Buttons
    this.btnCheck.addEventListener('click', () => {
      window.spaceOrbit.validateSolution();
    });

    this.btnReset.addEventListener('click', () => {
      window.spaceOrbit.resetCurrentLevel();
    });

    this.btnHint.addEventListener('click', () => {
      this.toggleHint();
    });

    this.btnCloseHint.addEventListener('click', () => {
      this.hintBox.classList.add('hidden');
    });

    this.btnNextStepInline.addEventListener('click', () => {
      this.playSound('click');
      window.spaceOrbit.nextLevel();
    });

    // Modal Triggers
    this.btnOpenLevels.addEventListener('click', () => {
      this.openLevelsModal();
    });

    this.btnCloseLevelsModal.addEventListener('click', () => {
      this.modalLevels.classList.add('hidden');
    });

    this.btnCheatsheet.addEventListener('click', () => {
      this.playSound('click');
      this.modalCheatsheet.classList.remove('hidden');
    });

    this.btnCloseCheatsheetModal.addEventListener('click', () => {
      this.modalCheatsheet.classList.add('hidden');
    });

    // Victory Modal Handlers
    this.btnVictoryNext.addEventListener('click', () => {
      this.modalVictory.classList.add('hidden');
      window.spaceOrbit.nextLevel();
    });

    this.btnVictoryReplay.addEventListener('click', () => {
      this.modalVictory.classList.add('hidden');
      window.spaceOrbit.resetCurrentLevel();
    });

    // Final Modal Handlers
    this.btnRestartGame.addEventListener('click', () => {
      this.modalGameComplete.classList.add('hidden');
      window.spaceOrbit.restartEntireGame();
    });

    this.btnCloseFinal.addEventListener('click', () => {
      this.modalGameComplete.classList.add('hidden');
    });

    // Close modals on clicking outside modal card
    [this.modalLevels, this.modalCheatsheet, this.modalVictory, this.modalGameComplete].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.modalLevels.classList.add('hidden');
        this.modalCheatsheet.classList.add('hidden');
        this.modalVictory.classList.add('hidden');
        this.modalGameComplete.classList.add('hidden');
      } else if (e.key === 'Enter' && !this.isModalOpen()) {
        window.spaceOrbit.validateSolution();
      }
    });
  }

  isModalOpen() {
    return !this.modalLevels.classList.contains('hidden') ||
           !this.modalCheatsheet.classList.contains('hidden') ||
           !this.modalVictory.classList.contains('hidden') ||
           !this.modalGameComplete.classList.contains('hidden');
  }

  /* ==========================================================================
     Level Rendering
     ========================================================================== */

  renderLevel(level, userStyles, attempts, progress) {
    // 1. Update text headers & indicators
    this.missionLevelTag.textContent = `משימה ${level.id}`;
    this.missionTitle.textContent = level.title.replace(/^שלב \d+:\s*/, '');
    this.missionDesc.innerHTML = level.description;
    this.hintContent.innerHTML = level.hint;
    this.hintBox.classList.add('hidden');

    this.levelIndicatorText.textContent = `שלב ${level.id} מתוך ${GAME_LEVELS.length}`;
    this.updateAttemptsCounter(attempts);

    // Progress Bar
    const pct = ((level.id) / GAME_LEVELS.length) * 100;
    this.progressBarFill.style.width = `${pct}%`;

    // Navigation buttons state
    this.btnPrevLevel.disabled = level.id === 1;
    this.btnNextLevel.disabled = !progress.unlockedLevels.includes(level.id + 1) || level.id === GAME_LEVELS.length;

    // Reset feedback and board glow
    this.feedbackBanner.classList.add('hidden');
    this.btnNextStepInline.classList.add('hidden');
    this.spaceBoard.classList.remove('success-glow', 'shake');

    // 2. Render Board Elements (Docks and Ships)
    this.renderBoardElements(level);

    // 3. Render CSS Editor Controls
    this.renderControls(level, userStyles);

    // 4. Apply initial CSS layouts
    this.updateTargetStyles(level.targetStyles, level.baseStyles);
    this.updateFleetStyles(userStyles, level.baseStyles);
  }

  renderBoardElements(level) {
    this.hudFleetCount.textContent = `FLEET: ${level.items.length} SHIPS`;

    // Render Targets
    this.targetsContainer.innerHTML = '';
    level.items.forEach((item, index) => {
      const targetPod = document.createElement('div');
      targetPod.className = `target-pod type-${item.type}`;
      targetPod.innerHTML = `<img src="assets/dock-${item.type}.svg" alt="Target Dock ${item.type}">`;
      this.targetsContainer.appendChild(targetPod);
    });

    // Render Spaceships
    this.fleetContainer.innerHTML = '';
    level.items.forEach((item, index) => {
      const ship = document.createElement('div');
      ship.className = `spaceship type-${item.type}`;
      ship.id = `ship-${index}`;
      ship.innerHTML = `<img src="assets/spaceship-${item.type}.svg" alt="Spaceship ${item.type}">`;
      this.fleetContainer.appendChild(ship);
    });
  }

  renderControls(level, userStyles) {
    this.dynamicControlsContainer.innerHTML = '';

    // Calculate line numbers for editor
    let linesHtml = '';
    const startLine = 3;
    level.controls.forEach((ctrl, idx) => {
      linesHtml += `${startLine + idx}<br>`;
    });
    this.editorDynLines.innerHTML = linesHtml;

    level.controls.forEach((ctrl) => {
      const row = document.createElement('div');
      row.className = 'control-row';

      const label = document.createElement('span');
      label.className = 'control-prop-label';
      label.textContent = `${ctrl.property}: `;

      const selectWrap = document.createElement('div');
      selectWrap.className = 'select-wrapper';

      const select = document.createElement('select');
      select.className = 'css-select';
      select.dataset.property = ctrl.property;
      select.setAttribute('aria-label', ctrl.property);

      ctrl.options.forEach(opt => {
        const optionElem = document.createElement('option');
        optionElem.value = opt.value;
        optionElem.textContent = opt.label;
        if (userStyles[ctrl.property] === opt.value) {
          optionElem.selected = true;
        }
        select.appendChild(optionElem);
      });

      select.addEventListener('change', (e) => {
        this.playSound('thrust');
        window.spaceOrbit.updateProperty(ctrl.property, e.target.value);
      });

      const arrow = document.createElement('span');
      arrow.className = 'select-arrow';
      arrow.textContent = '▼';

      const semicolon = document.createElement('span');
      semicolon.className = 'token-brace';
      semicolon.textContent = ';';

      selectWrap.appendChild(select);
      selectWrap.appendChild(arrow);

      row.appendChild(label);
      row.appendChild(selectWrap);
      row.appendChild(semicolon);

      this.dynamicControlsContainer.appendChild(row);
    });
  }

  resetControls(userStyles, baseStyles) {
    const selects = this.dynamicControlsContainer.querySelectorAll('.css-select');
    selects.forEach(sel => {
      const prop = sel.dataset.property;
      if (userStyles[prop]) {
        sel.value = userStyles[prop];
      }
    });

    this.updateFleetStyles(userStyles, baseStyles);
  }

  updateFleetStyles(userStyles, baseStyles) {
    // Clear previously applied style properties
    this.fleetContainer.style.cssText = '';
    this.fleetContainer.className = 'board-layer fleet-layer';

    // Apply base styles
    if (baseStyles) {
      for (const [prop, val] of Object.entries(baseStyles)) {
        this.fleetContainer.style.setProperty(prop, val);
      }
    }

    // Apply user selected styles
    for (const [prop, val] of Object.entries(userStyles)) {
      this.fleetContainer.style.setProperty(prop, val);
    }

    // Direction visual class for spaceship rotation
    const dir = userStyles['flex-direction'] || baseStyles?.['flex-direction'] || 'row';
    this.fleetContainer.classList.add(`dir-${dir}`);
  }

  updateTargetStyles(targetStyles, baseStyles) {
    this.targetsContainer.style.cssText = '';
    this.targetsContainer.className = 'board-layer targets-layer';

    if (baseStyles) {
      for (const [prop, val] of Object.entries(baseStyles)) {
        this.targetsContainer.style.setProperty(prop, val);
      }
    }

    for (const [prop, val] of Object.entries(targetStyles)) {
      this.targetsContainer.style.setProperty(prop, val);
    }
  }

  updateAttemptsCounter(count) {
    this.currentAttemptsCount.textContent = count;
  }

  /* ==========================================================================
     Feedback & Modals Handlers
     ========================================================================== */

  showFeedback(type, message, title = '') {
    this.feedbackBanner.className = `feedback-banner ${type}`;
    this.feedbackIcon.textContent = type === 'success' ? '🚀' : (type === 'error' ? '⚠️' : 'ℹ️');
    this.feedbackTitle.textContent = title || (type === 'success' ? 'תמרון מושלם!' : (type === 'error' ? 'מסלול שגוי' : 'עדכון מערכת'));
    this.feedbackText.textContent = message;
    this.feedbackBanner.classList.remove('hidden');
  }

  handleLevelSuccess(level, stars, attempts, hasNextLevel) {
    this.spaceBoard.classList.add('success-glow');

    // Add docked class to ships
    const ships = this.fleetContainer.querySelectorAll('.spaceship');
    ships.forEach(s => s.classList.add('docked'));

    this.showFeedback('success', `החלליות הגיעו בדיוק ליעד בניסיון מספר ${attempts}!`, 'כל הכבוד!');
    this.btnNextStepInline.classList.remove('hidden');

    // Show Victory Modal after small delay
    setTimeout(() => {
      if (level.id === GAME_LEVELS.length) {
        this.showGameCompleteModal();
      } else {
        this.showVictoryModal(level, stars, attempts);
      }
    }, 600);
  }

  handleLevelError(level) {
    this.spaceBoard.classList.remove('shake');
    // Trigger reflow to restart animation
    void this.spaceBoard.offsetWidth;
    this.spaceBoard.classList.add('shake');

    this.showFeedback('error', 'החלליות לא התיישרו במדויק מול תחנות העגינה. נסה לשנות את מאפייני ה-Flexbox.');
  }

  toggleHint() {
    this.playSound('click');
    this.hintBox.classList.toggle('hidden');
  }

  showVictoryModal(level, stars, attempts) {
    this.victoryTitle.textContent = `שלב ${level.id} הושלם בהצלחה!`;
    this.victoryMessage.textContent = level.title;
    this.victoryAttempts.textContent = attempts;

    // Render stars
    let starsHtml = '';
    for (let i = 1; i <= 3; i++) {
      starsHtml += `<span class="star ${i <= stars ? 'filled' : 'empty'}">${i <= stars ? '★' : '☆'}</span>`;
    }
    this.victoryStars.innerHTML = starsHtml;

    this.triggerConfetti();
    this.modalVictory.classList.remove('hidden');
  }

  showGameCompleteModal() {
    let totalStars = 0;
    const completed = window.spaceOrbit.progress.completedLevels;
    for (const key in completed) {
      totalStars += completed[key].stars || 0;
    }

    this.finalTotalStars.textContent = `${totalStars} / 30 ★`;
    this.triggerConfetti();
    this.modalGameComplete.classList.remove('hidden');
  }

  openLevelsModal() {
    this.playSound('click');
    const progress = window.spaceOrbit.progress;
    const currentId = window.spaceOrbit.getCurrentLevel().id;

    this.levelsGrid.innerHTML = '';

    GAME_LEVELS.forEach(lvl => {
      const isUnlocked = progress.unlockedLevels.includes(lvl.id);
      const isCompleted = !!progress.completedLevels[lvl.id];
      const isCurrent = lvl.id === currentId;
      const stars = progress.completedLevels[lvl.id]?.stars || 0;

      const card = document.createElement('button');
      card.className = `level-card-btn ${isUnlocked ? '' : 'locked'} ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`;
      
      let starsStr = '';
      if (isCompleted) {
        starsStr = '★'.repeat(stars) + '☆'.repeat(3 - stars);
      } else if (isUnlocked) {
        starsStr = 'פתוח לטיסה';
      } else {
        starsStr = '🔒 נעול';
      }

      card.innerHTML = `
        <span class="level-card-num">${lvl.id}</span>
        <span class="level-card-title">${lvl.title.replace(/^שלב \d+:\s*/, '')}</span>
        <span class="level-card-stars">${starsStr}</span>
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          this.playSound('click');
          this.modalLevels.classList.add('hidden');
          window.spaceOrbit.loadLevel(lvl.id - 1);
        });
      }

      this.levelsGrid.appendChild(card);
    });

    this.modalLevels.classList.remove('hidden');
  }

  triggerConfetti() {
    this.confettiContainer.innerHTML = '';
    const colors = ['#00f0ff', '#00ff88', '#ff7700', '#ffd000', '#b026ff', '#ffffff'];
    
    for (let i = 0; i < 40; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = `${Math.random() * 0.7}s`;
      piece.style.transform = `scale(${0.6 + Math.random() * 0.8})`;
      this.confettiContainer.appendChild(piece);
    }
  }

  /* ==========================================================================
     Procedural Audio Synthesizer (Web Audio API)
     ========================================================================== */

  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.soundIcon.textContent = this.soundEnabled ? '🔊' : '🔇';
    if (this.soundEnabled) {
      this.playSound('click');
    }
  }

  playSound(type) {
    if (!this.soundEnabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    try {
      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } 
      else if (type === 'thrust') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      } 
      else if (type === 'success') {
        // Ascending major chord fanfare
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const noteTime = now + (idx * 0.08);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, noteTime);
          gain.gain.setValueAtTime(0.15, noteTime);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(noteTime);
          osc.stop(noteTime + 0.35);
        });
      } 
      else if (type === 'error') {
        // Double low buzz
        [0, 0.1].forEach((delay) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(140, now + delay);
          gain.gain.setValueAtTime(0.15, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.08);
        });
      }
      else if (type === 'reset') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }
}

// Initialize UI controller once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.gameUI = new SpaceOrbitUI();
  // Trigger initial level render with current game state
  if (window.spaceOrbit) {
    const level = window.spaceOrbit.getCurrentLevel();
    window.gameUI.renderLevel(
      level, 
      window.spaceOrbit.userStyles, 
      window.spaceOrbit.attempts, 
      window.spaceOrbit.progress
    );
  }
});
