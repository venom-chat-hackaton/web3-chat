import express, { Express } from "express";
import * as bodyParser from "body-parser";
import { listenNewMessage } from "./subscribe";

console.log("Start listening ...");

listenNewMessage()
  .then(() => {
    console.log("Listening for new messages...");
  })
  .catch(error => {
    console.error("Error:", error);
  });
