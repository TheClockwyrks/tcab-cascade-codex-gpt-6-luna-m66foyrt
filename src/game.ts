/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  Game,
  InitApi,
  RenderApi,
  UpdateApi,
} from "@clockwyrks/simple-2d";
import type { DeepReadonly } from "ts-essentials";
import * as C from "./constants";

export type Screen = "title" | "howto" | "playing" | "won";
export type Suit = "spades" | "hearts" | "diamonds" | "clubs";
export type PileKind = "stock" | "waste" | "foundation" | "tableau";
export interface CardState {
  readonly id: number;
  readonly suit: Suit;
  readonly rank: number;
  readonly faceUp: boolean;
}
export interface DragState {
  readonly cards: readonly CardState[];
  readonly fromPile: "waste" | "foundation" | "tableau";
  readonly fromIndex: number;
  readonly x: number;
  readonly y: number;
}
export interface DropTargetState {
  readonly pile: "foundation" | "tableau";
  readonly index: number;
}
export interface PointerState {
  readonly x: number;
  readonly y: number;
  readonly down: boolean;
}
export interface PressState {
  readonly x: number;
  readonly y: number;
  readonly at: number;
}
export interface FlyerState {
  readonly id: number;
  readonly suit: Suit;
  readonly rank: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
}
export interface CascadeState {
  readonly screen: Screen;
  readonly menuIndex: number;
  readonly titleIndex: number;
  readonly stock: readonly CardState[];
  readonly waste: readonly CardState[];
  readonly wasteSets: readonly number[];
  readonly foundations: readonly (readonly CardState[])[];
  readonly tableau: readonly (readonly CardState[])[];
  readonly drag: DragState | null;
  readonly dropTarget: DropTargetState | null;
  readonly pointer: PointerState;
  readonly lastPress: PressState | null;
  readonly autoFlip: boolean;
  readonly winDetect: boolean;
  readonly launching: boolean;
  readonly trailPainting: boolean;
  readonly launchClock: number;
  readonly launched: number;
  readonly flyers: readonly FlyerState[];
  readonly cascadeDone: boolean;
  readonly trailStamps: number;
  readonly nextId: number;
  readonly simTime: number;
  readonly muted: boolean;
}
export interface CascadeSnapshot {
  version: number;
  screen: Screen;
  menuIndex: number;
  titleIndex: number;
  dealMode: string;
  turnCount: number;
  dealModeLabel: string;
  muted: boolean;
  autoFlip: boolean;
  winDetect: boolean;
  launching: boolean;
  trailPainting: boolean;
  stock: readonly Readonly<CardState & { color: "red" | "black" }>[];
  waste: readonly Readonly<CardState & { color: "red" | "black" }>[];
  wasteSets: readonly number[];
  wasteVisibleCount: number;
  foundations: readonly (readonly Readonly<
    CardState & { color: "red" | "black" }
  >[])[];
  tableau: readonly (readonly Readonly<
    CardState & { color: "red" | "black" }
  >[])[];
  drag: DragState | null;
  dropTarget: DropTargetState | null;
  pointer: PointerState;
  lastPress: PressState | null;
  launchClock: number;
  launched: number;
  flyers: readonly FlyerState[];
  cascadeDone: boolean;
  trailStamps: number;
  simTime: number;
}
export interface CascadeDebugApi {
  readonly version: number;
  reset(s: DeepReadonly<CascadeState>): CascadeState;
  snapshot(s: DeepReadonly<CascadeState>): CascadeSnapshot;
  reconcile(s: DeepReadonly<CascadeState>): CascadeState;
  menuItemRect(
    s: DeepReadonly<CascadeState>,
    index: number,
  ): { x: number; y: number; w: number; h: number } | null;
  setScreen(s: DeepReadonly<CascadeState>, screen: Screen): CascadeState;
  setMenuIndex(s: DeepReadonly<CascadeState>, index: number): CascadeState;
  setTitleIndex(s: DeepReadonly<CascadeState>, index: number): CascadeState;
  addCard(
    s: DeepReadonly<CascadeState>,
    pile: PileKind,
    index: number,
    suit: Suit,
    rank: number,
    faceUp: boolean,
  ): CascadeState;
  removeCard(s: DeepReadonly<CascadeState>, id: number): CascadeState;
  setCardFaceUp(
    s: DeepReadonly<CascadeState>,
    id: number,
    faceUp: boolean,
  ): CascadeState;
  clearPile(
    s: DeepReadonly<CascadeState>,
    pile: PileKind,
    index: number,
  ): CascadeState;
  clearTable(s: DeepReadonly<CascadeState>): CascadeState;
  addWasteSet(s: DeepReadonly<CascadeState>, count: number): CascadeState;
  clearWasteSets(s: DeepReadonly<CascadeState>): CascadeState;
  deal(s: DeepReadonly<CascadeState>): CascadeState;
  turnStock(s: DeepReadonly<CascadeState>): CascadeState;
  move(
    s: DeepReadonly<CascadeState>,
    fromPile: PileKind,
    fromIndex: number,
    fromRow: number,
    toPile: "foundation" | "tableau",
    toIndex: number,
  ): [CascadeState, boolean];
  autoMove(
    s: DeepReadonly<CascadeState>,
    pile: "waste" | "tableau",
    index: number,
  ): [CascadeState, boolean];
  pointerDown(
    s: DeepReadonly<CascadeState>,
    x: number,
    y: number,
  ): CascadeState;
  pointerMove(
    s: DeepReadonly<CascadeState>,
    x: number,
    y: number,
  ): CascadeState;
  pointerUp(s: DeepReadonly<CascadeState>, x: number, y: number): CascadeState;
  setAutoFlip(s: DeepReadonly<CascadeState>, v: boolean): CascadeState;
  setWinDetect(s: DeepReadonly<CascadeState>, v: boolean): CascadeState;
  setLaunching(s: DeepReadonly<CascadeState>, v: boolean): CascadeState;
  setTrailPainting(s: DeepReadonly<CascadeState>, v: boolean): CascadeState;
  addFlyer(
    s: DeepReadonly<CascadeState>,
    suit: Suit,
    rank: number,
    x: number,
    y: number,
    vx: number,
    vy: number,
  ): CascadeState;
  setFlyerPosition(
    s: DeepReadonly<CascadeState>,
    id: number,
    x: number,
    y: number,
  ): CascadeState;
  setFlyerVelocity(
    s: DeepReadonly<CascadeState>,
    id: number,
    vx: number,
    vy: number,
  ): CascadeState;
  removeFlyer(s: DeepReadonly<CascadeState>, id: number): CascadeState;
  clearFlyers(s: DeepReadonly<CascadeState>): CascadeState;
  setLaunchClock(s: DeepReadonly<CascadeState>, seconds: number): CascadeState;
  clearTrail(s: DeepReadonly<CascadeState>): CascadeState;
  drawLaunchVx(s: DeepReadonly<CascadeState>): number;
}
export const BACKGROUND = "#164d3c";
const RED = new Set<Suit>(["hearts", "diamonds"]);
const empty = () =>
  ({
    screen: "title" as Screen,
    menuIndex: 0,
    titleIndex: 0,
    stock: [] as CardState[],
    waste: [] as CardState[],
    wasteSets: [] as number[],
    foundations: Array.from(
      { length: C.FOUNDATION_COUNT },
      () => [],
    ) as CardState[][],
    tableau: Array.from(
      { length: C.TABLEAU_COLUMNS },
      () => [],
    ) as CardState[][],
    drag: null,
    dropTarget: null,
    pointer: { x: 0, y: 0, down: false },
    lastPress: null,
    autoFlip: true,
    winDetect: true,
    launching: true,
    trailPainting: true,
    launchClock: 0,
    launched: 0,
    flyers: [] as FlyerState[],
    cascadeDone: false,
    trailStamps: 0,
    nextId: 0,
    simTime: 0,
    muted: false,
  }) satisfies CascadeState;
