# Planet Battles

Could this truly be it? Space game happening at last? Or will this project fail to live up to the hype, like so many potential space games before it? We'll find out on Feb 28.

### Roadmap to MVP

At the very least, we need the following:

- A planet you control
- With a colony that supports your population
- Defensive turrets (player clicks to shoot down incoming attacks)
- Incoming attacks (auto-generated, with increasing frequency)

The colony loses both hitpoints and population when an attack collides with it. In between attacks, your remaining population repairs some damage done to the colony. The rate of attacks increases over time, until the player is eventually overwhelmed (loses the colony). The goal is to survive as long as possible.

### Brainstorming Improvements

#### Multiplayer

Instead of the computer randomly sending attacks your way, you and another player are each controlling a planet, and you each send and receive attacks.

**Considerations:** How do we limit the rate at which a player can send attacks? We could artificially limit the rate of attacks, but that doesn't seem like a fun experience. Do we just pop up a box that says "You can send another attack now"? Really, the player should make decisions that controls how frequently they can send attacks.

#### Additional Buildings

This, I think, is the critical piece to make the game interesting. This is how we can limit the rate of attacks (e.g. your factory controls how quickly you produce missiles, your research lab controls how fast they fly). Players can choose which buildings to target when they send attacks

- Colony: houses population, which is your most valuable resource. Population is assigned to repairs or one of your other buildings to increase other rates of production. When all population is lost, the game is over.

- Factory: produces weapons. Assigning more population here will increase the rate of weapon production.

- Research Lab: unlocks various upgrades. Assigning more population here will unlock upgrades faster.

- Defense (optional): assigning population here will automate defense so the player doesn't have to manually click to defend.

- Mine (optional): produces ore, which could be an additional variable when calculating factory speed and repair speed. This adds complexity to the game that I think would improve the experience, but it may be complex to implement the balance correctly.

- Garden (optional): supplies food, which is needed to keep the population alive. This makes the game more complex in a way that may or may not make it more fun to play.

#### Researchable Upgrades

This depends on having a research lab building implemented, but I think this is a critical piece in making the game replayable. Upgrades could be unlocked randomly, or the player could choose the current research focus (or queue several). Random is obviously easier to implement, but choosing research adds strategy to the game.

The possibilities are endless, but there needs to be a balance of value added to the gameplay and the cost of development. Here's a somewhat-ordered list of upgrades to add:

- Faster missile flight speed
- More colony hitpoints
- Automated defense
- Missiles more resistant to enemy attacks
- Different types of attacks (ships that orbit enemy planet and attack continuously)
- Force field (big shield around the entire planet, adds hitpoints before population starts taking attacks directly)
