---
title: Designing the detective minigame
date: 2026-11-21
description: How we designed the first assets for the detective genre.
tags: [design] # one or more of: ux, design, development, feedback
olr: [OLR03-I-1, OLR02-I-1] # learning outcomes, see the list on /olr/ (src/consts.ts)
authors: [naomi]
# cover: ./cover.jpg
# coverAlt: What's in the cover image
ai: >-   # use >- so colons in your text don't break things
  We used Illustrator's AI image generation twice, for the two villains that are hard to find references for online: the wolf standing on two legs and Captain Hook in one specific pose. We asked for these poses so we could see the right body shape and proportions. We kept them only as a reference to draw over, not as final art. We didn't use AI for the other assets.
---

## What did we do?

In the detective genre, the setting is a library full of bookshelves. Player 2 catches the guilty characters roaming through it, while player 1 searches the room for clues. We designed all the assets for this scene.

### The bookshelves

We started with a single bookshelf and then expanded it with a second shelf, more books and a few random items, so the library feels lived in.

![First version of the bookshelves](./bookshelves01.png)

![The bookshelves with a second shelf, more books and extra items](./bookshelves02.png)

The reference we used for the bookshelf:

![Reference for the bookshelves](./bookshelves-reference.png)

### The clues

The clues are based on the appearance of the guilty character, so players who haven't read the book yet can still work out who they are looking for. In our game the culprit is Meneer Grondijs from "Emiel en zijn detectives", who wears a long brown coat, a bowler hat, neat shoes and a moustache. That gave us three clues: a piece of brown fabric, moustache wax with a comb, and footsteps on the ground. We also made sure that the clues could be applied to other characters, so players actually have to find all three clues to be sure of who the culprit is.

![The three clues](./clues01.png)

We used the following references:

<div class="carousel" aria-label="References for the clues">

![Reference for the footsteps](./footsteps-reference.png)

![Reference for the fabric](./fabric-reference01.png)

![Second reference for the fabric](./fabric-reference02.png)

![Reference for the moustache wax](./moustache-wax-reference01.png)

![Second reference for the moustache wax](./moustache-wax-reference02.png)

</div>

### The controllers

Each player gets a tool that fits their role: a magnifying glass for player 1, who searches for clues, and a net for player 2, who catches the guilty characters.

![The magnifying glass and the net](./controllers01.png)

<div class="carousel" aria-label="References for the controllers">

![Reference for the magnifying glass](./magnifying-glass-reference.png)

![Reference for the net](./net-reference.png)

</div>

### The notebook

To help players keep track of how many clues they still have to find, and which ones they already have, we added a small notebook that lists all the clues. Hovering over it pulls it up and shows everything found so far. The image below shows how the notebook fits into the game screen.

![The notebook](./notebooks01.png)

![The game screen with the notebook](./game-screen01.png)

### The guilty characters

For the guilty characters we picked villains from four well-known books:

- Meneer Grondijs from "Emiel en zijn detectives"
- The Big Bad Wolf from "Roodkapje"
- Professor James Moriarty from "Sherlock Holmes"
- Captain Hook from "Peter Pan"

![The four guilty characters](./thieves01.png)

We used the following references:

<div class="carousel" aria-label="References for the guilty characters">

![Reference for Moriarty](./thieves-moriarty-reference01.png)

![Second reference for Moriarty](./thieves-moriarty-reference02.png)

![Reference for Meneer Grondijs](./thieves-grondijs-reference.png)

![Reference for the wolf](./thieves-wolf-reference02.png)

![Second reference for the wolf](./thieves-wolf-reference03.png)

![Third reference for the wolf (AI-generated)](./thieves-wolf-reference01.png)

![Reference for Captain Hook](./thieves-kapitein-haak-reference01.png)

![Second reference for Captain Hook](./thieves-kapitein-haak-reference02.png)

![Third reference for Captain Hook](./thieves-kapitein-haak-reference03.png)

![Fourth reference for Captain Hook (AI-generated)](./thieves-kapitein-haak-reference04.png)

</div>

For two characters we couldn't find a suitable reference online: the wolf, walking on two legs, and Captain Hook, in an attacking pose. For these two, the references were generated with AI in Illustrator, so we could get the right proportions and poses.

## Why this direction?

Basing the clues on how the culprit looks makes the game accessible to everyone: players who know the book will recognise him, and those who don't can still figure it out from the clues. The notebook gives players an overview of their progress without cluttering the screen.

## Next steps

- Test the detective game with the target audience.