#!/usr/bin/env node
const axios = require("axios");
const readline = require("readline");
require("dotenv").config();

const chatGPT = async (msg = "Hello, ChatGPT") => {
    try {
        const {
            data: {
                choices: [
                    {
                        message: { content },
                    },
                ],
            },
        } = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: msg }],
                max_tokens: 150,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.API_KEY}`,
                },
            }
        );
        // Create a readline interface
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        // Output to the user
        rl.question(content + "\n", (msg) => {
            chatGPT(msg);

            // Cerrar la interfaz
            rl.close();
        });
    } catch ({ response: { data } }) {
        console.error(data);
    }
};

chatGPT();
