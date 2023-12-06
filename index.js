const OpenAI = require("openai");
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.AI_APIKEY,
});

// console.log(process.env.AI_APIKEY);
// console.log(openai);

var test = async () => {

    //? IMAGE GENERATION
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: "logo for body building website",
        n: 1,
        size: "1024x1024",
    });

    var image_url = response.data[0];

    console.log(image_url);

    //? TEXT GENERATION
    // const response = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo-1106",
    //     response_format: { type: "json_object" },
    //     messages: [
    //         { "role": "system", "content": "You are a helpful assistant that output JSON." },
    //         { "role": "user", "content": "can you write a paragraph to sell girls dresses?" },
    //     ]
    // });

    // console.log(response.choices[0].message);


};

test();
