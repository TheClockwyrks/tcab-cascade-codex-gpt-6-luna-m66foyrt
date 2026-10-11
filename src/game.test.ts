import { describe, expect, it } from "vitest";
import { game } from "./game";

async function initialize() {
  const api = {
    audio: { define: () => undefined, muted: () => false },
    diagnostics: { register: () => undefined },
    input: { register: () => undefined },
  } as never;
  return game.initialize(api);
}

describe("Cascade rules surface", () => {
  it("starts with a complete title state and deals 28 tableau cards", async () => {
    const [initial, debug] = await initialize();
    expect(debug.snapshot(initial).screen).toBe("title");
    const dealt = debug.deal(initial);
    const view = debug.snapshot(dealt);
    expect(view.stock).toHaveLength(24);
    expect(view.tableau.map((column) => column.length)).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
    expect(
      view.tableau.every(
        (column) => column.filter((card) => card.faceUp).length === 1,
      ),
    ).toBe(true);
  });

  it("turns three stock cards into a remembered visible waste set", async () => {
    const [initial, debug] = await initialize();
    const dealt = debug.deal(initial);
    const turned = debug.turnStock(dealt);
    expect(debug.snapshot(turned).stock).toHaveLength(21);
    expect(debug.snapshot(turned).wasteVisibleCount).toBe(3);
    expect(debug.snapshot(turned).waste).toHaveLength(3);
  });

  it("returns a clicked card to its source and commits a dragged King", async () => {
    const [initial, debug] = await initialize();
    let state = debug.clearTable(initial);
    state = debug.setScreen(state, "playing");
    state = debug.addCard(state, "tableau", 0, "hearts", 13, true);
    state = debug.pointerDown(state, 240, 200);
    state = debug.pointerUp(state, 240, 200);
    expect(debug.snapshot(state).tableau[0]).toHaveLength(1);
    state = debug.pointerDown(state, 240, 200);
    state = debug.pointerMove(state, 484, 200);
    state = debug.pointerUp(state, 484, 200);
    expect(debug.snapshot(state).tableau[0]).toHaveLength(0);
    expect(debug.snapshot(state).tableau[2]).toHaveLength(1);
  });

  it("recycles the waste in the original stock order", async () => {
    const [initial, debug] = await initialize();
    let state = debug.deal(initial);
    const original = debug.snapshot(state).stock.map((card) => card.id);
    for (let pass = 0; pass < 8; pass++) state = debug.turnStock(state);
    expect(debug.snapshot(state).waste).toHaveLength(24);
    state = debug.turnStock(state);
    expect(debug.snapshot(state).stock.map((card) => card.id)).toEqual(
      original,
    );
    expect(debug.snapshot(state).wasteSets).toEqual([]);
  });

  it("turns only the newly exposed tableau card after a legal move", async () => {
    const [initial, debug] = await initialize();
    let state = debug.clearTable(initial);
    state = debug.addCard(state, "tableau", 0, "clubs", 5, false);
    state = debug.addCard(state, "tableau", 0, "hearts", 13, true);
    const [moved, accepted] = debug.move(state, "tableau", 0, 1, "tableau", 1);
    expect(accepted).toBe(true);
    expect(debug.snapshot(moved).tableau[0]).toMatchObject([
      { rank: 5, faceUp: true },
    ]);
    expect(debug.snapshot(moved).tableau[1]).toHaveLength(1);
  });

  it("accepts a legal Ace foundation move and refuses a mismatched card", async () => {
    const [initial, debug] = await initialize();
    let state = debug.clearTable(initial);
    state = debug.addCard(state, "tableau", 0, "hearts", 1, true);
    state = debug.addCard(state, "tableau", 1, "spades", 2, true);
    const [home, accepted] = debug.move(
      state,
      "tableau",
      0,
      0,
      "foundation",
      2,
    );
    expect(accepted).toBe(true);
    const [unchanged, refused] = debug.move(
      home,
      "tableau",
      1,
      0,
      "foundation",
      2,
    );
    expect(refused).toBe(false);
    expect(debug.snapshot(unchanged).foundations[2]).toHaveLength(1);
  });
});
