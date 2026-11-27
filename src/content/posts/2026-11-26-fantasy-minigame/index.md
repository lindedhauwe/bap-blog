---
title: Fantasy minigame
date: 2026-11-26
description: How I built the fantasy minigame in Phaser 4, a witch battle for two players where one player protects with an umbrella and the other casts spells from famous books, with AI as a fast programmer.
tags: [development]
olr: [OLR04-I-2, OLR02-I-1]
authors: [linde]
ai: >-
  AI played a big role in building this game. Claude (AI) in VS Code turned my designs and feedback into working code, built the witch's attacks and the spell recognition, tested the game itself in an automated browser, and helped fix the problems I found. The game concept, the choice of spells and books, all the visuals, the testing and the feedback came from me. Claude also turned my notes into this English post.
---

## Where we started

After the [history minigame](../2026-11-25-history-minigame/), the fantasy game was next. This time I didn't have to start from zero: the Phaser setup, the puppet animations, the players' hands and the controllers already worked. The challenge was a different one: making a game where **two players really need each other**, with a witch who fights back.

## Who did what

I built this game together with **Claude (AI)** in VS Code. We divided the work like this:

| Me: design and direction | AI: code and testing |
| --- | --- |
| The game concept: a witch who attacks, a protector with an umbrella and a wizard with a wand | Turning my designs and feedback into working code |
| Choosing the spells and attacks from books: *Harry Potter*, *The Wizard of Oz*, *Percy Jackson*, *Asterix* | Recognising the spell movements the wizard draws with the wand |
| All the visuals in Figma: background, witch poses, umbrella, wand, potions, monkey, deer, pen and sword (see [designing the fantasy minigame](../2026-11-24-design-fantasy-genre-1/)) | Testing the game itself in an automated browser: letting it play and taking screenshots |
| A design of the game screen with the health bar | Finding and fixing problems |
| Testing and adjusting: "the props are too big", "the deer shouldn't hop", "the dots look strange" | Adjusting the game based on my feedback |

## Timeline

### 24/11: first visuals

The background, the witch in four poses, the umbrella, the wand and the props were ready in Figma.

### 25/11: intro and the game itself

- **Same structure as history.** "FANTASIE" drops in letter by letter, the umbrella and the wand slide in, and then the cards and the wooden sign appear. The sign hangs at the top, like in my design.
- **Roles.** Player 1 (blue) is the protector with the umbrella, player 2 (red) is the wizard with the wand.
- **The witch attacks.** She throws flying monkeys and poison potions. A circle on the floor shows where they will land. If player 1 holds the open umbrella there, the attack bounces back to the witch. If not, the witch gets some health back.
- **Spells.** A dotted movement appears, and player 2 has to trace it with the wand. Then the spell flies to the witch.
- **Working together.** While the umbrella is open, player 2 can't cast a spell, so the players have to take turns.
- **Testing alone.** Without a controller, player 1 can play with WASD and the space bar, and player 2 with the mouse.
- **The ending.** The witch disappears in a cartoon "poof" cloud, and the same book as at the end of the history game appears. A button press opens it.

### 25/11: spells from books

- *Expelliarmus* and *Expecto Patronum* from *Harry Potter*.
- The Golden Cap spell from *The Wonderful Wizard of Oz* ("Ep-pe, pep-pe, kak-ke!…"): flying monkeys attack the witch.
- A magic potion from *Asterix*.

### 25/11: our style everywhere

- The wooden sign got our font, Andika.
- The "Press a button to start" button, the same as in the other games.
- Each player has their own colour everywhere: the landing circle is blue (player 1), the spell lines are red (player 2).

### 26/11: details

- Attacks can only be stopped when the umbrella is on the circle, not earlier in the air. After a bounce, the umbrella closes by itself.
- **Quote cards, like in history.** While you trace a spell, a quote card shows the spell and the book it comes from.
- **A new attack:** Percy Jackson's pen that turns into a spinning sword halfway through the throw (Anaklusmos, or Doemtij in Dutch).
- **My own deer** for *Expecto Patronum*, instead of the one the AI drew in code.
- **Neater dots:** there is always a dot exactly on each corner, with equal distances in between.

## The result

This is the fantasy minigame now, from the genre screen to opening the book at the end:

