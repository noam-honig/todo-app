import express from "express";
import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/Task";
import { TasksController } from "../shared/TasksController";
import cors from "cors";



const app = express();
app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5173' }))
//#region auth
import session from "cookie-session";
import { UserInfo } from "remult";


app.use("/api", session({ secret: process.env['SESSION_SECRET'] || "my secret" }));

export const validUsers: UserInfo[] = [
  { id: "1", name: "Jane" },
  { id: "2", name: "Steve" },
];
app.use(express.json());
app.post("/api/signIn", (req, res) => {
  const user = validUsers.find((user) => user.name === req.body.username);
  if (user) {
    req.session!['user'] = user;
    res.json(user);
  } else {
    res.status(404).json("Invalid user, try 'Steve' or 'Jane'");
  }
});

app.post("/api/signOut", (req, res) => {
  req.session!['user'] = null;
  res.json("signed out");
});

app.get("/api/currentUser", (req, res) =>
  res.json(req.session!['user'])
);
//#endregion


app.use(remultExpress({
  getUser: req => req.session!['user'],
  entities: [Task],
  controllers: [TasksController]
}));
const frontendFiles = process.cwd() + '/dist';
app.use(express.static(frontendFiles));
app.get('/*', (_, res) => {
  res.send(frontendFiles + '/index.html');
});
app.listen(process.env["PORT"] || 3002, () => console.log("Server started"));