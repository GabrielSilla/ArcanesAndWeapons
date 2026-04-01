import { GamePersistenceService, GAME_SESSION_STORAGE_KEY, type SessionSnapshot } from './game-persistence.service';

function minimalSnapshot(overrides: Partial<SessionSnapshot> = {}): SessionSnapshot {
  return {
    schemaVersion: 1,
    totalhp: 25,
    hp: 20,
    level: 2,
    dice: 0,
    diceRolled: false,
    damage: 3,
    hasClass: true,
    classId: 4,
    classCard: '/assets/cards/classes/mago-min.png',
    hasRace: true,
    raceId: 2,
    raceCard: '/assets/cards/races/elf.png',
    hasWeapon: false,
    weaponCard: '',
    hasSlave: false,
    slaveCard: '',
    slaveId: 0,
    hasVD: true,
    vdCard: '/assets/cards/vd/blessed.png',
    hasMagic: false,
    magicCards: [],
    tableCards: [],
    bagCards: [],
    bagStones: [],
    ...overrides,
  };
}

describe('GamePersistenceService', () => {
  let store: Record<string, string>;
  let service: GamePersistenceService;

  beforeEach(() => {
    store = {};
    const mockStorage: Storage = {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
      get length() {
        return Object.keys(store).length;
      },
      key: (index: number) => Object.keys(store)[index] ?? null,
    };
    vi.stubGlobal('localStorage', mockStorage);
    service = new GamePersistenceService();
  });

  it('load returns null when empty', () => {
    expect(service.load()).toBeNull();
  });

  it('save and load roundtrip', () => {
    const snap = minimalSnapshot();
    service.save(snap);
    expect(service.load()).toEqual(snap);
  });

  it('clear removes item', () => {
    service.save(minimalSnapshot());
    expect(service.load()).not.toBeNull();
    service.clear();
    expect(service.load()).toBeNull();
  });

  it('load returns null for invalid JSON', () => {
    localStorage.setItem(GAME_SESSION_STORAGE_KEY, 'not-json{');
    expect(service.load()).toBeNull();
  });

  it('load returns null for wrong schemaVersion', () => {
    localStorage.setItem(GAME_SESSION_STORAGE_KEY, JSON.stringify({ schemaVersion: 99 }));
    expect(service.load()).toBeNull();
  });

  it('saveDebounced saves after delay', async () => {
    vi.useFakeTimers();
    service.saveDebounced(minimalSnapshot(), 100);
    expect(service.load()).toBeNull();
    await vi.advanceTimersByTimeAsync(100);
    expect(service.load()).toEqual(minimalSnapshot());
    vi.useRealTimers();
  });
});
