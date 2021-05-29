"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var discord_1 = require("./discord");
dotenv_1.default.config();
var OPENAI_API_KEY = process.env.OPENAI_API_KEY;
discord_1.initDiscordClient();
//# sourceMappingURL=index.js.map