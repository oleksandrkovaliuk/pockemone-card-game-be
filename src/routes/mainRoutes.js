const express = require("express");
const router = express.Router();

const getNonce = require("../api/auth/getNonce");
const verifyAndGetUser = require("../api/auth/verifyAndGetUser");
const authenticateUser = require("../api/auth/authenticateUser");

const getPokemonsByRequest = require("../api/pokemons/getPokemonsByRequest");

const getCurrentFight = require("../api/userGameEnvirment/getCurrentFight");
const generateUserOponent = require("../api/userGameEnvirment/generateUserOponent");

const authenticateToken = require("../middelwares/authenticateToken");

// POKEMONS
router.route("/pokemons/get").get(authenticateToken, getPokemonsByRequest);

// AUTH
router.route("/auth/get/nonce").get(getNonce);
router.route("/auth/authenticate/user").post(authenticateUser);
router.route("/auth/get/user").get(authenticateToken, verifyAndGetUser);

// GAME ENVIRONMENT
router
  .route("/game/generate/user/opponent")
  .post(authenticateToken, generateUserOponent);

router.route("/game/get/current/fight").get(authenticateToken, getCurrentFight);

module.exports = router;
