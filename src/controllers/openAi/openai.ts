import { Request, Response } from "express";
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();


const configuration = new Configuration({
  apiKey: process.env.MARAMKEY,
});

console.log("--------------------> process.env.APIKEY :",process.env.MARAMKEY)

const openai = new OpenAIApi(configuration);
export const openAIText = async (req:Request, res:Response) => {

    console.log("-------------------> process.env.APIKEY",configuration)
  const { prompt, model } = req.body;
  console.log("dddddddddddddddddddddddddddddd",{ prompt, model } )
  try {
    const result = await openai.createCompletion({
      model,
      prompt,
      temperature: 0,
      max_tokens: 100,
    });
    console.log("-------------------> result :", result)
    return res.json({ result: result.data.choices[0].text });
  } catch (error:any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    } else {
      console.log(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
};




export const openAIImage = async(req:Request, res:Response) => {
  const { prompt } = req.body;
  try {
    const result = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512',
    });
    return res.json({ result: result.data.data[0].url });
  } catch (error:any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    } else {
      console.log(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = { openAIText, openAIImage }