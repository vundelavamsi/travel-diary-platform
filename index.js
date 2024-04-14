const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

//Importing Classes
const User = require("./routes/user.js");
const DiaryEntry = require("./routes/diaryEntry.js");

const app = express();

const dbPath = path.join(__dirname, "travel_diary.db");

let db = null;
let user = null;
let diaryEntry = null;

const initializeDbServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    user = new User(db);
    diaryEntry = new DiaryEntry(db);
    app.listen(3000, () => {
      console.log("DataBase Connected");
    });
  } catch (e) {
    console.log(`DB Error ${e.message}`);
    process.exit(1);
  }
};

initializeDbServer();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        next();
      }
    });
  }
};

//Register
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await user.register(username, password);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

//Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await user.login(username, password);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Failed to login" });
  }
});

//Get Users
app.get("/users", async (req, res) => {
  try {
    const users = await user.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error Getting users:", error);
    res.json({ error: "Failed to get results" });
  }
});

// Route for creating a diary entry
app.post("/diary", async (req, res) => {
  try {
    const { userId, title, description, date, location, photos } = req.body;
    const result = await diaryEntry.create(
      userId,
      title,
      description,
      date,
      location,
      photos
    );
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating diary entry:", error);
    res.status(500).json({ error: "Failed to create diary entry" });
  }
});

// Route for getting all diary entries
app.get("/diary-entries", async(req,res) => {
    try {
        const result = await diaryEntry.getDiaryEntries();
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error Getting Diary entries:", error);
        res.json({ error: "Failed to get diary entries" });
      }
})

// Route for updating a diary entry
app.put("/diary/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, location, photos } = req.body;
    const result = await diaryEntry.update(
      id,
      title,
      description,
      date,
      location,
      photos
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating diary entry:", error);
    res.status(500).json({ error: "Failed to update diary entry" });
  }
});

// Route for deleting a diary entry
app.delete("/diary/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await diaryEntry.delete(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting diary entry:", error);
    res.status(500).json({ error: "Failed to delete diary entry" });
  }
});
