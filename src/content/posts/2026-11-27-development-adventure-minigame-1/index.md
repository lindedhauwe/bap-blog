---
title: Developing the adventure minigame
date: 2026-11-27
description: How I built the adventure minigame in Phaser 4, a boat race for two players where one player scoops water out of the boat and the other steers the boat, with AI as a fast programmer.
tags: [development]
olr: [OLR04-I-2, OLR02-I-1]
authors: [naomi]
ai: >-
  AI wrote the code for this game. Claude Code (Claude Sonnet 5.5) wrote the two new files for the game, connected it to the menu, added the title screen and the tutorial, and changed things after each round of my feedback. It checked that the code built and tested some features in a headless browser with screenshots and simulated input, but not with the real controller. I added the artwork, described how the game should work, gave screenshots of what it should look like and gave feedback on what had to change.
---

## Where we started

After the [history](../2026-11-25-history-minigame/), [detective](../2026-11-25-detective-minigame/), [comedy](../2026-11-26-comedy-minigame/) and [fantasy](../2026-11-26-fantasy-minigame/) minigames, the adventure game was next. The artwork came from our [adventure designs](../2026-11-21-design-adventure-genre-1/). What was missing was the game itself: a **boat race for two players**.

- **Player 1** scoops the water out of the boat with a bucket.
- **Player 2** steers the boat around the obstacles with the wheel.

If both players don't work together, the boat starts sinking.

## Who did what

I built this game with **Claude Code (Claude Sonnet 5.5)**. As far as the code goes, Claude wrote it from my prompts, so my part was the direction, not the typing.

| Me: design and direction | AI: code and testing |
| --- | --- |
| Adding the artwork to the project | Writing the two new files of the game |
| Describing how the game should work | Connecting the game to the menu |
| Screenshots of what the game should look like | Adding the title screen and the tutorial |
| Testing the game and giving feedback on what had to change | Checking that the code builds and testing in a headless browser, with screenshots and simulated input |
| | Helping me move my work to a separate branch after I accidentally committed it to `main` |

## The result

This is the adventure minigame now, from the title screen to the open book at the end:

<video controls muted playsinline preload="metadata" src="../../videos/adventure-game-recording.mp4" aria-label="Screen recording of a full round of the adventure minigame"></video>

## How the game works

The game is written in TypeScript with Phaser. Most of it is in two files.

### The game itself (`AdventureScene.ts`, about 1,300 lines)

- **Settings.** A `CONFIG` block holds the main difficulty values: sailing time, wave speed, hitbox width, steering speed and the amount of water.
- **Layout and assets.** Positions are based on our 2160 × 1440 designs and converted to game coordinates. The two largest images, the boat and the island, are loaded at a lower resolution to fit the limits of graphics cards.
- **Game states.** The game moves from title to intro, start, sailing, arrival, treasure chest and finally the open book. The current state decides what the buttons do and what gets updated.
- **Title and intro.** The letters, the bucket, the hands, the explanation sign and the player cards are all animated.
- **Update loop.** Every frame, the game updates what's needed at that stage: the waves, obstacles, boat, bucket and wheel.
- **Obstacles.** Each obstacle rides on a wave and gets bigger as it comes closer. A hit is detected from the sideways distance between the obstacle and the boat.
- **Water.** The code creates splashes and puddles, fills and empties the bucket, and lowers the boat as the water builds up. The puddle and the full bucket are drawn in code.
- **Steering.** The wheel follows the angle of player 2's hand around its centre, and turns back when released.
- **Controls.** The game handles the mouse, controller buttons and shaking. There is also a keyboard option for testing player 1.
- **Ending.** The island approaches in time with the waves, the chest opens and the book appears.

### The sea (`adventureSea.ts`, about 150 lines)

This file draws and animates the sea. There are eight wave layers, with two shapes made from sine curves, in two shades of blue. Each wave stores how close it is, which decides its height on screen, its vertical stretch and its drawing order. Waves that leave the screen go back to the back, where they can bring a new obstacle.

### Other changes

- **`main.ts`** registers the new scene.
- **`MenuScene.ts`** links the adventure genre to it.
- **Shared code.** The game reuses the project's controller input, player pointers, animation helpers and start button, like the other minigames.

## What did I learn?

- **Feedback in small steps works best.** One change per request, with a screenshot when possible, got the best results.
- **Automated tests have limits.** Claude tested with screenshots and simulated input, but not with the real controller. Not every later change was checked visually either, so playing the game myself stayed important.
- **A settings block saves time.** Because the difficulty values are all in `CONFIG`, tweaking the game after a test was quick.

## Next steps
- Test the adventure game with the target audience: 
  - Do they understand the two roles?
  - Is it clear that they have to work together?
  - Are the references recognisable?
  - Is the game fun and challenging enough? Or too easy?
- Add the recommended reads at the end.
- Improve the game based on feedback.