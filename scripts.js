var $ = require("jquery");
const OpenAI = require("openai");
require('dotenv').config();

const openai = new OpenAI({
    // apiKey: process.env.AI_APIKEY,
    apiKey: "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",
    dangerouslyAllowBrowser: true
});

// console.log(process.env.AI_APIKEY);
// console.log(openai);

var image = async (str, elem) => {

    //? IMAGE GENERATION
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: str,
            n: 1,
            size: "1024x1024",
        });

        var image_url = response.data[0].url;
        var image_alt = response.data[0].revised_prompt;

        console.log(response);
        console.log(image_url);

        $(elem).closest('.the-form').next().html(`<img src="${image_url}" alt="${image_alt}">`);
        $(elem).closest('.the-form').next().next().html('');
        $(elem).closest('.the-form').closest('.input-container').show();
        $(elem).closest('.the-form').closest('.input-container').prev().hide();

    } catch (openai) {
        console.log(`oops something went wrong`);
        console.log(openai.error);
        $(elem).closest('.the-form').next().next().html(openai.error.message);
        $(elem).closest('.the-form').closest('.input-container').prev().hide();
        $(elem).closest('.the-form').closest('.input-container').show();
        // console.log(err);
    }



};

var text = async (str, elem) => {

    //? TEXT GENERATION
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        // response_format: { type: "json_object" },
        messages: [
            // { "role": "system", "content": "You are a helpful assistant that output JSON." },
            { "role": "system", "content": "You are a helpful assistant." },
            { "role": "user", "content": str },
        ]
    });

    console.log(response);
    console.log(response.choices[0].message.content);
    var output = response.choices[0].message.content;

    $(elem).closest('.the-form').next().html(`${output}`);
    $(elem).closest('.the-form').closest('.input-container').show();
    $(elem).closest('.the-form').closest('.input-container').prev().hide();
};





$(document).ready(function () {

    $('.tabs li').on('click', function () {
        console.log(this.className);
        if (this.className !== 'active') {
            $('.tabs li').removeClass('active');
            $(this).addClass('active');
            var tab = $(this).attr('data-tab');
            $('.user-input-container div').removeClass('active');
            $(`.user-input-container div.${tab}`).addClass(`active`);
        }
    });

    $('.text button').on('click', function (e) {
        e.preventDefault();
        var str = $(this).prev().val();
        $(this).closest('.the-form').closest('.input-container').hide();
        $(this).closest('.the-form').closest('.input-container').prev().show();
        // console.log(str);
        text(str, this);
    });

    $('.image button').on('click', function (e) {
        e.preventDefault();
        var str = $(this).prev().val();
        $(this).closest('.the-form').closest('.input-container').hide();
        $(this).closest('.the-form').closest('.input-container').prev().show();
        // console.log(str);
        image(str, this);
    });
});