const http = require("http");
const requestHandler = require("./router");

const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => console.log(`setver starting in ${PORT} port`));
