"use strict";

const express = require("express");
//routes are different endpoints or paths your server is working with
const routes = express.Router();

const movies = [
  {
    id: 1,
    title: "2001: A Space Odyssey",
    year: 1968,
    animated: false,
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    animated: false,
  },
  {
    id: 3,
    title: "The Lion King",
    year: 1994,
    animated: true,
  },
  {
    id: 4,
    title: "Black Panther",
    year: 2018,
    animated: false,
  },
];

let nextId = 5;

// GET /movies - respond with a JSON array of movies
routes.get("/movies", (req, res) => {
  res.json(movies);
});

routes.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    res.send(`No movie with id ${id} exists.`);
  }
});

routes.post("/movies", (req, res) => {
  const movie = req.body;
  movie.id = nextId++;
  movies.push(movie);

  res.status(201);
  res.json(movie);
});

routes.delete("/movies/:id", (req, res) => {
  console.log("Ran DELETE");
  const id = parseInt(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index != -1) {
    movies.splice(index, 1);
  }
  res.status(204);
  console.log("Finished DELETE");
  //always have to send something to the client. Every interactioin between the client and the server: 1. client does its thing and 2. the server sends its response. Even if its blank.
  res.send();
});

// export routes for use in server.js
module.exports = routes;
