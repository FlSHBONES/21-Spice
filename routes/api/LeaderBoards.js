const router = require("express").Router();
const leaderBController = require("../../controllers/leaderBController");

// Matches with "/api/books"
router.route("/")
  .get(leaderBController.findAll)
  .post(leaderBController.create);

// Matches with "/api/leaderB/:id"
router
  .route("/:id")
  .get(leaderBController.findById)
  .put(leaderBController.update)
  .delete(leaderBController.remove);

module.exports = router;
