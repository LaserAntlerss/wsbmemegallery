/*
    GEOCITIES ART GALLERY
    Procedural GIF Decorations

    Loads decoration pools from:
    images/decorations/manifest.json

    Categories:
    - normal
    - additive
*/


const decorationLayer = document.getElementById("decorations");


const decorationRoot = "images/decorations/";


const settings = {

    normalCount: 12,

    additiveCount: 18,

    minSize: 32,

    maxSize: 96,

    minOpacity: 0.35,

    maxOpacity: 0.85

};



function random(min, max){

    return Math.random() * (max - min) + min;

}



function pickRandom(array){

    return array[
        Math.floor(Math.random() * array.length)
    ];

}



function createDecoration(filename, type){

    const img = document.createElement("img");


    img.src =
        decorationRoot +
        type +
        "/" +
        filename;


    if(type === "additive"){

        img.classList.add("additive");

    }


    img.style.left =
        `${random(0, 100)}vw`;


    img.style.top =
        `${random(0, 100)}vh`;


    const size =
        random(
            settings.minSize,
            settings.maxSize
        );


    img.style.width =
        `${size}px`;

    img.style.height =
        `${size}px`;


    img.style.opacity =
        random(
            settings.minOpacity,
            settings.maxOpacity
        );


    decorationLayer.appendChild(img);

}



async function loadDecorations(){

    try{

        const response =
            await fetch(
                "images/decorations/manifest.json"
            );


        const manifest =
            await response.json();



        for(let i = 0; i < settings.normalCount; i++){

            createDecoration(
                pickRandom(manifest.normal),
                "normal"
            );

        }



        for(let i = 0; i < settings.additiveCount; i++){

            createDecoration(
                pickRandom(manifest.additive),
                "additive"
            );

        }


    }

    catch(error){

        console.error(
            "Failed to load decorations:",
            error
        );

    }

}



loadDecorations();
