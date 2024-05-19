var url = require("url");
const createUser = require("../controllers/createUser");
const getAllUsers = require("../controllers/getAllUsers");
const getOneUser = require("../controllers/getOneUser");
const updateUser = require("../controllers/updateUser");
const deleteUser = require("../controllers/deleteUser");

const userRoutes = (req, res) => {
  const { pathname } = url.parse(req.url, true);
  const method = req.method;

  res.setHeader("Content-Type", "application/json");

  if (pathname === "/users" && method === "POST") {
    createUser(req, res);
  } else if (pathname === "/users" && method === "GET") {
    getAllUsers(req, res);
  } else if (pathname.startsWith(`/users/`) && method === "GET") {
    getOneUser(req, res);
  } else if (pathname.startsWith(`/users/`) && method === "PUT") {
    updateUser(req, res);
  } else if (pathname.startsWith(`/users/`) && method === "DELETE") {
    deleteUser(req, res);
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: `Маршрут не существует!` }));
  }
};

module.exports = userRoutes;
