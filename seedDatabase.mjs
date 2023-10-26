import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    // Create a new game and its levels
    const game = await prisma.game.create({
      data: {
        name: 'Pixel Hunt Game',
        levels: {
          create: [
            {
              name: 'Robot City',
              image: '/images/egor-klyuchnyk-robot-city.jpg',
              characters: {
                create: [
                  {
                    position: 1,
                    name: 'Ghostface',
                    image: '/images/ghostface.png',
                    found: false,
                    coordinates: {
                      create: {
                        x: {
                          create: {
                            startX: 110,
                            endX: 119,
                          },
                        },
                        y: {
                          create: {
                            startY: 110,
                            endY: 119,
                          },
                        },
                      },
                    },
                  },
                  {
                    position: 2,
                    name: 'Mike Wazowski',
                    image: '/images/mike-wazowski.png',
                    found: false,
                    coordinates: {
                      create: {
                        x: {
                          create: {
                            startX: 210,
                            endX: 219,
                          },
                        },
                        y: {
                          create: {
                            startY: 210,
                            endY: 219,
                          },
                        },
                      },
                    },
                  },
                  {
                    position: 3,
                    name: 'Leonardo',
                    image: '/images/leonardo.png',
                    found: false,
                    coordinates: {
                      create: {
                        x: {
                          create: {
                            startX: 310,
                            endX: 319,
                          },
                        },
                        y: {
                          create: {
                            startY: 310,
                            endY: 319,
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
            {
              name: 'Cyberpunk City',
              image: '/images/egor-klyuchnyk-cyberpunk-city.jpg',
              characters: {
                create: [
                  {
                    position: 1,
                    name: 'Stewie Griffin',
                    image: '/images/stewie-griffin.png',
                    found: false,
                    coordinates: {
                      create: {
                        x: {
                          create: {
                            startX: 120,
                            endX: 129,
                          },
                        },
                        y: {
                          create: {
                            startY: 120,
                            endY: 129,
                          },
                        },
                      },
                    },
                  },
                  {
                    position: 2,
                    name: 'Patrick Star',
                    image: '/images/patrick-star.png',
                    found: false,
                    coordinates: {
                      create: {
                        x: {
                          create: {
                            startX: 220,
                            endX: 229,
                          },
                        },
                        y: {
                          create: {
                            startY: 220,
                            endY: 229,
                          },
                        },
                      },
                    },
                  },
                  {
                    position: 3,
                    name: 'Darkwing Duck',
                    image: '/images/darkwing-duck.png',
                    found: false,
                    coordinates: {
                      create: {
                        x: {
                          create: {
                            startX: 320,
                            endX: 329,
                          },
                        },
                        y: {
                          create: {
                            startY: 320,
                            endY: 329,
                          },
                        },
                      },
                    },
                  },
                  {
                    position: 4,
                    name: 'Wally',
                    image: '/images/wally.png',
                    found: false,
                    coordinates: {
                      create: {
                        x: {
                          create: {
                            startX: 420,
                            endX: 429,
                          },
                        },
                        y: {
                          create: {
                            startY: 420,
                            endY: 429,
                          },
                        },
                      },
                    },
                  },
                  {
                    position: 5,
                    name: 'Brian Griffin',
                    image: '/images/brian-griffin.png',
                    found: false,
                    coordinates: {
                      create: {
                        x: {
                          create: {
                            startX: 520,
                            endX: 529,
                          },
                        },
                        y: {
                          create: {
                            startY: 520,
                            endY: 529,
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
            {
              name: 'Under City',
              image: '/images/egor-klyuchnyk-under-city.jpg',
              characters: {
                create: [
                  {
                    position: 1,
                    name: 'Ghostface',
                    image: '/images/ghostface.png',
                    found: false,
                    coordinates: {
                      create: {
                        x: {
                          create: {
                            startX: 130,
                            endX: 139,
                          },
                        },
                        y: {
                          create: {
                            startY: 130,
                            endY: 139,
                          },
                        },
                      },
                    },
                  },
                  {
                    position: 2,
                    name: 'Tom',
                    image: '/images/tom.png',
                    found: false,
                    coordinates: {
                      create: {
                        x: {
                          create: {
                            startX: 230,
                            endX: 239,
                          },
                        },
                        y: {
                          create: {
                            startY: 230,
                            endY: 239,
                          },
                        },
                      },
                    },
                  },
                  {
                    position: 3,
                    name: 'Smiler',
                    image: '/images/smiler.png',
                    found: false,
                    coordinates: {
                      create: {
                        x: {
                          create: {
                            startX: 330,
                            endX: 339,
                          },
                        },
                        y: {
                          create: {
                            startY: 330,
                            endY: 339,
                          },
                        },
                      },
                    },
                  },
                  {
                    position: 4,
                    name: 'Patrick Star',
                    image: '/images/patrick-star.png',
                    found: false,
                    coordinates: {
                      create: {
                        x: {
                          create: {
                            startX: 430,
                            endX: 439,
                          },
                        },
                        y: {
                          create: {
                            startY: 430,
                            endY: 439,
                          },
                        },
                      },
                    },
                  },
                  {
                    position: 5,
                    name: 'Daggett Beaver',
                    image: '/images/daggett-beaver.png',
                    found: false,
                    coordinates: {
                      create: {
                        x: {
                          create: {
                            startX: 530,
                            endX: 539,
                          },
                        },
                        y: {
                          create: {
                            startY: 530,
                            endY: 539,
                          },
                        },
                      },
                    },
                  },
                  {
                    position: 6,
                    name: 'Six',
                    image: '/images/six.png',
                    found: false,
                    coordinates: {
                      create: {
                        x: {
                          create: {
                            startX: 630,
                            endX: 639,
                          },
                        },
                        y: {
                          create: {
                            startY: 630,
                            endY: 639,
                          },
                        },
                      },
                    },
                  },
                  {
                    position: 7,
                    name: 'Dandelion',
                    image: '/images/dandelion.png',
                    found: false,
                    coordinates: {
                      create: {
                        x: {
                          create: {
                            startX: 730,
                            endX: 739,
                          },
                        },
                        y: {
                          create: {
                            startY: 730,
                            endY: 739,
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      include: {
        levels: {
          include: {
            characters: {
              include: {
                coordinates: {
                  include: {
                    x: true,
                    y: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log('Seeding completed. Game:', game);
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