const copies = (s: DeepReadonly<CascadeState>): any =>
  ({
    ...s,
    stock: [...s.stock],
    waste: [...s.waste],
    wasteSets: [...s.wasteSets],
    foundations: s.foundations.map((p: readonly CardState[]) => [...p]),
    tableau: s.tableau.map((p) => [...p]),
    flyers: [...s.flyers],
    drag: s.drag ? { ...s.drag, cards: [...s.drag.cards] } : null,
    pointer: { ...s.pointer },
    lastPress: s.lastPress ? { ...s.lastPress } : null,
  }) as CascadeState;
const rank = (n: number) =>
  n === 1 ? "A" : n === 11 ? "J" : n === 12 ? "Q" : n === 13 ? "K" : String(n);
const validIndex = (pile: PileKind, i: number) => {
  if (!["stock", "waste", "foundation", "tableau"].includes(pile))
    throw new Error(`Invalid pile ${pile}`);
  if (
    !Number.isInteger(i) ||
    i < 0 ||
    i >=
      (pile === "foundation"
        ? C.FOUNDATION_COUNT
        : pile === "tableau"
          ? C.TABLEAU_COLUMNS
          : 1)
  )
    throw new RangeError(`Invalid ${pile} index ${i}`);
};
function deal(s: CascadeState): CascadeState {
  const deck: CardState[] = [];
  let nextId = s.nextId;
  for (const suit of C.SUITS)
    for (let r = C.RANK_MIN; r <= C.RANK_MAX; r++)
      deck.push({ id: nextId++, suit, rank: r, faceUp: false });
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  let k = 0;
  const tableau = Array.from({ length: C.TABLEAU_COLUMNS }, (_, col) =>
    Array.from({ length: col + 1 }, (_, row) => ({
      ...deck[k++],
      faceUp: row === col,
    })),
  );
  return {
    ...s,
    stock: deck.slice(k),
    waste: [],
    wasteSets: [],
    foundations: Array.from({ length: C.FOUNDATION_COUNT }, () => []),
    tableau,
    launched: 0,
    trailStamps: 0,
    nextId,
  };
}
function foundationFor(s: DeepReadonly<CascadeState>, c: CardState) {
  return s.foundations.findIndex((p) =>
    p.length
      ? p[p.length - 1]!.suit === c.suit && p[p.length - 1]!.rank === c.rank - 1
      : c.rank === C.RANK_MIN,
  );
}
function canColumn(p: readonly CardState[], c: CardState) {
  if (!c.faceUp) return false;
  if (!p.length) return c.rank === C.RANK_MAX;
  const t = p[p.length - 1]!;
  return (
    t.faceUp && t.rank === c.rank + 1 && RED.has(t.suit) !== RED.has(c.suit)
  );
}
function columnFaceOffset(cards: readonly CardState[]) {
  const faceUpCount = cards.filter((card) => card.faceUp).length;
  const faceDownCount = cards.length - faceUpCount;
  return Math.max(
    C.FACE_UP_OFFSET_MIN,
    Math.min(
      C.FACE_UP_OFFSET,
      (C.COLUMN_BOTTOM_LIMIT -
        C.TABLEAU_Y -
        C.CARD_H -
        faceDownCount * C.FACE_DOWN_OFFSET) /
        Math.max(1, faceUpCount - 1),
    ),
  );
}
function pileRect(
  pile: "foundation" | "tableau",
  i: number,
  s: DeepReadonly<CascadeState>,
) {
  const x = pile === "foundation" ? C.FOUNDATION_X[i]! : C.COLUMN_X[i]!;
  const y = pile === "foundation" ? C.TOP_ROW_Y : C.TABLEAU_Y;
  const p = pile === "foundation" ? s.foundations[i]! : s.tableau[i]!;
  let h = C.CARD_H;
  if (pile === "tableau" && p.length) {
    const fd = p.slice(0, -1).filter((c) => !c.faceUp).length,
      fu = p.length - 1 - fd;
    const off = Math.max(
      C.FACE_UP_OFFSET_MIN,
      Math.min(
        C.FACE_UP_OFFSET,
        (C.COLUMN_BOTTOM_LIMIT -
          C.TABLEAU_Y -
          C.CARD_H -
          fd * C.FACE_DOWN_OFFSET) /
          Math.max(1, fu),
      ),
    );
    h = C.CARD_H + fd * C.FACE_DOWN_OFFSET + fu * off;
  }
  return { x, y, w: C.CARD_W, h };
}
function accepts(
  s: DeepReadonly<CascadeState>,
  cards: readonly CardState[],
  pile: "foundation" | "tableau",
  i: number,
) {
  if (
    !cards.length ||
    cards.some(
      (c, j) =>
        !c.faceUp ||
        (j > 0 &&
          (cards[j - 1]!.rank !== c.rank + 1 ||
            RED.has(cards[j - 1]!.suit) === RED.has(c.suit))),
    )
  )
    return false;
  if (pile === "foundation") {
    if (cards.length !== 1) return false;
    const p = s.foundations[i]!;
    return p.length
      ? p[p.length - 1]!.suit === cards[0]!.suit &&
          p[p.length - 1]!.rank + 1 === cards[0]!.rank
      : cards[0]!.rank === 1;
  }
  return canColumn(s.tableau[i]!, cards[0]!);
}
function attempt(
  s: any,
  from: PileKind,
  idx: number,
  row: number,
  to: "foundation" | "tableau",
  ti: number,
): [CascadeState, boolean] {
  validIndex(from, idx);
  validIndex(to, ti);
  const source =
    from === "waste"
      ? s.waste
      : from === "stock"
        ? s.stock
        : from === "foundation"
          ? s.foundations[idx]!
          : s.tableau[idx]!;
  if (from === "stock" || row < 0 || row >= source.length) return [s, false];
  if (from === "waste" && (row !== source.length - 1 || !s.wasteSets.length))
    return [s, false];
  if (from === "foundation" && row !== source.length - 1) return [s, false];
  const cards = source.slice(row);
  if (!accepts(s, cards, to, ti)) return [s, false];
  const n = copies(s);
  const piles =
    from === "waste"
      ? n.waste
      : from === "foundation"
        ? n.foundations[idx]!
        : n.tableau[idx]!;
  piles.splice(row);
  if (from === "waste") {
    const sets = [...n.wasteSets];
    for (let j = 0; j < cards.length; j++) {
      let q = sets.length - 1;
      while (q >= 0 && sets[q] === 0) q--;
      if (q >= 0) sets[q]!--;
    }
    n.wasteSets = sets.filter((x: number) => x > 0);
  }
  if (
    from === "tableau" &&
    n.autoFlip &&
    piles.length &&
    !piles[piles.length - 1]!.faceUp
  )
    piles[piles.length - 1] = { ...piles[piles.length - 1]!, faceUp: true };
  (to === "foundation" ? n.foundations[ti]! : n.tableau[ti]!).push(...cards);
  if (
    n.winDetect &&
    n.foundations.every((p: CardState[]) => p.length === C.RANK_MAX)
  ) {
    n.screen = "won";
    n.launchClock = C.LAUNCH_INTERVAL;
    n.tableau = Array.from({ length: C.TABLEAU_COLUMNS }, () => []);
    n.stock = [];
    n.waste = [];
    n.wasteSets = [];
  }
  return [n, true];
}
function turn(s: any) {
  if (s.stock.length) {
    const count = Math.min(C.TURN_COUNT, s.stock.length);
    const group = s.stock
      .slice(-count)
      .reverse()
      .map((c: CardState) => ({ ...c, faceUp: true }));
    return {
      ...s,
      stock: s.stock.slice(0, -count),
      waste: [...s.waste, ...group],
      wasteSets: [...s.wasteSets, count],
    };
  }
  if (!s.waste.length) return s;
  return {
    ...s,
    stock: [...s.waste].reverse().map((c) => ({ ...c, faceUp: false })),
    waste: [],
    wasteSets: [],
  };
}
function currentDrop(
  s: DeepReadonly<CascadeState>,
  x: number,
  y: number,
): DropTargetState | null {
  if (!s.drag) return null;
  const cx = x,
    cy = y;
  for (let i = 0; i < C.FOUNDATION_COUNT; i++) {
    const r = pileRect("foundation", i, s);
    if (
      cx >= r.x &&
      cx < r.x + r.w &&
      cy >= r.y &&
      cy < r.y + r.h &&
      accepts(s, s.drag.cards, "foundation", i)
    )
      return { pile: "foundation", index: i };
  }
  for (let i = 0; i < C.TABLEAU_COLUMNS; i++) {
    const r = pileRect("tableau", i, s);
    if (
      cx >= r.x &&
      cx < r.x + r.w &&
      cy >= r.y &&
      cy < r.y + r.h &&
      accepts(s, s.drag.cards, "tableau", i)
    )
      return { pile: "tableau", index: i };
  }
  return null;
}
function menuRect(screen: Screen, i: number) {
  if (screen === "title" && i >= 0 && i < 2)
    return { x: 470, y: 390 + i * 72, w: 340, h: 54 };
  if (screen === "howto" && i === 0) return { x: 520, y: 590, w: 240, h: 58 };
  if (screen === "playing" && i >= 0 && i < 3)
    return { x: 386 + i * 174, y: 680, w: 160, h: 36 };
  return null;
}
function activate(s: CascadeState, i: number): CascadeState {
  if (s.screen === "title") {
    if (i < 0 || i > 1) return s;
    const n = { ...s, titleIndex: i, menuIndex: i };
    return i === 0
      ? { ...deal(n), screen: "playing", menuIndex: 0 }
      : { ...n, screen: "howto", menuIndex: 0 };
  }
  if (s.screen === "howto")
    return i === 0 ? { ...s, screen: "title", menuIndex: s.titleIndex } : s;
  if (s.screen === "playing") {
    if (i === 0) return { ...deal(s), screen: "playing", menuIndex: 0 };
    if (i === 1) return { ...s, screen: "title", menuIndex: s.titleIndex };
    if (i === 2) return { ...s, muted: !s.muted };
  }
  return s;
}
function point(
  s: any,
  x: number,
  y: number,
  type: "down" | "move" | "up",
): CascadeState {
  const n = { ...s, pointer: { x, y, down: type !== "up" } };
  if (n.screen === "won") {
    if (type === "down") return { ...deal(n), screen: "playing", menuIndex: 0 };
    return n;
  }
  if (n.screen !== "playing") {
    let hovered = -1;
    const count = n.screen === "title" ? 2 : 1;
    for (let i = 0; i < count; i++) {
      const r = menuRect(n.screen, i)!;
      if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) hovered = i;
    }
    if (hovered >= 0) n.menuIndex = hovered;
    if (type === "down") n.lastPress = { x, y, at: n.simTime };
    if (type === "up" && n.lastPress) {
      const a = n.lastPress;
      for (let i = 0; i < count; i++) {
        const r = menuRect(n.screen, i)!;
        if (
          x >= r.x &&
          x <= r.x + r.w &&
          y >= r.y &&
          y <= r.y + r.h &&
          a.x >= r.x &&
          a.x <= r.x + r.w &&
          a.y >= r.y &&
          a.y <= r.y + r.h
        )
          return activate(n, i);
      }
      n.lastPress = null;
    }
    return n;
  }
  if (type === "move") {
    if (n.screen === "playing") {
      for (let i = 0; i < C.HUD_ITEMS.length; i++) {
        const rect = menuRect("playing", i)!;
        if (
          x >= rect.x &&
          x <= rect.x + rect.w &&
          y >= rect.y &&
          y <= rect.y + rect.h
        )
          n.menuIndex = i;
      }
    }
    if (n.drag) {
      const dx = x - s.pointer.x,
        dy = y - s.pointer.y;
      n.drag = { ...n.drag, x: n.drag.x + dx, y: n.drag.y + dy };
      n.dropTarget = currentDrop(
        n,
        n.drag.x + C.CARD_W / 2,
        n.drag.y + C.CARD_H / 2,
      );
    }
    return n;
  }
  if (type === "down") {
    const previousPress = n.lastPress;
    n.lastPress = { x, y, at: n.simTime };
    if (n.screen === "playing") {
      for (let i = 0; i < C.HUD_ITEMS.length; i++) {
        const rect = menuRect("playing", i)!;
        if (
          x >= rect.x &&
          x <= rect.x + rect.w &&
          y >= rect.y &&
          y <= rect.y + rect.h
        ) {
          n.menuIndex = i;
          return n;
        }
      }
    }
    let found: {
      pile: "waste" | "foundation" | "tableau";
      index: number;
      row: number;
      card: CardState;
      x: number;
      y: number;
    } | null = null;
    for (let i = 0; i < C.TABLEAU_COLUMNS; i++) {
      const p = n.tableau[i]!;
      for (let j = p.length - 1; j >= 0; j--) {
        const yy =
          C.TABLEAU_Y +
          p
            .slice(0, j)
            .reduce(
              (v: number, c: CardState) =>
                v + (c.faceUp ? columnFaceOffset(p) : C.FACE_DOWN_OFFSET),
              0,
            );
        if (
          x >= C.COLUMN_X[i]! &&
          x < C.COLUMN_X[i]! + C.CARD_W &&
          y >= yy &&
          y < yy + C.CARD_H
        ) {
          if (p[j]!.faceUp)
            found = {
              pile: "tableau",
              index: i,
              row: j,
              card: p[j]!,
              x: C.COLUMN_X[i]!,
              y: yy,
            };
          break;
        }
      }
      if (found) break;
    }
    if (!found) {
      const vis = n.wasteSets[n.wasteSets.length - 1] ?? 0;
      for (let k = vis - 1; k >= 0; k--) {
        const pos = n.waste.length - vis + k,
          xx = C.WASTE_X + k * C.WASTE_FAN;
        if (
          x >= xx &&
          x < xx + C.CARD_W &&
          y >= C.TOP_ROW_Y &&
          y < C.TOP_ROW_Y + C.CARD_H
        ) {
          if (pos === n.waste.length - 1)
            found = {
              pile: "waste",
              index: 0,
              row: pos,
              card: n.waste[pos]!,
              x: xx,
              y: C.TOP_ROW_Y,
            };
          break;
        }
      }
    }
    if (!found)
      for (let i = 0; i < C.FOUNDATION_COUNT; i++) {
        const p = n.foundations[i]!;
        if (
          p.length &&
          x >= C.FOUNDATION_X[i]! &&
          x < C.FOUNDATION_X[i]! + C.CARD_W &&
          y >= C.TOP_ROW_Y &&
          y < C.TOP_ROW_Y + C.CARD_H
        ) {
          found = {
            pile: "foundation",
            index: i,
            row: p.length - 1,
            card: p[p.length - 1]!,
            x: C.FOUNDATION_X[i]!,
            y: C.TOP_ROW_Y,
          };
          break;
        }
      }
    if (found) {
      if (
        previousPress &&
        n.simTime - previousPress.at <= C.DOUBLE_CLICK_WINDOW &&
        Math.hypot(x - previousPress.x, y - previousPress.y) <=
          C.DOUBLE_CLICK_SLOP &&
        (found.pile === "waste" ||
          (found.pile === "tableau" &&
            found.row === n.tableau[found.index]!.length - 1))
      ) {
        const fi = foundationFor(n, found.card);
        if (fi >= 0) {
          const [m, ok] = attempt(
            n,
            found.pile,
            found.index,
            found.row,
            "foundation",
            fi,
          );
          if (ok) return { ...m, lastPress: { x, y, at: n.simTime } };
        }
      }
      const source =
        found.pile === "waste"
          ? n.waste
          : found.pile === "foundation"
            ? n.foundations[found.index]!
            : n.tableau[found.index]!;
      const cards = source.slice(found.row);
      if (
        found.pile === "waste" &&
        !(n.wasteSets.length && found.row === n.waste.length - 1)
      )
        return n;
      const copy = copies(n);
      (found.pile === "waste"
        ? copy.waste
        : found.pile === "foundation"
          ? copy.foundations[found.index]!
          : copy.tableau[found.index]!
      ).splice(found.row);
      copy.drag = {
        cards,
        fromPile: found.pile,
        fromIndex: found.index,
        x: found.x,
        y: found.y,
      };
      copy.dropTarget = currentDrop(copy, x, y);
      return copy;
    }
    if (
      x >= C.STOCK_X &&
      x < C.STOCK_X + C.CARD_W &&
      y >= C.TOP_ROW_Y &&
      y < C.TOP_ROW_Y + C.CARD_H
    )
      return n;
    return n;
  }
  if (type === "up") {
    if (n.drag) {
      const drag = n.drag;
      const dist = Math.hypot(
        x - (n.lastPress?.x ?? x),
        y - (n.lastPress?.y ?? y),
      );
      const restored = copies(n);
      pile(restored, drag.fromPile, drag.fromIndex).push(...drag.cards);
      if (dist > C.DRAG_THRESHOLD) {
        const target = currentDrop(
          n,
          drag.x + (x - s.pointer.x) + C.CARD_W / 2,
          drag.y + (y - s.pointer.y) + C.CARD_H / 2,
        );
        if (target) {
          const [m, ok] = attempt(
            restored,
            drag.fromPile,
            drag.fromIndex,
            drag.fromPile === "waste"
              ? restored.waste.length - drag.cards.length
              : drag.fromPile === "foundation"
                ? restored.foundations[drag.fromIndex]!.length -
                  drag.cards.length
                : restored.tableau[drag.fromIndex]!.length - drag.cards.length,
            target.pile,
            target.index,
          );
          if (ok)
            return {
              ...m,
              drag: null,
              dropTarget: null,
              pointer: { x, y, down: false },
            };
        }
      }
      return {
        ...restored,
        drag: null,
        dropTarget: null,
        pointer: { x, y, down: false },
      };
    }
    for (let i = 0; i < C.HUD_ITEMS.length; i++) {
      const r = menuRect("playing", i)!;
      if (
        x >= r.x &&
        x <= r.x + r.w &&
        y >= r.y &&
        y <= r.y + r.h &&
        n.lastPress &&
        n.lastPress.x >= r.x &&
        n.lastPress.x <= r.x + r.w &&
        n.lastPress.y >= r.y &&
        n.lastPress.y <= r.y + r.h
      )
        return activate(n, i);
    }
    if (
      n.lastPress &&
      Math.hypot(x - n.lastPress.x, y - n.lastPress.y) <= C.DRAG_THRESHOLD &&
      n.lastPress.x >= C.STOCK_X &&
      n.lastPress.x < C.STOCK_X + C.CARD_W &&
      n.lastPress.y >= C.TOP_ROW_Y &&
      n.lastPress.y < C.TOP_ROW_Y + C.CARD_H
    )
      return turn(n);
    return n;
  }
  return n;
}
function snapshot(s: DeepReadonly<CascadeState>): CascadeSnapshot {
  const card = (c: CardState) => ({
    ...c,
    color: RED.has(c.suit) ? ("red" as const) : ("black" as const),
  });
  return {
    version: C.CASCADE_DEBUG_VERSION,
    screen: s.screen,
    menuIndex: s.menuIndex,
    titleIndex: s.titleIndex,
    dealMode: C.DEAL_MODE,
    turnCount: C.TURN_COUNT,
    dealModeLabel: C.DEAL_MODE_LABEL,
    muted: s.muted,
    autoFlip: s.autoFlip,
    winDetect: s.winDetect,
    launching: s.launching,
    trailPainting: s.trailPainting,
    stock: s.stock.map(card),
    waste: s.waste.map(card),
    wasteSets: [...s.wasteSets],
    wasteVisibleCount: s.wasteSets[s.wasteSets.length - 1] ?? 0,
    foundations: s.foundations.map((p) => p.map(card)),
    tableau: s.tableau.map((p) => p.map(card)),
    drag: s.drag
      ? ({ ...s.drag, cards: s.drag.cards.map(card) } as DragState)
      : null,
    dropTarget: s.drag
      ? currentDrop(s, s.drag.x + C.CARD_W / 2, s.drag.y + C.CARD_H / 2)
      : null,
    pointer: { ...s.pointer },
    lastPress: s.lastPress ? { ...s.lastPress } : null,
    launchClock: s.launchClock,
    launched: s.launched,
    flyers: s.flyers.map((f) => ({ ...f })),
    cascadeDone: s.cascadeDone,
    trailStamps: s.trailStamps,
    simTime: s.simTime,
  };
}
function pile(s: any, p: PileKind, i: number): CardState[] {
  validIndex(p, i);
  return p === "stock"
    ? s.stock
    : p === "waste"
      ? s.waste
      : p === "foundation"
        ? s.foundations[i]!
        : s.tableau[i]!;
}
function stateDebug(): CascadeDebugApi {
  const debug: any = { version: C.CASCADE_DEBUG_VERSION };
  debug.reset = (s: any) => ({ ...empty(), muted: s.muted });
  debug.snapshot = snapshot;
  debug.reconcile = (s: any) => copies(s);
  debug.menuItemRect = (s: any, i: number) => menuRect(s.screen, i);
  debug.setScreen = (s: any, v: any) => ({ ...s, screen: v });
  debug.setMenuIndex = (s: any, v: number) => ({ ...s, menuIndex: v });
  debug.setTitleIndex = (s: any, v: number) => ({ ...s, titleIndex: v });
  debug.addCard = (
    s: any,
    p: PileKind,
    i: number,
    suit: Suit,
    r: number,
    up: boolean,
  ) => {
    validIndex(p, i);
    if (!C.SUITS.includes(suit)) throw new Error(`Invalid suit ${suit}`);
    if (!Number.isInteger(r) || r < C.RANK_MIN || r > C.RANK_MAX)
      throw new RangeError(`Invalid rank ${r}`);
    const n = copies(s),
      c = { id: n.nextId++, suit, rank: r, faceUp: up };
    pile(n, p, i).push(c);
    return n;
  };
  debug.removeCard = (s: any, id: number) => {
    const n = copies(s);
    for (const p of [n.stock, n.waste, ...n.foundations, ...n.tableau]) {
      const i = p.findIndex((c: CardState) => c.id === id);
      if (i >= 0) {
        p.splice(i, 1);
        if (p === n.waste) {
          let q = n.wasteSets.length - 1;
          while (q >= 0 && n.wasteSets[q] === 0) q--;
          if (q >= 0) n.wasteSets[q]!--;
          n.wasteSets = n.wasteSets.filter((x: number) => x > 0);
        }
        return n;
      }
    }
    throw new Error(`Unknown card id ${id}`);
  };
  debug.setCardFaceUp = (s: any, id: number, v: boolean) => {
    const n = copies(s);
    for (const p of [n.stock, n.waste, ...n.foundations, ...n.tableau]) {
      const i = p.findIndex((c: CardState) => c.id === id);
      if (i >= 0) {
        p[i] = { ...p[i]!, faceUp: v };
        return n;
      }
    }
    throw new Error(`Unknown card id ${id}`);
  };
  debug.clearPile = (s: any, p: PileKind, i: number) => {
    const n = copies(s);
    pile(n, p, i).length = 0;
    if (p === "waste") n.wasteSets = [];
    return n;
  };
  debug.clearTable = (s: any) => ({
    ...s,
    stock: [],
    waste: [],
    wasteSets: [],
    foundations: Array.from({ length: C.FOUNDATION_COUNT }, () => []),
    tableau: Array.from({ length: C.TABLEAU_COLUMNS }, () => []),
    drag: null,
    dropTarget: null,
  });
  debug.addWasteSet = (s: any, c: number) => {
    if (!Number.isInteger(c) || c < 0)
      throw new RangeError(`Invalid count ${c}`);
    return { ...s, wasteSets: [...s.wasteSets, c] };
  };
  debug.clearWasteSets = (s: any) => ({ ...s, wasteSets: [] });
  debug.deal = (s: any) => deal(s);
  debug.turnStock = (s: any) => turn(copies(s));
  debug.move = (
    s: any,
    fp: PileKind,
    fi: number,
    row: number,
    tp: "foundation" | "tableau",
    ti: number,
  ) => attempt(copies(s), fp, fi, row, tp, ti);
  debug.autoMove = (s: any, p: "waste" | "tableau", i: number) => {
    validIndex(p, i);
    const q = p === "waste" ? s.waste : s.tableau[i];
    const c =
      p === "waste"
        ? q[q.length - 1]
        : q[q.length - 1]?.faceUp
          ? q[q.length - 1]
          : undefined;
    if (!c) return [s, false];
    const f = foundationFor(s, c);
    return f < 0
      ? [s, false]
      : attempt(copies(s), p, i, q.length - 1, "foundation", f);
  };
  for (const [name, type] of [
    ["pointerDown", "down"],
    ["pointerMove", "move"],
    ["pointerUp", "up"],
  ] as const)
    debug[name] = (s: any, x: number, y: number) =>
      point(copies(s), x, y, type);
  for (const [name, key] of [
    ["setAutoFlip", "autoFlip"],
    ["setWinDetect", "winDetect"],
    ["setLaunching", "launching"],
    ["setTrailPainting", "trailPainting"],
  ] as const)
    debug[name] = (s: any, v: boolean) => ({ ...s, [key]: v });
  debug.addFlyer = (
    s: any,
    suit: Suit,
    rank: number,
    x: number,
    y: number,
    vx: number,
    vy: number,
  ) => {
    if (!C.SUITS.includes(suit)) throw new Error(`Invalid suit ${suit}`);
    if (!Number.isInteger(rank) || rank < C.RANK_MIN || rank > C.RANK_MAX)
      throw new RangeError(`Invalid rank ${rank}`);
    return {
      ...s,
      flyers: [...s.flyers, { id: s.nextId, suit, rank, x, y, vx, vy }],
      nextId: s.nextId + 1,
    };
  };
  const requireFlyer = (state: any, id: number) => {
    if (!state.flyers.some((flyer: FlyerState) => flyer.id === id))
      throw new Error(`Unknown flyer id ${id}`);
  };
  debug.setFlyerPosition = (s: any, id: number, x: number, y: number) => {
    requireFlyer(s, id);
    return {
      ...s,
      flyers: s.flyers.map((f: FlyerState) =>
        f.id === id ? { ...f, x, y } : f,
      ),
    };
  };
  debug.setFlyerVelocity = (s: any, id: number, vx: number, vy: number) => {
    requireFlyer(s, id);
    return {
      ...s,
      flyers: s.flyers.map((f: FlyerState) =>
        f.id === id ? { ...f, vx, vy } : f,
      ),
    };
  };
  debug.removeFlyer = (s: any, id: number) => {
    requireFlyer(s, id);
    return { ...s, flyers: s.flyers.filter((f: FlyerState) => f.id !== id) };
  };
  debug.clearFlyers = (s: any) => ({ ...s, flyers: [] });
  debug.setLaunchClock = (s: any, v: number) => ({ ...s, launchClock: v });
  debug.clearTrail = (s: any) => ({ ...s, trailStamps: 0 });
  debug.drawLaunchVx = () =>
    (Math.random() < 0.5 ? -1 : 1) *
    (C.LAUNCH_VX_MIN + Math.random() * (C.LAUNCH_VX_MAX - C.LAUNCH_VX_MIN));
  return debug;
}
function drawCard(
  ctx: CanvasRenderingContext2D,
  c: CardState,
  x: number,
  y: number,
) {
  ctx.save();
  ctx.shadowColor = "#092b22";
  ctx.shadowBlur = 5;
  ctx.shadowOffsetY = 3;
  ctx.fillStyle = c.faceUp ? "#fffdf5" : "#183c69";
  ctx.strokeStyle = c.faceUp ? "#d8d2c4" : "#a9c8d4";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x, y, C.CARD_W, C.CARD_H, 9);
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  if (c.faceUp) {
    ctx.fillStyle = RED.has(c.suit) ? "#c83d48" : "#172532";
    ctx.font = "bold 23px Georgia";
    ctx.textAlign = "left";
    ctx.fillText(rank(c.rank), x + 9, y + 27);
    ctx.font = "23px Georgia";
    ctx.fillText(
      ({ spades: "♠", hearts: "♥", diamonds: "♦", clubs: "♣" } as const)[
        c.suit
      ],
      x + 9,
      y + 51,
    );
    ctx.textAlign = "center";
    ctx.font = "50px Georgia";
    ctx.fillText(
      ({ spades: "♠", hearts: "♥", diamonds: "♦", clubs: "♣" } as const)[
        c.suit
      ],
      x + 50,
      y + 93,
    );
  } else {
    ctx.strokeStyle = "#d4e2d3";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 8, y + 8, C.CARD_W - 16, C.CARD_H - 16);
    ctx.strokeStyle = "#7193a1";
    for (let a = 0; a < 5; a++) {
      ctx.beginPath();
      ctx.moveTo(x + 12, y + 15 + a * 23);
      ctx.lineTo(x + 88, y + 90 + a * 5);
      ctx.stroke();
    }
  }
  ctx.restore();
}
function drawSlot(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.fillStyle = "rgba(10,43,34,.22)";
  ctx.strokeStyle = "rgba(218,237,213,.37)";
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.roundRect(x, y, C.CARD_W, C.CARD_H, 9);
  ctx.fill();
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}
function drawButton(
  ctx: CanvasRenderingContext2D,
  label: string,
  r: { x: number; y: number; w: number; h: number },
  sel: boolean,
) {
  ctx.save();
  ctx.fillStyle = sel ? "#e8c778" : "rgba(8,36,30,.65)";
  ctx.strokeStyle = sel ? "#fff0b4" : "rgba(220,236,212,.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(r.x, r.y, r.w, r.h, 12);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = sel ? "#173b30" : "#f7f1df";
  ctx.font = "600 18px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, r.x + r.w / 2, r.y + r.h / 2);
  ctx.restore();
}

