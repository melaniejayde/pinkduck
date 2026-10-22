# Pink Duck

This project uses Create React App.

## Run locally

```bash
npm install
npm start
```

## Project structure

- `src/App.js` — page layout
- `src/QuackDuck.js` — duck interaction and quack audio playback
- `src/App.css` — transparent, borderless duck styling and hover cursor
- `src/index.css` — global page styles
- `public/images/pinkduck.png` — transparent duck image
- `public/sounds/duck-quacking.mp3` — quack sound

Click the visible duck to play the quack. The cursor changes to a pointer only over non-transparent pixels of the image. The button wrapper has no visible border or background.

The ZIP intentionally excludes `node_modules`; run `npm install` after extracting it.
