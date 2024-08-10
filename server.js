import sqlite3 from "sqlite3";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  app.send("hello");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