<video controls muted playsinline preload="metadata" src="../../videos/fantasy-game-recording.mp4" aria-label="Screen recording of a full round of the fantasy minigame"></video>

## How the code works

### Tracing a spell (`SpellTrace` in `fantasySpells.ts`)

- Every spell is a line through a few points, in coordinates from -1 to 1. That makes it easy to draw a spell bigger or smaller.
- The wand has to touch the dots **in order**, within 75 pixels. It may skip a few dots (`lookAhead`), so a sloppy movement still counts. Taking a shortcut to the end doesn't work, because only a few dots ahead count.
- If you move the mouse very fast, there's sometimes a big jump between two measurements, and you would "fly over" dots. That's why the code checks the movement in **small steps** between the previous and the new position.

### Neat dots (`resample` in `fantasySpells.ts`)

- First, the line is cut into pieces at the corners: everywhere it turns more sharply than 35°.
- Within each piece, the dots are spread evenly. That way there's always a dot exactly on every corner and at the end, and never two dots on top of each other.

### Reusing designs without redrawing them

- The player cards, the wooden sign and the quote card are the SVGs from the history game. A small script cut out their text.
- The fantasy text is placed on those cards in code, with positions in pixels of the SVG. Because the cards are tilted in the drawing, the text **rotates along at the same angle**. The code works out the position with some sine and cosine.
- The wooden sign is flipped upside down (`setFlipY`), so the pole points up and the sign can hang at the top.

### Drawings the code makes itself

- The star, the heart of the health bar, the poof clouds and the little line drawings on the cards aren't files. The code draws them on a canvas when the game starts, at double resolution, like the rest of the game.
- The clouds are a few overlapping circles: first white and a bit bigger for the sticker edge, then lilac, and on top a lighter layer for the shading.

### The witch's attacks (`launchAttack` in `FantasyScene.ts`)

- The flight is **one counter that runs from 0 to 1**. At every moment, the code calculates the position: a straight line, plus a sine for the arc. The attack gets bigger as it comes closer.
- Blocking is only checked **at the end of the flight**: is the open umbrella on the circle at that moment?
- The witch's poses switch with timers ("after 0.7 seconds, go back to standing normally"). If a new pose comes in the meantime, like getting hit while throwing, the old timer must not undo it. That's why every pose gets a number (`poseId`), and a timer only does something if its number is still the latest one.

### Two players on one screen

- **Player 1:** the umbrella follows the controller.
- **Player 2:** the wand follows the mouse. Since `main` supports two controllers, a second controller simply takes over the mouse, so the fantasy code didn't have to change for that.
- **Testing without a controller:** player 1's keys (WASD) are caught before the shared input file sees them. That way, D doesn't open the debug panel during the game.

### Taking turns

- While the umbrella is open, the code ignores the wand's movements for the spell, and the dotted line becomes transparent.
- After a successful bounce, the umbrella closes by itself, so player 2 can cast spells again.

## Problems we solved

- **Attacks that flashed on screen.** For one frame, a monkey or potion appeared at the full size of its image file, more than 1000 pixels wide, before the flight made it smaller. The fix was one line of code: give it its small size right away.
- **The umbrella caught attacks too early.** It stopped monkeys while they were still flying. Now it only counts on the circle, when the attack arrives.
- **Drawing a spell anywhere.** I wanted player 2 to be able to draw the movement anywhere on the screen. The AI tried two ways: following the direction of the wand, and comparing the shape of the drawn line. For the second one, the AI wrote a test program that checked hundreds of drawn shapes, at different sizes and with shaking. In those tests it worked well, but when I played it, it felt worse than simply tracing the dots. So we went back to tracing on the dots. Not every idea has to stay in the game.
- **The D key.** I use D to move the umbrella when testing, but D also opened the debug panel. Now the fantasy game catches those keys first during the game.
- **Reusing instead of redrawing.** The cards, the sign and the quote card are the history versions without their text. The fantasy text is added in code, so everything matches.

## What did I learn?

- **Testing it myself matters.** Something can work perfectly in an automated test and still feel wrong when you play it, like drawing spells anywhere.
- **The same building blocks save time.** Because the history game was already built in small reusable pieces, the fantasy game could reuse a lot.
- **Small steps.** Feedback still worked best one thing at a time, often with a screenshot or a design.
