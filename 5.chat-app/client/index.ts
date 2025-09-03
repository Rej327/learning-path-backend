import io from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => console.log("Connected to server"));

socket.on("messageReceived", (message: { id: string; content: string }) => {
    console.log(`[MESSAGE FROM POSTMAN] ID: ${message.id}, Content: ${message.content}`);
});

socket.on("fileUploaded", (file: { id: string; filename: string; url: string }) => {
    console.log(`[FILE FROM POSTMAN] ID: ${file.id}, Filename: ${file.filename}, URL: ${file.url}`);
});