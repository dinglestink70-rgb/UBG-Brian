const games = [

  {
    name: "Neon Dodge",
    category: "arcade",
    description: "Dodge incoming blocks and survive as long as possible.",
    url: "https://skymoon173.github.io/mini-game-collection/games/dodge-blocks/"
  },

  {
    name: "Sky Shooter",
    category: "arcade",
    description: "Classic browser shooting action.",
    url: "https://skymoon173.github.io/mini-game-collection/games/sky-shooter/"
  },

  {
    name: "Stickman Runner",
    category: "arcade",
    description: "Run, jump and survive the obstacles.",
    url: "https://skymoon173.github.io/mini-game-collection/games/stickman-runner/"
  },

  {
    name: "Neon Snake",
    category: "arcade",
    description: "Classic Snake with a neon style.",
    url: "https://skymoon173.github.io/mini-game-collection/games/snake/"
  },

  {
    name: "3D Snake",
    category: "arcade",
    description: "A different take on the classic Snake formula.",
    url: "https://skymoon173.github.io/mini-game-collection/games/iso-snake/"
  },

  {
    name: "2048",
    category: "puzzle",
    description: "Combine tiles and reach 2048.",
    url: "https://skymoon173.github.io/mini-game-collection/games/merge-2048/"
  },

  {
    name: "Merge Cats",
    category: "puzzle",
    description: "Merge cats to create higher-level cats.",
    url: "https://skymoon173.github.io/mini-game-collection/games/merge-cats/"
  },

  {
    name: "Neon Sudoku",
    category: "puzzle",
    description: "Solve Sudoku with a neon interface.",
    url: "https://skymoon173.github.io/mini-game-collection/games/sudoku/"
  },

  {
    name: "Star Farm",
    category: "simulation",
    description: "Manage your own little farm.",
    url: "https://skymoon173.github.io/mini-game-collection/games/farm-tycoon/"
  },

  {
    name: "Merge Town",
    category: "simulation",
    description: "Build and expand your town.",
    url: "https://skymoon173.github.io/mini-game-collection/games/merge-town/"
  },

  {
    name: "Newton's Second Law Lab",
    category: "simulation",
    description: "Experiment with force, mass and acceleration.",
    url: "https://skymoon173.github.io/mini-game-collection/games/newton-lab/"
  },

  {
    name: "Cat Seesaw",
    category: "arcade",
    description: "Balance cats on a seesaw.",
    url: "https://skymoon173.github.io/mini-game-collection/games/cat-seesaw/"
  },

  {
    name: "Stickman Stage",
    category: "arcade",
    description: "A stickman-based browser challenge.",
    url: "https://skymoon173.github.io/mini-game-collection/games/stickman-stage/"
  },

  {
    name: "Auto Composer",
    category: "creative",
    description: "Experiment with automatic musical composition.",
    url: "https://skymoon173.github.io/mini-game-collection/games/auto-composer/"
  },

  {
    name: "Fractal Gallery",
    category: "creative",
    description: "Explore procedurally generated fractals.",
    url: "https://skymoon173.github.io/mini-game-collection/games/fractal-gallery/"
  },

  {
    name: "EM Lab",
    category: "simulation",
    description: "Explore electromagnetic concepts interactively.",
    url: "https://skymoon173.github.io/mini-game-collection/games/em-lab/"
  },

  {
    name: "Hydrogen Atom",
    category: "simulation",
    description: "Interactive exploration of the hydrogen atom.",
    url: "https://skymoon173.github.io/mini-game-collection/games/hydrogen-atom/"
  },

  {
    name: "Math Lab",
    category: "puzzle",
    description: "Interactive mathematical experiments.",
    url: "https://skymoon173.github.io/mini-game-collection/games/math-lab/"
  },

  {
    name: "Code Generator",
    category: "creative",
    description: "Generate and experiment with code.",
    url: "https://skymoon173.github.io/mini-game-collection/games/code-generator/"
  },

  {
    name: "Room Styler",
    category: "creative",
    description: "Design and style your own virtual room.",
    url: "https://skymoon173.github.io/mini-game-collection/games/room-styler/"
  }

];

const grid = document.getElementById("gameGrid");
const search = document.getElementById("search");

const modal = document.getElementById("gameModal");
const frame = document.getElementById("gameFrame");
const title = document.getElementById("gameTitle");

const closeButton = document.getElementById("closeButton");
const openGame = document.getElementById("openGame");

const randomButton = document.getElementById("randomButton");

let currentCategory = "all";


function renderGames() {

  const searchText =
    search.value.toLowerCase().trim();

  const filteredGames = games.filter(game => {

    const categoryMatch =
      currentCategory === "all" ||
      game.category === currentCategory;

    const searchMatch =
      game.name.toLowerCase().includes(searchText) ||
      game.description.toLowerCase().includes(searchText);

    return categoryMatch && searchMatch;

  });

  grid.innerHTML = "";

  if (filteredGames.length === 0) {

    grid.innerHTML = `
      <p style="grid-column: 1 / -1; text-align: center;">
        No games found.
      </p>
    `;

    return;
  }

  filteredGames.forEach(game => {

    const card = document.createElement("article");

    card.className = "game-card";

    card.innerHTML = `
      <h3>${game.name}</h3>

      <p>${game.description}</p>

      <button class="play-button">
        Play
      </button>
    `;

    card
      .querySelector(".play-button")
      .addEventListener("click", () => {
        openGameWindow(game);
      });

    grid.appendChild(card);

  });

}


function openGameWindow(game) {

  title.textContent = game.name;

  frame.src = game.url;

  openGame.href = game.url;

  modal.classList.add("show");

}


function closeGameWindow() {

  modal.classList.remove("show");

  frame.src = "";

}


closeButton.addEventListener(
  "click",
  closeGameWindow
);


modal.addEventListener("click", event => {

  if (event.target === modal) {
    closeGameWindow();
  }

});


search.addEventListener(
  "input",
  renderGames
);


document
  .querySelectorAll(".filter")
  .forEach(button => {

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".filter")
        .forEach(btn =>
          btn.classList.remove("active")
        );

      button.classList.add("active");

      currentCategory =
        button.dataset.category;

      renderGames();

    });

  });


randomButton.addEventListener("click", () => {

  const randomGame =
    games[Math.floor(Math.random() * games.length)];

  openGameWindow(randomGame);

});


renderGames();