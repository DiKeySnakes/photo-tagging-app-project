const games = [
  {
    title: "Dragon Charmer's Island",
    image: '/images/egor-klyuchnyk-robot-city.jpg',
    gameId: 'game-1',
    id: crypto.randomUUID(),
    characters: [
      {
        name: 'Raft Man',
        url: '/images/raft-man.png',
        found: false,
        marker: { x: 148, y: 1737 },
      },
      {
        name: 'Wizard',
        url: '/images/wizard.png',
        found: false,
        marker: { x: 2198, y: 2708 },
      },
      {
        name: 'Dragon',
        url: '/images/dragon.png',
        found: false,
        marker: { x: 1925, y: 1741 },
      },
    ],
  },

  {
    title: 'Super Mario Bros',
    image: '/images/egor-klyuchnyk-under-city.jpg',
    gameId: 'game-2',
    id: crypto.randomUUID(),
    characters: [
      {
        name: 'Fire Mario',
        url: '/images/fire-mario.webp',
        found: false,
        marker: { x: 3000, y: 2270 },
      },
      {
        name: 'King Boo',
        url: '/images/king-boo.webp',
        found: false,
        marker: { x: 1102, y: 2722 },
      },
      {
        name: 'Waluigi',
        url: '/images/waluigi.webp',
        found: false,
        marker: { x: 2541, y: 4738 },
      },
    ],
  },

  {
    title: 'Aquatic Aquarium',
    image: '/images/egor-klyuchnyk-cyberpunk-city.jpg',
    gameId: 'game-3',
    id: crypto.randomUUID(),
    characters: [
      {
        name: 'Feebas',
        url: '/images/feebas.webp',
        found: false,
        marker: { x: 222, y: 703 },
      },
      {
        name: 'Starmie',
        url: '/images/starmie.webp',
        found: false,
        marker: { x: 1916, y: 880 },
      },
      {
        name: 'Mantyke',
        url: '/images/mantyke.webp',
        found: false,
        marker: { x: 2108, y: 449 },
      },
    ],
  },
];

export default games;
