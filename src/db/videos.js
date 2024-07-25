const data =[
    {
    "id": "4KZ_tU5LdR0"
    },

    {
    "id": "PctRXczIz4M"
    },
];

export default function defaultVideos(){

    const randomIndex1 = Math.floor(Math.random() * data.length);
    let randomIndex2 = Math.floor(Math.random() * data.length);

    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * data.length);
    }

    return [data[randomIndex1].id, data[randomIndex2].id];
}