const api = "https://games.roproxy.com/v1/games?universeIds="
const iconApi = "https://thumbnails.roproxy.com/v1/games/icons?size=256x256&format=Png&isCircular=false&universeIds="
const gameLink = "https://www.roblox.com/games/"

const blockLabsId = 5720928288

function truncate(text, to) {
    let i = text.indexOf(to)
    if (i >= 0) {
        return text.substring(0, i)
    } else {
        return text
    }
}

function getDateDifference(otherDate) {
    const currentDate = new Date()
    otherDate = new Date(otherDate)
    let difference = currentDate - otherDate
    difference = Math.floor(difference / 86400000)
    return difference
}

async function getIcon(universe) {
    const raw = await fetch(iconApi + universe)
    const json = await raw.json()
    const data = json.data[0]

    return data.imageUrl
}

async function getData(universe) {
    const raw = await fetch(api + universe)
    const json = await raw.json()
    const data = json.data[0]
    
    const dataTable = {
        Name: data.name,
        Icon: await getIcon(universe),
        Link: gameLink + data.rootPlaceId,
        Desc: truncate(data.description, "\n"),
        LikeRatio: "100%",
        Active: data.playing,
        Visits: data.visits,
        Genre: data.genre_l1,
        DaysSinceUpdate: getDateDifference(data.updated)
    }
    
    return dataTable
}

async function loadGames() {
    let blockLabsData = await getData(blockLabsId)
    let blockLabsGBox = document.getElementById("block-labs")
    let blockLabs = blockLabsGBox.children
    blockLabs[0].src = blockLabsData.Icon
    blockLabs[1].textContent = blockLabsData.Name
    blockLabs[2].textContent = blockLabsData.LikeRatio + " • " + blockLabsData.Genre
    blockLabs[3].textContent = blockLabsData.Desc
    console.log(blockLabsData.Name + " has " + blockLabsData.Visits + " visits, and " + blockLabsData.Active + " people are playing it right now! It was last updated " + blockLabsData.DaysSinceUpdate + " day(s) ago, and the description says: \n\n\"" + blockLabsData.Desc + "\"\n\nIcon link: " + blockLabsData.Icon + "\nGame link: " + blockLabsData.Link)
}

loadGames()
