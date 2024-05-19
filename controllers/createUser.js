const data = require("../sql3-data");

module.exports = (req, res) => {
  let body = "";
  req.on("data", (chunc) => {
    body += chunc;
  });

  req.on("end", async () => {
    const parseBody = new URLSearchParams(body);
    const name = parseBody.get("name");
    const age = parseBody.get("age");

    if (name && age) {
      const user = { name, age: parseInt(age) };
      const createUser = await data.createUser(user);
      res.writeHead(201);
      res.end(JSON.stringify(createUser));
    } else {
      res.writeHead(400);
      res.end(
        JSON.stringify({ message: `Необходимы имя и возраст пользователя!` })
      );
    }
  });
};
