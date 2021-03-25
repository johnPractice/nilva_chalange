const http = require("http");
const app = require("./config/app");
const server = http.createServer(app);
const { port } = require("./config");
const io = require("socket.io")(server);
const WebSockets = require("./src/utils/socket/webSocket");
global.io = io.listen(server);
global.io.on("connection", WebSockets.connection);
server.listen(port, () => {
  console.clear();
  console.log(`server runnig on ${port} 😇 `);
});
