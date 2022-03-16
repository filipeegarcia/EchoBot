const http = require("http");
const io = require("socket.io");
const socketIOClient = require("socket.io-client");

let socketIo;
let server;
let serverInfo;
let socketIOServer;

beforeAll((done) => {
  server = http.createServer().listen();
  serverInfo = server.address();
  socketIOServer = io(server);
  done();
});

afterAll((done) => {
  socketIOServer.close();
  server.close();
  done();
});

beforeEach((done) => {
  socketIo = socketIOClient.connect(
    `http://[${serverInfo.address}]:${serverInfo.port}`,
    {
      "reconnection delay": 0,
      "reopen delay": 0,
      "force new connection": true,
      transports: ["websocket"],
    }
  );
  socketIo.on("connect", () => {
    done();
  });
});

describe("testing socket.io", () => {
  it("successfully echo's the received message", (done) => {
    socketIOServer.emit("sendMessage", "foo");
    socketIo.once("sendMessage", (message) => {
      expect(message).toBe("foo");
      done();
    });
  });
});
