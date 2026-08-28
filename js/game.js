/**
 * game.js - ליבת מנוע המשחק Space Orbit: Flexbox Navigator
 * מטפל במצב המשחק, אימות פתרונות, שמירה מקומית, חישוב כוכבים ואירועים.
 */

class SpaceOrbitGame {
  constructor() {
    this.currentLevelIndex = 0;
    this.attempts = 0;
    this.userStyles = {};
    this.audioEnabled = true;
    
    // Game progress state
    this.progress = {
      unlockedLevels: [1], // Level 1 is always unlocked
      completedLevels: {}, // { 1: { stars: 3, attempts: 1 } }
      lastPlayedLevel: 1
    };

    this.init();
  }

  init() {
    this.loadProgress();
    // Load last played level or level 1
    const startLevel = Math.min(this.progress.lastPlayedLevel || 1, GAME_LEVELS.length);
    this.loadLevel(startLevel - 1);
  }

  getCurrentLevel() {
    return GAME_LEVELS[this.currentLevelIndex];
  }

  loadLevel(index) {
    if (index < 0 || index >= GAME_LEVELS.length) return;
    
    this.currentLevelIndex = index;
    this.attempts = 0;
    this.userStyles = {};

    const level = this.getCurrentLevel();

    // Set initial user styles to defaults defined in level
    level.controls.forEach(ctrl => {
      this.userStyles[ctrl.property] = ctrl.default;
    });

    // Update progress state
    this.progress.lastPlayedLevel = level.id;
    if (!this.progress.unlockedLevels.includes(level.id)) {
      this.progress.unlockedLevels.push(level.id);
    }
    this.saveProgress();

    // Trigger UI updates
    if (window.gameUI) {
      window.gameUI.renderLevel(level, this.userStyles, this.attempts, this.progress);
    }
  }

  updateProperty(property, value) {
    this.userStyles[property] = value;
    if (window.gameUI) {
      window.gameUI.updateFleetStyles(this.userStyles, this.getCurrentLevel().baseStyles);
    }
  }

  resetCurrentLevel() {
    const level = this.getCurrentLevel();
    this.userStyles = {};
    level.controls.forEach(ctrl => {
      this.userStyles[ctrl.property] = ctrl.default;
    });

    if (window.gameUI) {
      window.gameUI.resetControls(this.userStyles, level.baseStyles);
      window.gameUI.playSound('reset');
      window.gameUI.showFeedback('info', 'השלב אופס להגדרות ברירת המחדל.');
    }
  }

  validateSolution() {
    this.attempts++;
    const level = this.getCurrentLevel();
    
    if (window.gameUI) {
      window.gameUI.updateAttemptsCounter(this.attempts);
    }

    // 1. Check style match against primary targetStyles
    let isMatch = this.checkStyleMatch(this.userStyles, level.targetStyles);

    // 2. Check alternate valid solutions if any
    if (!isMatch && level.alternateTargetStyles) {
      for (const altTarget of level.alternateTargetStyles) {
        if (this.checkStyleMatch(this.userStyles, altTarget)) {
          isMatch = true;
          break;
        }
      }
    }

    // 3. Robust Geometric Validation: verify bounding box positions
    const isPhysicallyAligned = this.verifyGeometricAlignment();
    
    // Overall success if styles match OR elements physically align perfectly
    const success = isMatch || isPhysicallyAligned;

    if (success) {
      const stars = this.calculateStars(this.attempts);
      
      // Save completion
      this.progress.completedLevels[level.id] = {
        stars: Math.max(stars, (this.progress.completedLevels[level.id]?.stars || 0)),
        attempts: this.attempts
      };

      // Unlock next level if available
      const nextLevelId = level.id + 1;
      if (nextLevelId <= GAME_LEVELS.length && !this.progress.unlockedLevels.includes(nextLevelId)) {
        this.progress.unlockedLevels.push(nextLevelId);
      }

      this.saveProgress();

      if (window.gameUI) {
        window.gameUI.playSound('success');
        window.gameUI.handleLevelSuccess(level, stars, this.attempts, nextLevelId <= GAME_LEVELS.length);
      }
    } else {
      if (window.gameUI) {
        window.gameUI.playSound('error');
        window.gameUI.handleLevelError(level);
      }
    }

    return success;
  }

  checkStyleMatch(userStyles, targetStyles) {
    for (const [prop, val] of Object.entries(targetStyles)) {
      if (userStyles[prop] !== val) {
        return false;
      }
    }
    return true;
  }

  verifyGeometricAlignment() {
    const ships = document.querySelectorAll('.fleet-layer .spaceship');
    const docks = document.querySelectorAll('.targets-layer .target-pod');

    if (!ships.length || ships.length !== docks.length) return false;

    const tolerance = 14; // pixel tolerance for center alignment

    for (let i = 0; i < ships.length; i++) {
      const shipRect = ships[i].getBoundingClientRect();
      const dockRect = docks[i].getBoundingClientRect();

      const shipCenterX = shipRect.left + shipRect.width / 2;
      const shipCenterY = shipRect.top + shipRect.height / 2;
      const dockCenterX = dockRect.left + dockRect.width / 2;
      const dockCenterY = dockRect.top + dockRect.height / 2;

      const distX = Math.abs(shipCenterX - dockCenterX);
      const distY = Math.abs(shipCenterY - dockCenterY);

      if (distX > tolerance || distY > tolerance) {
        return false;
      }
    }

    return true;
  }

  calculateStars(attempts) {
    if (attempts <= 1) return 3;
    if (attempts <= 3) return 2;
    return 1;
  }

  nextLevel() {
    if (this.currentLevelIndex < GAME_LEVELS.length - 1) {
      this.loadLevel(this.currentLevelIndex + 1);
      return true;
    }
    return false; // Reached last level
  }

  prevLevel() {
    if (this.currentLevelIndex > 0) {
      this.loadLevel(this.currentLevelIndex - 1);
      return true;
    }
    return false;
  }

  saveProgress() {
    try {
      localStorage.setItem('space_orbit_flexbox_progress', JSON.stringify(this.progress));
    } catch (e) {
      console.warn('Could not save progress to localStorage', e);
    }
  }

  loadProgress() {
    try {
      const data = localStorage.getItem('space_orbit_flexbox_progress');
      if (data) {
        this.progress = { ...this.progress, ...JSON.parse(data) };
      }
    } catch (e) {
      console.warn('Could not load progress from localStorage', e);
    }
  }

  restartEntireGame() {
    this.progress = {
      unlockedLevels: [1],
      completedLevels: {},
      lastPlayedLevel: 1
    };
    this.saveProgress();
    this.loadLevel(0);
  }
}

// Instantiate global game engine instance
window.spaceOrbit = new SpaceOrbitGame();
