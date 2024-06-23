const express = require('express');
const bodyParser = require('body-parser');


let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const errors = require("./helpers/errors");
const adminController = require('./controllers/adminController');
const errorController = require("./global-controllers/errorController");
const authRoutes = require("./routers/auth");
const tournamentRoutes = require('./routers/tournamentRoute');
const adminRoutes = require('./routers/adminRouter');
const applicationRoutes = require('./routers/applicationRouter');
const ratingRoutes = require('./routers/ratingRouter');
const statisticsRoutes = require('./routers/statisticsRouter');
const matchesRoutes = require('./routers/matchesRouter');
const userRoutes = require('./routers/userRouter');
const playerRoutes = require('./routers/playerRouter');
const newsRoutes = require('./routers/newsRouter');

app.use('/', authRoutes);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/admin/",adminRoutes);
app.use("/tournament/",tournamentRoutes);
app.use("/application/",applicationRoutes);
app.use("/rating/", ratingRoutes);
app.use("/statistics/", statisticsRoutes);
app.use("/matches/", matchesRoutes);
app.use("/user/", userRoutes);
app.use("/player/",playerRoutes);
app.use("/news/", newsRoutes);

app.use((req, res, next) => {
  res.error(errors.resourseNotFound);
});

app.use(errorController);

app.listen(3000, () => console.log("Server running at port 3000"));
