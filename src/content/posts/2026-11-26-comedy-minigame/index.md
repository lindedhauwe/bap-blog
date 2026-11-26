---
title: Comedy minigame
date: 2026-11-26
description: How I built our third minigame, "Wie zei dat?" (who said that?), where both players throw balloons at the book character who said a quote, from the first opening screens to a playable game, built from my sketches with AI as a fast programmer and tester.
tags: [development]
olr: [OLR04-I-2, OLR02-I-1]
authors: [femke]
ai: >-
  AI played a big role in building this game. Claude (AI) in VS Code asked questions about how the game should work, programmed the comedy game and the support for two controllers, and adjusted it after each round of my feedback. All the visuals, the sketches of the screens, the concept, the characters and quotes, the testing and the feedback came from me. Claude also put together the timeline from our Git history and our conversation, and turned my notes into this English post.
---

## Where we started

On **21 November** the opening screens of the comedy game went into the project: the title "KOMEDIE" (comedy) with letters dropping in, the feather and the balloon, the player cards and the sign. The book "Komedie" in the menu now opened this minigame. The game itself didn't exist yet: pressing a button in the intro didn't do anything. The visuals come from our [comedy designs](../2026-11-21-design-comedy-genre-1/).

On **25 November** I gave the AI a detailed brief for the game **"Wie zei dat?"** (who said that?):

- A quote appears, and both players throw **balloons** at the book character who says it.
- With an intro, an ending with a cannon and a book, and all the settings in one place.
- And I asked it to **first ask questions** about how the project is built, instead of guessing.

## Who did what

I built this game together with **Claude (AI)** in VS Code, in the same way as the [history](../2026-11-25-history-minigame/) and [detective](../2026-11-25-detective-minigame/) games:

| Me: design and direction | AI: code and testing |
| --- | --- |
| All the visuals: the characters, quote signs and quote balloons, the stage, the ball, the cannon, the trapeze, the smoke cloud, the splash, the crosshairs, the cards, the background and "FOUT!" (wrong!) | No drawings of its own, but some fixes in code: the blue balloon (a recoloured version of my red one), the long ropes of the trapeze, extra space under the stage because the edge was cut off in the file, and backup cards in case an image is missing |
| The sketches of the intro and game screens, and of the spotlight | Asking how things should work, and working out my choices, for example: both players have to hit within 3 seconds of each other, and with only a mouse one hit counts |
| The concept, the characters and quotes, and feedback after every test | Programming the comedy game, a data file with the characters and quotes, and the changes for two controllers |

## Timeline

### 21–25/11: the opening screens

- **21/11:** the opening screens with the title, feather, balloon, cards and sign. The menu book opens the game.
- **22/11:** "Point at the star" for the controller, at the start of every minigame.
- **24/11:** the hands of both players on the intro.
- **25/11:** the new shared start button, and the opening screens go into `main`.

### 25/11: the brief and the first version

Claude asked its questions first. I chose to extend one scene, with **4 characters** with drawings, my own quote SVGs, and for now an empty book. Then came a **first version** with the intro, the game and the ending, but with a layout the AI came up with itself.

### 25/11: rebuilt from our designs

The game was rebuilt following **my sketches**:

- **Lambik** behind the stage
- **Theo** on the ball
- **Captain Underwear** flying
- **Timon Verbeek** on the trapeze
- a big **cannon**, and balloons waiting at the bottom

### 25/11: six rounds of feedback

1. The stars go, the feather becomes a balloon, the Captain is shot out of the cannon (in a loop), Timon swings across the whole width, and Lambik only peeks out of the barrel now and then.
2. No hint circles, faster throwing, and characters that are hit fall out of the screen.
3. All the text the AI had added itself was removed ("Raak!", "Mis!", names, the ending text).
4. Lambik's feet, the bottom of the stage, a bigger book and bigger quotes.
5. The spotlight following my sketch, my new "FOUT!" design, and **both players** have to hit the right character.
6. First you see the splash, and only then the spotlight.

That evening the game was committed, with 25 new or changed assets.

### 26/11: two controllers and finishing touches

- **Two controllers:** player 2 can now use a controller too.
- My idea: **shoot the ball to pieces**, and Theo falls and walks on. After my feedback he walks lower, in front of the barrel.
- No "Point at the star" anymore with the **Nunchuk**, because we only use Nunchuks now.
- Everything was **merged into `main`**.

## The result

This is what the comedy minigame looks like now, from the Kaboeko start screen to opening the book at the end:

<video controls playsinline preload="metadata" src="../../videos/comedy-game-recording.mp4" aria-label="Screen recording of a full round of the comedy minigame"></video>

## Where it stands now

The whole comedy game is in `main`, together with the support for two controllers. I tested it each time in the browser, with the mouse and with controllers.

## What I learned

Asking the AI to **ask questions first**, instead of guessing, made a big difference. Even so, the first version had a layout and texts the AI came up with itself. Only after I gave my own sketches and removed everything it had added did the game really look like ours. Many rounds of feedback in one day worked better than one long brief.
