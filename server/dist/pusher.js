"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pusher = void 0;
var pusher_1 = __importDefault(require("pusher"));
exports.pusher = new pusher_1.default({
    appId: "1106434",
    key: "bb4463eabd5b2e65a6ec",
    secret: "c234e10d0eb931d1d020",
    cluster: "eu",
    useTLS: true
});
