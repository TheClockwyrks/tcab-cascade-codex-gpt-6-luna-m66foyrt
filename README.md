# Cascade

Cascade is a browser based Klondike solitaire game played with a Draw Three stock. Build down in alternating colors on the seven tableau columns, then build each suit from Ace to King on the foundations. Complete all four foundations to trigger the card cascade across the table.

## Install and run

```sh
npm ci
npm run dev
```

Open the local URL Vite prints. Create a production site with:

```sh
npm run build
```

The static site is written to `dist/` and can be served from any static file host.

## Controls

- Drag a face-up card or run to move it; drag a waste or foundation top card the same way.
- Click the stock to turn up to three cards. When empty, click it to recycle the waste.
- Double-click a playable card to send it to its foundation.
- Use the on-screen buttons for a new deal, return to the title menu, and sound.
- The title and how-to menus also support pointer/touch, Arrow Up/Down or W/S, Enter/Space, and Escape.
