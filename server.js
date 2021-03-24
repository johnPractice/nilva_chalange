const http = require("http");
const app = require("./config/app");
const server = http.createServer(app);
const { port } = require("./config");

server.listen(port, () => {
  console.clear();
  console.log(`server runnig on ${port} 😇 `);
});
