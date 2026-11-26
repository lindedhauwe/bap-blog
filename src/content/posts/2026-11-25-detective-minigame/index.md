---
title: Detective minigame
date: 2026-11-25
description: How I built our second minigame, the detective game, from the first Figma assets to a playable game where one player searches for clues with a magnifying glass and the other catches suspects with a net, with AI as a fast programmer and tester.
tags: [development]
olr: [OLR04-I-2, OLR02-I-1]
authors: [femke]
ai: >-
  AI played a big role in building this game. Claude (AI) in VS Code programmed the detective game and the changes to our shared code (hands, controllers, buttons), proposed how parts could work, and fixed my Figma exports. All the visuals and texts, the rules, the order of the screens, the testing and the feedback came from me. Claude also put together the timeline from our Git history, and turned my notes into this English post.
---

## Where we started

On **21 November** the first detective assets went into the project, all made in Figma: the background, the title "DETECTIEVE" (detective), the magnifying glass, the net, the sign and the two player cards. The menu already existed, but the book "Detective & mysterie" in it didn't do anything yet.

That same evening the first screens of the game were there: the title and the instructions. The game itself wasn't in it yet: pressing a button in the intro didn't do anything.

Because this was our **second game in Phaser**, after the [history minigame](../2026-11-25-history-minigame/), we could reuse a lot: the puppet-style animations, the players' hands and the controller code.

## Who did what

I built this game together with **Claude (AI)** in VS Code, in the same way as the history game:

| Me: design and direction | AI: code and testing |
| --- | --- |
| All the visuals and texts in Figma: the title, cards, signs, suspects, clues, notebooks, quotes, "FOUT!" (wrong!) and "Proficiat!" (congratulations!) | No visuals of its own, but a technical fix for my Figma exports: removing the setting that cut off the rough edges |
| What the game has to do, the order of the screens, and feedback after testing, like calmer cards, the suspect board on the left, and that both players have to point out the thief | Proposals for how parts could work, like how the magnifying glass reveals clues and how the suspects walk |
| Testing, steering and approving | Programming the detective game and the changes to our shared code: hands, controllers and buttons |

## Timeline

### 21/11: assets and the opening screens

- The first assets went in: the background, the title, the net, the magnifying glass, the sign and the cards for step 1. Shortly after, new versions of the cards, and the fix for the cut-off edges in the Figma exports.
- **The opening screens:** the letters of "DETECTIEVE" drop in, the net and the magnifying glass slide in, and the cards and the sign come up. The book in the menu now opens the game.
- A small change: the tools go in front of the cards, and the magnifying glass sits on the corner of its card.

### 22/11: point at the star

At the start of every minigame, including this one, the players first **point at a star**, to set up the controller but stylewise this is not on point yet, so a next step to fix that.

### 24/11: the game itself

First the **hands of both players** came on the intro: player 1 with the controller, player 2 with the mouse. That evening the actual game went in, with more than 800 lines of code and 22 new assets, in three parts:

1. **Searching:** player 1 finds 3 clues with the **magnifying glass**. Player 2 catches 4 suspects with the **net**, while they walk in front of or behind the bookcases, or peek out from behind them.
2. **Pointing out:** "Wie is de dief?" (who is the thief?) with the 4 suspects in a row. A wrong choice gives **"FOUT!"** and that suspect's quote.
3. **The end:** Emil with his quote, the **"Proficiat!"** sign, and the book that opens.

### 25/11: finishing touches

- Caught suspects go onto the **"Verdachten" (suspects) board** on the left.
- Clues stay **hidden** until the magnifying glass comes close.
- A **new intro layout**: the sign "Help! Er is een boek gestolen!" (help, a book has been stolen!) hangs at the top, the cards are on the left and right, with "Druk op een knop om te starten" (press a button to start). The cards move more calmly, and now and then a suspect runs past.
- The game was **merged into `main`**.

### 26/11: both players decide

- **Both players** now have to point out the same thief: each choice shows that player's hand above the suspect. This is still on its own branch and goes into `main` once I merge it.
- New cards for step 2, and the hands' shadow also works on the choosing hands.
- Support for **two controllers**, built on the comedy game's branch, also works in the detective game.

## The result

This is what the detective minigame looks like now, from the Kaboeko start screen to opening the stolen book at the end:

<video controls playsinline preload="metadata" src="../../videos/detective-game-recording.mp4" aria-label="Screen recording of a full round of the detective minigame"></video>

## What I reused from the history game

Building the second game went a lot faster than the first. The animations, the hands as the cursor, the controller code and the way I worked with AI (small steps, with a screenshot or a design each time) were already there. That let me focus on what makes this game different: two players doing a different task at the same time.

## Next steps

- **Optimise the star** the players point at, at the start of every minigame, to set up the controller.
