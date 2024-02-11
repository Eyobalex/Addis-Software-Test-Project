
import * as ApiDocs from "./songs.js";
import {createSongBody} from "./songs.js";

const apiDocumentation = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Addis Songs API",
    description: "Api for an interview project for addis software",
    contact: {
      name: "Eyob Alemayehu",
      email: "eyobalemayehu007@gmail.com",
      phone: "+251913305247",
    },
  },
  servers: [
    {
      url: "http://localhost:8080/api/",
      description: "Local Server",
    },
    {
      url: "https://addis-test-project-l7g0.onrender.com/api",
      description: "Production Server",
    },
  ],
  tags: [
    {
      name: "Songs",
    },
  ],
  paths: {
    "/songs": {
      get: ApiDocs.getSongs,
    },
    "/songs/{songId}": {
      get: ApiDocs.getSong,
    },
    "/songs/statistics": {
        get: ApiDocs.getSongStatistics
    },
    "/songs/statistics-by-artist": {
        get: ApiDocs.getSongStatisticsByArtist
    },
    "/songs/statistics-by-album": {
        get: ApiDocs.getSongStatisticsByAlbum
    },
    "/songs/statistics-by-genre": {
        get: ApiDocs.getSongStatisticsByGenre
    },
    "/songs/create": {
      post: ApiDocs.createSong,
    },
    "/songs/update/{songId}": {
      post: ApiDocs.createSong,
    },
    "/songs/delete/{songId}": {
      delete: ApiDocs.deleteSong,
    },
  },
  components: {
    schemas: {
      createSongBody,
    },
  },
};

export { apiDocumentation };
