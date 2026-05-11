const router = require("express").Router();
const axios = require("axios");

const TMDB_BASE = "https://api.themoviedb.org/3";

const proxyTMDB = async (res, path, extraParams = "") => {
  const url =
    `${TMDB_BASE}${path}?api_key=${process.env.TMDB_API_KEY}${extraParams}`;
  try {
    const { data } = await axios.get(url);
    res.json(data);
  } catch (err) {
    if (err.response) {
      return res
        .status(err.response.status)
        .json({ error: "TMDB request failed" });
    }
    console.error("TMDB proxy error:", err.message);
    res.status(500).json({ error: "Upstream failure" });
  }
};

router.get("/list/top_rated", (req, res) => {
  proxyTMDB(res, "/movie/top_rated");
});

router.get("/list/now_playing", (req, res) => {
  proxyTMDB(res, "/movie/now_playing");
});

router.get("/search", (req, res) => {
  const q = encodeURIComponent(req.query.q ?? "");
  proxyTMDB(res, "/search/movie", `&query=${q}`);
});

router.get("/:id", (req, res) => {
  const id = encodeURIComponent(req.params.id);
  proxyTMDB(res, `/movie/${id}`, "&append_to_response=videos");
});

module.exports = router;
