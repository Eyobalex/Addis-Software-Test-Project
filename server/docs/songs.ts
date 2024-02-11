const createSongBody = {
  type: "object",
  properties: {
    title: {
      type: "string",
      example: "Tikur Sew",
    },
    artist: {
      type: "string",
      example: "Teddy Afro",
    },
    album: {
      type: "string",
      example: "Tikur sew",
    },
    genre: {
      type: "string",
      example: "Ethiopian Music",
    },
  },
};

const Song = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      example: "65c8ff793084fbbd88a2dca6",
    },
    title: {
      type: "string",
      example: "Tikur Sew",
    },
    artist: {
      type: "string",
      example: "Teddy Afro",
    },
    album: {
      type: "string",
      example: "Tikur sew",
    },
    genre: {
      type: "string",
      example: "Ethiopian Music",
    },
  },
};

const Error500 = {
  description: "Internal Server Error",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Internal Server Error. Please Try Again",
          },
        },
      },
    },
  },
};

const songIdParam = {
  name: "songId",
  in: "path",
  description: "ID of the song to retrieve",
  required: true,
  schema: {
    type: "string",
  },
};
const getSongs = {
  tags: ["Songs"],
  description: "Get all songs",
  operationId: "getAllSongs",

  responses: {
    "200": {
      description: "Songs retrived successfully!",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: Song,
            },
          },
        },
      },
    },
    "500": Error500,
  },
};
const getSongStatistics = {
  tags: ["Songs"],
  description: "Get song statistics",
  operationId: "getSongStatistics",

  responses: {
    "200": {
      description: "",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              totalSongs: {
                type: "number",
                example: 10,
              },
              totalArtists: {
                type: "number",
                example: 10,
              },
              totalAlbums: {
                type: "number",
                example: 10,
              },
              totalGenres: {
                type: "number",
                example: 10,
              },
            },
          },
        },
      },
    },
    "500": Error500,
  },
};
const getSongStatisticsByArtist = {
  tags: ["Songs"],
  description: "Get song statistics by artist",
  operationId: "getSongStatisticsByArtist",

  responses: {
    "200": {
      description: "",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                artist: {
                  type: "string",
                  example: "Teddy Afro",
                },
                totalSongs: {
                  type: "number",
                  example: 10,
                },
                totalAlbums: {
                  type: "number",
                  example: 10,
                },
               
              },
            },
          },
        },
      },
    },
    "500": Error500,
  },
};
const getSongStatisticsByAlbum = {
  tags: ["Songs"],
  description: "Get song statistics by album",
  operationId: "getSongStatisticsByAlbum",

  responses: {
    "200": {
      description: "",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                album: {
                  type: "string",
                  example: "Tikur Sew",
                },
                totalSongs: {
                  type: "number",
                  example: 10,
                }
               
              },
            },
          },
        },
      },
    },
    "500": Error500,
  },
};
const getSongStatisticsByGenre = {
  tags: ["Songs"],
  description: "Get song statistics by genre",
  operationId: "getSongStatisticsByGenre",

  responses: {
    "200": {
      description: "",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                genre: {
                  type: "string",
                  example: "Ethiopian Music",
                },
                totalSongs: {
                  type: "number",
                  example: 10,
                }
               
              },
            },
          },
        },
      },
    },
    "500": Error500,
  },
};
const getSong = {
  tags: ["Songs"],
  description: "Get a songs",
  operationId: "getASongs",
  parameters: [songIdParam],
  responses: {
    "200": {
      description: "Song retrived successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: Song,
          },
        },
      },
    },
    "500": Error500,
  },
};
const getArtists = {
  tags: ["Songs"],
  description: "Get distinct artists",
  operationId: "getArtists",
  responses: {
    "200": {
      description: "",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items:  {
                type: "stirng",
                example: "Teddy Afro"
            },
          },
        },
      },
    },
    "500": Error500,
  },
};
const getAlbums = {
  tags: ["Songs"],
  description: "Get distinct albums",
  operationId: "getAlbums",
  responses: {
    "200": {
      description: "",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items:  {
                type: "stirng",
                example: "Tikur sew"
            },
          },
        },
      },
    },
    "500": Error500,
  },
};
const getGenres = {
  tags: ["Songs"],
  description: "Get distinct genres",
  operationId: "getGenres",
  responses: {
    "200": {
      description: "",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items:  {
                type: "stirng",
                example: "Ethiopian music"
            },
          },
        },
      },
    },
    "500": Error500,
  },
};
const createSong = {
  tags: ["Songs"],
  description: "Create a new song",
  operationId: "createSong",

  requestBody: {
    content: {
      "application/json": {
        schema: createSongBody,
      },
    },
    required: true,
  },
  responses: {
    "201": {
      description: "Song created successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: Song,
          },
        },
      },
    },
    "500": Error500,
  },
};
const updateSong = {
  tags: ["Songs"],
  description: "Update a song",
  operationId: "updateSong",
  parameters: [songIdParam],
  requestBody: {
    content: {
      "application/json": {
        schema: createSongBody,
      },
    },
    required: true,
  },
  responses: {
    "201": {
      description: "Song Updated successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: Song,
          },
        },
      },
    },
    "500": Error500,
  },
};
const deleteSong = {
  tags: ["Songs"],
  description: "Delete a song",
  operationId: "createSong",
  parameters: [songIdParam],

  responses: {
    "200": {
      description: "Song deleted successfully!",
    },
    "500": Error500,
  },
};

export { getSong, getSongs, getSongStatistics, getSongStatisticsByArtist, getSongStatisticsByAlbum, getSongStatisticsByGenre, createSong, deleteSong, updateSong,createSongBody };
