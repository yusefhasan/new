const io = require("socket.io-client");
const React = require("react");
const SOCKET_URL = "http://localhost:5001";
module.exports.socket = io(SOCKET_URL);
// app context
module.exports.AppContext = React.createContext();
