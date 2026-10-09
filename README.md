# monolith

A WebGL demo released at NVSCENE 2015, where it placed 5th.

**Live:** https://spite.github.io/monolith/

The camera drifts across a desert towards a black monolith. A set of effects plays in front of it, all synced to the soundtrack: tumbling triangles, a noise-displaced blob, a particle field and a cluster of ambient-occluded spheres. Everything passes through a chain of post-processing passes.

## Credits

- **Music:** awwz
- **Code and visuals:** cabbibo, spite
- **Greetings:** farbrausch, kewlers, mfx, xplsv, threepixels, tbl, asd, rgba, exceed, fairlight, excess, tpolm

## Running locally

The demo loads shaders and textures over XHR, so it has to be served over HTTP. Opening `index.html` from disk won't work. Any static server is fine:

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

Wait for "Click to start". The demo goes fullscreen and plays the track.

## How it works

- **Rendering:** [three.js](https://threejs.org) r70 (`js/three.min.js`).
- **Post-processing:** [Wagner](https://github.com/spite/Wagner) (`Wagner/`). Each frame renders the terrain and the active effect into separate colour and depth targets. `DepthMixPass` composites the two by depth. The result then goes through blur, glitch, bleach, bloom, vignette, FXAA and noise.
- **Timeline:** `assets/storyboard.js` defines every animated value against the track time. `js/storyline.js` interpolates them.
- **Clock:** time follows the audio, smoothed with the system clock, so visuals stay in sync with the music.
- **Warm-up:** before "Click to start" appears, every effect and post pass is drawn once. Shader compilation and texture uploads happen behind the loading screen instead of during playback.

### Storyboard format

Each key in `assets/storyboard.js` is a list of events, `"<time> <action> to <value>"`, with times in seconds:

| Action | Meaning |
|---|---|
| `cut to` | jump to the value at that time |
| `linear to` | ramp linearly from the previous value, reaching this one at that time |
| `ease to` | the same ramp with ease-in-out |

For example, the opening fade-in:

```js
"fade": [
  "0 cut to 0",
  "8 linear to 1"
]
```

Effects are picked by number through the `effect` key:

| Number | Effect |
|---|---|
| 0 | triangles (static) |
| 1 | triangles (moving) |
| 2 | displacement blob |
| 3 | particles |
| 4 | spheres |

## Files

```
index.html        scene setup, effects, inline shaders, render loop
assets/           textures, track.mp3, storyboard.js, effect shaders
js/               three.js r70, storyline parser, helpers
Wagner/           post-processing library and its shaders
```

## Third-party assets

- `assets/8k_desert_texture_tileable_by_sga_maddin-d495dg1.jpg`: [8k Desert texture (tileable)](https://www.deviantart.com/sga-maddin/art/8k-Desert-texture-tileable-257231953) by **sga-maddin**, used with credit as the author requests.
- `assets/CC0-river-rock-NRM.png`: CC0 river rock normal map.
