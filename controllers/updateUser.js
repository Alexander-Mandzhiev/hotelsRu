const data = require("../sql3-data");

module.exports = (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  let body = "";
  req.on("data", (chunc) => {
    body += chunc;
  });

  req.on("end", async () => {
    const parseBody = new URLSearchParams(body);
    const updateData = {};

    parseBody.forEach((value, key) => {
      updateData[key] = key === "age" ? parseInt(value) : value;
    });

    const updatedUser = await data.updateUser(id, updateData);
    if (updatedUser) {
      res.writeHead(201);
      res.end(JSON.stringify(updatedUser));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: `Пользователь не существует!` }));
    }
  });
};
