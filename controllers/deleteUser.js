const data = require("../sql3-data");

module.exports = async (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  const success = await data.deleteUser(id);
  if (success) {
    res.writeHead(204);
    console.log(`Пользователь удалён!`);
    res.end(JSON.stringify({ message: `Пользователь удалён!` }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: `Пользователь не существует!` }));
  }
};
