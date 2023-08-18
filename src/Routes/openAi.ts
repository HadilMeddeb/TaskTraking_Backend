import { Request } from "express";
import { openAIImage, openAIText } from "../controllers/openAi/openai";
const express = require('express');
const Router = express.Router();


Router.route('/text').post(openAIText);
Router.route('/image').post(openAIImage);


export { Router as openaiRouter };










