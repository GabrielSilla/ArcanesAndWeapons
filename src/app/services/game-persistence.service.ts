import { Injectable } from '@angular/core';
import type { CardModel } from '../static/card-model';
import type { MagicCardModel } from '../static/magic-card-model';

export const GAME_SESSION_STORAGE_KEY = 'aa-game-session';

export interface SessionSnapshot {
  schemaVersion: 1;
  totalhp: number;
  hp: number;
  level: number;
  dice: number;
  diceRolled: boolean;
  damage: number;
  hasClass: boolean;
  classId: number;
  classCard: string;
  hasRace: boolean;
  raceId: number;
  raceCard: string;
  hasWeapon: boolean;
  weaponCard: string;
  hasSlave: boolean;
  slaveCard: string;
  /** Opcional em saves antigos; ausente = 0 */
  slaveId?: number;
  /** Estado do servo na mesa; ausente em saves antigos */
  slaveCurrentHp?: number | null;
  slaveTurnsRemaining?: number | null;
  hasVD: boolean;
  vdCard: string;
  hasMagic: boolean;
  magicCards: MagicCardModel[];
  tableCards: unknown[];
  bagCards: CardModel[];
  bagStones: CardModel[];
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function isValidSnapshot(v: unknown): v is SessionSnapshot {
  if (!isRecord(v)) return false;
  if (v['schemaVersion'] !== 1) return false;
  const n = (k: string) => typeof v[k] === 'number';
  const b = (k: string) => typeof v[k] === 'boolean';
  const s = (k: string) => typeof v[k] === 'string';
  if (!n('totalhp') || !n('hp') || !n('level') || !n('dice') || !n('damage')) return false;
  if (!b('diceRolled')) return false;
  if (!b('hasClass') || !n('classId') || !s('classCard')) return false;
  if (!b('hasRace') || !n('raceId') || !s('raceCard')) return false;
  if (!b('hasWeapon') || !s('weaponCard')) return false;
  if (!b('hasSlave') || !s('slaveCard')) return false;
  if (!b('hasVD') || !s('vdCard')) return false;
  if (!b('hasMagic')) return false;
  if (!Array.isArray(v['magicCards']) || !Array.isArray(v['tableCards'])) return false;
  if (!Array.isArray(v['bagCards']) || !Array.isArray(v['bagStones'])) return false;
  return true;
}

@Injectable({ providedIn: 'root' })
export class GamePersistenceService {
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  load(): SessionSnapshot | null {
    try {
      const raw = localStorage.getItem(GAME_SESSION_STORAGE_KEY);
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      if (!isValidSnapshot(parsed)) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  save(snapshot: SessionSnapshot): void {
    try {
      localStorage.setItem(GAME_SESSION_STORAGE_KEY, JSON.stringify(snapshot));
    } catch {
      // quota, private mode, etc.
    }
  }

  saveDebounced(snapshot: SessionSnapshot, ms = 250): void {
    if (this.debounceTimer !== null) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      this.debounceTimer = null;
      this.save(snapshot);
    }, ms);
  }

  clear(): void {
    if (this.debounceTimer !== null) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    try {
      localStorage.removeItem(GAME_SESSION_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}
