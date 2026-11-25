---
title: History minigame
date: 2026-11-25
description: How I built our first minigame in Phaser 4, from a blurry first setup to a playable history game with puppet-style animations, controllers, quotes from books and a title screen, with AI as a fast programmer and tester.
tags: [development]
olr: [OLR04-I-2, OLR02-I-1]
authors: [femke]
ai: >-
  AI played a big role in building this game. Claude (AI) in VS Code set up the Phaser project, turned my designs and example videos into working code, tested the game itself in an automated browser, found and fixed problems, and managed our Git branches. The game concept, all the visuals in Figma, the example videos, the testing and the feedback came from me. Claude also turned my notes into this English post.
---

## Where we started

On **17 November** I started coding the history minigame. It was the **first game we built in Phaser 4**, so everything was still very new: what's possible and what isn't. It took a lot of figuring out.

I quickly noticed that Phaser 4 is really just **writing JavaScript**, so it isn't that new in itself. Still, it took some time to find my way around it.

## Who did what

I built this game together with **Claude (AI)** in VS Code. We divided the work like this:

| Me: design and direction | AI: code and testing |
| --- | --- |
| The game concept: digging, brushing, finds on signs, fake finds, and the book as the finale | Setting up the Phaser project, and turning my designs and videos into working code |
| All the visuals in Figma: background, sandbox, finds, signs, cards, quotes and "GEFOPT!" | "Watching" my videos: taking frames from them and working out what should happen |
| Example videos of how it should work and move (the "puppet show" feel) | Testing the game itself in an automated browser: letting it play and taking screenshots |
| Testing and adjusting: "this moves too much", "one find at a time", "the sign hangs too low" | Finding and fixing problems |
| The hardware: the ESP32 with the MPU-6050 and the Nunchuk, and testing the Arduino sketches | Managing Git: branches, commits and merging into `main` |

## Timeline

### 13/11: setup

Right after our [development consult](../2026-11-13-dev-consult/), the Phaser project was set up: Phaser 4 with Vite and TypeScript. Right away we ran into the first problem: the game looked **blurry** on Retina screens. Now everything is drawn at double resolution.

### 17/11: the first playable version

The AI worked out from my demo video what had to happen: digging with the shovel, brushing with the brush, and moving the find to its sign. Then I gave my feedback:

- **"Everything has to move like a puppet show."** That became a reusable animation file (`puppet.ts`), with entering, wobbling and swinging.
- **"Don't dig up several things at once."** Now there's one object at a time in the sand, with the fake finds in between.
- The instruction cards show **only once**, and the info buttons bring them back.

### 19/11: title screen

"GESCHIEDENIS" (history) drops in **letter by letter**. The AI wrote code that automatically cuts my SVG into separate letters.

### 19–21/11: finishing touches

- Player 1 on the left and player 2 on the right, and the cards tilt outwards.
- The patches of sand are already on the objects **while you're digging**, a tip from our [first test with a child](../2026-11-21-mini-testing-1/).
- After 15 seconds of doing nothing, the **instructions come back**, another tip from that test.
- The players' **hands** as the cursor.

### 21–24/11: controllers

- First the **MPU-6050**: tilting, and later pointing like a Wii remote (see our [accelerometer test](../2026-11-22-accelerometer-controller-test-1/)).
- Then the **Nunchuk** (see our [Nunchuk test](../2026-11-24-nunchuck-controller-test-1/)).
- In the history game, the cursor goes to the player whose turn it is.

### 24/11: extras

- **Quotes** after brushing (Asterix, Koning Arthur, …) and **"GEFOPT!"** (fooled!) for the fake finds.
- Fake finds are dug up faster, and the patches of sand are more spread out.
- **Sparkling stars** where the book lies.

### 25/11: new start layout

The sign hangs at the top, with new cards and a "Press a button" button.

## Problems we solved

- **A blurry game.** My Mac screen has twice as many pixels, so the game was stretched. The fix: draw everything at double resolution.
- **Figma exports that cut off pieces.** With every export using the "rough edge" effect, Figma added a setting that cut off the edges. The AI found the cause and removed it each time.
- **The Nunchuk's button didn't work.** My screenshot of the Serial Monitor showed that the sketch called the button `"z"` instead of `"bz"`. A difference of one word.
- **What a Nunchuk can't do.** Pointing with your arm, like on a Wii, isn't possible without a gyroscope. The AI explained why, and we chose the joystick.
- **The pole of the signs.** It must never stick out above the edge of the screen, so we adjusted the "bounce".
- **Working with branches.** Every feature got its own branch, and only went to `main` once it worked.

## What did I learn?

- **AI as the one carrying it out.** The AI was a fast programmer and tester, but the design choices and the feel of the game came from me.
- **Small steps.** Feedback worked best in small steps, with a screenshot or a design to go with it.
