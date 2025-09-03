# **App Name**: WebSockets Lotería

## Core Features:

- Unique Board Generation: Generates a unique 4x4 'Lotería' board for each player using images from the `/img` folder, ensuring no repetition of cards within the same board.
- WebSockets Communication: Enables real-time communication between players and the central game server using WebSockets, allowing multiple players (up to 5) to participate simultaneously.
- Central Card Deck Management: Manages a central deck of 'Lotería' cards on the server-side, ensuring fair and random card selection. This feature needs to serve as a tool for a designated virtual dealer, which ensures compliance to rules of the game.
- Card Calling and Display: Displays the currently called card to all players, updating a historical log of called cards.
- Player Card Highlighting: Allows players to 'mark' cards on their board as they are called, with visual feedback (color change from grayscale to full color) to indicate a match.
- Win Detection: Automatically detects when a player wins ('Lotería!') based on predefined winning patterns (e.g., row, column, diagonal).
- AI Board Customization Tool: Uses a generative AI tool to generate interesting, diverse, and personalized loteria boards based on image features (people, landscapes, or artifacts).  It automatically changes card placement to produce diverse board styles.

## Style Guidelines:

- Primary color: Vibrant orange (#FF9500) reminiscent of Mexican folk art and festivities.
- Background color: Light tan (#F2E4D7) evoking the color of traditional 'Lotería' boards.
- Accent color: Turquoise (#40E0D0) to highlight interactive elements and called cards.
- Headline font: 'Playfair', serif, for titles, for an elegant, fashionable, high-end feel; body font: 'PT Sans', sans-serif, for all body content.
- Use clear, simple icons for game actions (e.g., mute/unmute), inspired by traditional Mexican art motifs.
- Player boards are displayed clearly with the called card on top. The central card deck should be prominent and easily viewable by all players.
- Subtle animations when a card is called and when a player marks a card on their board. Celebrate the winner with dynamic and playful visual effects.