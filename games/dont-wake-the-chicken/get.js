const api = "https://games.roproxy.com/v1/games?universeIds="
//const iconApi = "https://thumbnails.roproxy.com/v1/games/icons?size=256x256&format=Png&isCircular=false&universeIds="
const gameLink = "https://www.roblox.com/games/"

const id = 6731183935

/*
async function getIcon(universe) {
    const raw = await fetch(iconApi + universe)
    const json = await raw.json()
    const data = json.data[0]

    return data.imageUrl
}
*/

async function getData(universe) {
    const raw = await fetch(api + universe)
    const json = await raw.json()
    const data = json.data[0]
    
    const dataTable = {
        Name: data.name,
        Desc: data.description,
        LikeRatio: "100%",
        Active: data.playing,
        Visits: data.visits,
        Genre: data.genre_l1,
    }
    
    return dataTable
}

async function load() {
    let data = await getData(id)

    let title = document.getElementById("title")
    let desc = document.getElementById("desc")
    let active = document.getElementById("active")
    let visits = document.getElementById("visits")
    let likeRatio = document.getElementById("like-ratio")
    let genre = document.getElementById("genre")

    if (title) {title.textContent = data.Name}
    if (desc) {desc.textContent = data.Desc}
    if (active) {active.textContent = data.Active}
    if (visits) {visits.textContent = data.Visits}
    if (likeRatio) {likeRatio.textContent = data.LikeRatio}
    if (genre) {genre.textContent = data.Genre}
}

addEventListener("DOMContentLoaded", () => {
    load()
})