let trailCanvas: HTMLCanvasElement | null = null;
let renderedTrailStamps = 0;
function paintTrail(
  s: DeepReadonly<CascadeState>,
  ctx: CanvasRenderingContext2D,
) {
  if (typeof document === "undefined") return;
  if (!trailCanvas) {
    trailCanvas = document.createElement("canvas");
    trailCanvas.width = C.STAGE_W;
    trailCanvas.height = C.STAGE_H;
  }
  const trail = trailCanvas.getContext("2d");
  if (!trail) return;
  if (s.trailStamps < renderedTrailStamps) {
    trail.clearRect(0, 0, C.STAGE_W, C.STAGE_H);
    renderedTrailStamps = 0;
  }
  if (s.trailStamps > renderedTrailStamps) {
    for (const flyer of s.flyers)
      drawCard(trail, { ...flyer, faceUp: true }, flyer.x, flyer.y);
    renderedTrailStamps = s.trailStamps;
  }
  if (s.screen === "won") ctx.drawImage(trailCanvas, 0, 0);
}

function renderGame(s: DeepReadonly<CascadeState>, api: RenderApi) {
  const ctx = api.ctx as CanvasRenderingContext2D;
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, C.STAGE_W, C.STAGE_H);
  const gradient = ctx.createRadialGradient(640, 350, 70, 640, 350, 750);
  gradient.addColorStop(0, "#21664d");
  gradient.addColorStop(1, "#123e33");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, C.STAGE_W, C.STAGE_H);
  // Felt grain and subtle table border.
  ctx.strokeStyle = "rgba(226,213,157,.13)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(26, 18, 1228, 660, 28);
  ctx.stroke();
  paintTrail(s, ctx);
  if (s.screen === "playing" || s.screen === "won") {
    for (let i = 0; i < C.TABLEAU_COLUMNS; i++)
      drawSlot(ctx, C.COLUMN_X[i]!, C.TABLEAU_Y);
    drawSlot(ctx, C.STOCK_X, C.TOP_ROW_Y);
    if (!(s.wasteSets[s.wasteSets.length - 1] ?? 0))
      drawSlot(ctx, C.WASTE_X, C.TOP_ROW_Y);
    for (let i = 0; i < C.FOUNDATION_COUNT; i++)
      if (!s.foundations[i]!.length)
        drawSlot(ctx, C.FOUNDATION_X[i]!, C.TOP_ROW_Y);
    for (const c of s.stock.slice(-1)) drawCard(ctx, c, C.STOCK_X, C.TOP_ROW_Y);
    const vis = s.wasteSets[s.wasteSets.length - 1] ?? 0;
    for (let j = Math.max(0, s.waste.length - vis); j < s.waste.length; j++)
      drawCard(
        ctx,
        s.waste[j]!,
        C.WASTE_X + (j - Math.max(0, s.waste.length - vis)) * C.WASTE_FAN,
        C.TOP_ROW_Y,
      );
    for (let i = 0; i < C.FOUNDATION_COUNT; i++) {
      const p = s.foundations[i]!;
      if (p.length)
        drawCard(ctx, p[p.length - 1]!, C.FOUNDATION_X[i]!, C.TOP_ROW_Y);
    }
    for (let i = 0; i < C.TABLEAU_COLUMNS; i++) {
      const p = s.tableau[i]!;
      let y = C.TABLEAU_Y;
      const off = columnFaceOffset(p);
      for (const c of p) {
        if (!(
          s.drag?.fromPile === "tableau" &&
          s.drag.fromIndex === i &&
          s.drag.cards.some((d) => d.id === c.id)
        ))
          drawCard(ctx, c, C.COLUMN_X[i]!, y);
        y += c.faceUp ? off : C.FACE_DOWN_OFFSET;
      }
    }
    if (s.drag) {
      for (let i = 0; i < s.drag.cards.length; i++)
        drawCard(ctx, s.drag.cards[i]!, s.drag.x, s.drag.y + i * 26);
    }
    if (s.dropTarget) {
      const r = pileRect(s.dropTarget.pile, s.dropTarget.index, s);
      ctx.save();
      ctx.strokeStyle = "#f4d376";
      ctx.lineWidth = 4;
      ctx.shadowColor = "#f4d376";
      ctx.shadowBlur = 15;
      ctx.strokeRect(r.x - 3, r.y - 3, r.w + 6, Math.min(r.h, C.CARD_H) + 6);
      ctx.restore();
    }
    if (s.screen === "won")
      for (const f of s.flyers) drawCard(ctx, { ...f, faceUp: true }, f.x, f.y);
    ctx.fillStyle = "rgba(8,31,27,.85)";
    ctx.fillRect(0, C.HUD_Y, C.STAGE_W, C.HUD_H);
    for (let i = 0; i < C.HUD_ITEMS.length; i++)
      drawButton(
        ctx,
        C.HUD_ITEMS[i]!,
        menuRect("playing", i)!,
        s.menuIndex === i,
      );
    ctx.fillStyle = "#e9d9a6";
    ctx.font = "600 14px system-ui";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(C.DEAL_MODE_LABEL, 1200, C.HUD_Y + 18);
    if (s.screen === "won" && s.cascadeDone) {
      ctx.fillStyle = "rgba(9,35,28,.35)";
      ctx.fillRect(0, 0, C.STAGE_W, C.STAGE_H);
      ctx.fillStyle = "#fff0bd";
      ctx.textAlign = "center";
      ctx.font = "bold 60px Georgia";
      ctx.fillText(C.WIN_TEXT, 640, 350);
    }
  }
  if (s.screen === "title" || s.screen === "howto") {
    ctx.fillStyle = "rgba(8,35,29,.55)";
    ctx.fillRect(0, 0, C.STAGE_W, C.STAGE_H);
    if (s.screen === "title") {
      ctx.textAlign = "center";
      ctx.fillStyle = "#f4e7bd";
      ctx.font = "bold 86px Georgia";
      ctx.fillText(C.TITLE_TEXT, 640, 214);
      ctx.fillStyle = "#d6d8bd";
      ctx.font = "600 20px system-ui";
      ctx.fillText(C.TAGLINE_TEXT, 640, 254);
      for (let i = 0; i < 2; i++)
        drawButton(
          ctx,
          C.TITLE_ITEMS[i]!,
          menuRect("title", i)!,
          s.menuIndex === i,
        );
      ctx.fillStyle = "#e7d9ab";
      ctx.font = "600 15px system-ui";
      ctx.fillText(C.DEAL_MODE_LABEL, 640, 566);
    } else {
      ctx.textAlign = "center";
      ctx.fillStyle = "#f4e7bd";
      ctx.font = "bold 38px Georgia";
      ctx.fillText("HOW TO PLAY", 640, 130);
      ctx.textAlign = "left";
      ctx.fillStyle = "#f4f0df";
      ctx.font = "20px system-ui";
      const lines = [
        "Build all four foundations from ACE to King.",
        "On the tableau, build down in rank and alternate colors.",
        "Only a KING can fill an empty column.",
        "Turn the STOCK to reveal cards; recycle when it runs out.",
        "Drag a card or run to move it. DOUBLE-CLICK a playable card to send it home.",
      ];
      lines.forEach((l, i) => ctx.fillText(l, 258, 220 + i * 56));
      drawButton(
        ctx,
        C.HOWTO_BACK_LABEL,
        menuRect("howto", 0)!,
        s.menuIndex === 0,
      );
    }
  }
}
export const game: Game<CascadeState, CascadeDebugApi> = {
  initialize(api: InitApi<CascadeState>) {
    for (const [name, freq] of [
      [C.CUES.deal, 360],
      [C.CUES.turn, 520],
      [C.CUES.recycle, 280],
      [C.CUES.lift, 620],
      [C.CUES.drop, 460],
      [C.CUES.reject, 180],
      [C.CUES.flip, 740],
      [C.CUES.home, 880],
      [C.CUES.launch, 300],
      [C.CUES.win, 990],
    ] as const)
      api.audio.define(name, {
        wave: "sine",
        freq,
        freqTo: freq * 0.6,
        gain: 0.12,
        durationMs: 100,
      });
    for (const [name, read] of [
      [
        "screen",
        (s: DeepReadonly<CascadeState>) => `${s.screen} / ${C.DEAL_MODE}`,
      ],
      ["stock", (s: DeepReadonly<CascadeState>) => s.stock.length],
      ["waste", (s: DeepReadonly<CascadeState>) => s.waste.length],
      ...[0, 1, 2, 3].map(
        (i) =>
          [
            `foundation ${i + 1}`,
            (s: DeepReadonly<CascadeState>) => s.foundations[i]!.length,
          ] as const,
      ),
      ...[0, 1, 2, 3, 4, 5, 6].map(
        (i) =>
          [
            `column ${i + 1}`,
            (s: DeepReadonly<CascadeState>) => s.tableau[i]!.length,
          ] as const,
      ),
      [
        "hand",
        (s: DeepReadonly<CascadeState>) =>
          s.drag ? `yes (${s.drag.cards.length})` : "no",
      ],
      [
        "cascade",
        (s: DeepReadonly<CascadeState>) =>
          `${s.launched} launched / ${s.flyers.length} flying`,
      ],
    ] as const)
      api.diagnostics.register(name, read);
    for (const [a, keys] of Object.entries(C.MENU_BINDINGS))
      api.input.register(a, { keys: [...keys] });
    return [empty(), stateDebug()];
  },
  update(state: DeepReadonly<CascadeState>, api: UpdateApi, dt: number) {
    let s = copies(state);
    s.simTime += dt;
    s.muted = api.audio.muted();
    api.audio.setMuted(s.muted);
    const cue = new Set<string>();
    const samples = api.input.pointerSamples().filter((p) => p.primary);
    for (const p of samples) {
      const before = s;
      s = point(s, p.x, p.y, p.type);
      if (p.type === "down" && !before.drag && s.drag) cue.add(C.CUES.lift);
      const beforeHomes = before.foundations.reduce(
        (sum: number, pile: readonly CardState[]) => sum + pile.length,
        0,
      );
      const afterHomes = s.foundations.reduce(
        (sum: number, pile: readonly CardState[]) => sum + pile.length,
        0,
      );
      if (afterHomes > beforeHomes) cue.add(C.CUES.home);
      const faceDownBefore = before.tableau.reduce(
        (sum: number, pile: readonly CardState[]) =>
          sum + pile.filter((card: CardState) => !card.faceUp).length,
        0,
      );
      const faceDownAfter = s.tableau.reduce(
        (sum: number, pile: readonly CardState[]) =>
          sum + pile.filter((card: CardState) => !card.faceUp).length,
        0,
      );
      if (faceDownAfter < faceDownBefore) cue.add(C.CUES.flip);
      if (before.screen !== "won" && s.screen === "won") cue.add(C.CUES.win);
      if (p.type === "up" && before.drag && !s.drag) {
        const foundationCount = (board: DeepReadonly<CascadeState>) =>
          board.foundations.reduce((sum, pile) => sum + pile.length, 0);
        const faceDownCount = (board: DeepReadonly<CascadeState>) =>
          board.tableau.reduce(
            (sum, pile) => sum + pile.filter((card) => !card.faceUp).length,
            0,
          );
        if (faceDownCount(s) < faceDownCount(before)) cue.add(C.CUES.flip);
        if (foundationCount(s) > foundationCount(before)) {
          cue.add(C.CUES.drop);
          cue.add(C.CUES.home);
        } else if (
          before.dropTarget?.pile === "tableau" &&
          s.tableau[before.dropTarget.index]!.length >
            before.tableau[before.dropTarget.index]!.length
        )
          cue.add(C.CUES.drop);
        else if (
          p.x - (before.lastPress?.x ?? p.x) > C.DRAG_THRESHOLD ||
          Math.hypot(
            p.x - (before.lastPress?.x ?? p.x),
            p.y - (before.lastPress?.y ?? p.y),
          ) > C.DRAG_THRESHOLD
        )
          cue.add(C.CUES.reject);
      }
      if (
        p.type === "up" &&
        before.lastPress &&
        Math.hypot(p.x - before.lastPress.x, p.y - before.lastPress.y) <=
          C.DRAG_THRESHOLD &&
        before.lastPress.x >= C.STOCK_X &&
        before.lastPress.x < C.STOCK_X + C.CARD_W &&
        before.lastPress.y >= C.TOP_ROW_Y &&
        before.lastPress.y < C.TOP_ROW_Y + C.CARD_H
      ) {
        if (s.stock.length < before.stock.length) cue.add(C.CUES.turn);
        else if (s.stock.length > before.stock.length) cue.add(C.CUES.recycle);
      }
      if (before.screen !== "won" && s.screen === "won") cue.add(C.CUES.win);
      if (
        (before.screen !== "playing" && s.screen === "playing") ||
        (s.nextId > before.nextId && s.stock.length === C.DEAL_STOCK_CARDS)
      )
        cue.add(C.CUES.deal);
    }
    const up = s.screen !== "won" && api.input.pressed(C.MENU_UP);
    const down = s.screen !== "won" && api.input.pressed(C.MENU_DOWN);
    const confirm = s.screen !== "won" && api.input.pressed(C.MENU_CONFIRM);
    const back = s.screen !== "won" && api.input.pressed(C.MENU_BACK);
    if (s.screen !== "won") {
      const count = s.screen === "title" ? 2 : s.screen === "howto" ? 1 : 3;
      if (up) s.menuIndex = (s.menuIndex + count - 1) % count;
      else if (down) s.menuIndex = (s.menuIndex + 1) % count;
      if (confirm) {
        const oldScreen = s.screen;
        const oldNextId = s.nextId;
        s = activate(s, s.menuIndex);
        if (
          (oldScreen !== "playing" && s.screen === "playing") ||
          (s.nextId > oldNextId && s.stock.length === C.DEAL_STOCK_CARDS)
        )
          cue.add(C.CUES.deal);
      } else if (back && s.screen === "howto")
        s = { ...s, screen: "title", menuIndex: s.titleIndex };
    }
    if (s.screen === "won") {
      let clock = s.launchClock,
        launched = s.launched,
        flyers = [...s.flyers],
        trailStamps = s.trailStamps;
      const foundations = s.foundations.map((p: readonly CardState[]) => [
        ...p,
      ]);
      const newlyLaunched: FlyerState[] = [];
      if (s.launching) clock += dt;
      flyers = flyers
        .map((f) => {
          let vy = f.vy + C.GRAVITY * dt,
            y = f.y + (f.vy + C.GRAVITY * dt) * dt;
          const x = f.x + f.vx * dt;
          if (y >= C.FLOOR_Y && vy > 0) {
            vy = -vy * C.BOUNCE_DAMP;
            y = C.FLOOR_Y;
          }
          if (s.trailPainting) trailStamps++;
          return { ...f, x, y, vy };
        })
        .filter((f) => f.x + C.CARD_W >= 0 && f.x <= C.STAGE_W);
      while (
        s.launching &&
        clock >= C.LAUNCH_INTERVAL &&
        launched < C.DECK_SIZE
      ) {
        let fi = launched % C.FOUNDATION_COUNT;
        let checked = 0;
        while (checked < C.FOUNDATION_COUNT && !foundations[fi]!.length) {
          fi = (fi + 1) % C.FOUNDATION_COUNT;
          checked++;
        }
        const card = foundations[fi]!.pop();
        if (!card) break;
        clock -= C.LAUNCH_INTERVAL;
        newlyLaunched.push({
          ...card,
          id: card.id,
          x: C.FOUNDATION_X[fi]!,
          y: C.TOP_ROW_Y,
          vx:
            (Math.random() < 0.5 ? -1 : 1) *
            (C.LAUNCH_VX_MIN +
              Math.random() * (C.LAUNCH_VX_MAX - C.LAUNCH_VX_MIN)),
          vy: C.LAUNCH_VY,
        });
        launched++;
        cue.add(C.CUES.launch);
      }
      flyers.push(...newlyLaunched);
      const done = launched >= C.DECK_SIZE && !flyers.length;
      s = {
        ...s,
        foundations,
        flyers,
        trailStamps,
        launched,
        launchClock: clock,
        cascadeDone: s.cascadeDone || done,
      };
    }
    if (s.muted !== api.audio.muted()) api.audio.setMuted(s.muted);
    if (s.drag)
      s = {
        ...s,
        dropTarget: currentDrop(
          s,
          s.drag.x + C.CARD_W / 2,
          s.drag.y + C.CARD_H / 2,
        ),
      };
    for (const c of cue) api.audio.play(c);
    return s;
  },
  render(state, api) {
    renderGame(state, api);
  },
};
