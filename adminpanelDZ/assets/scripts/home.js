async function getFetch() {
    const data = await fetch("http://localhost:3000/projects/")
    .then(res => res.json())
    .catch(er => console.log("getFetchFunction:",er.message))
    return data
}
function createCard(imgApi,headerApi,textApi) {
    const wrapper = document.querySelector(".wrapper")
    const card = document.createElement("div")
    const cardImg = document.createElement("img")
    const cardHeader = document.createElement("h3")
    const cardText = document.createElement("p")

    card.classList.add("card")
    cardImg.setAttribute("src",imgApi)
    cardHeader.textContent = headerApi
    cardText.textContent = textApi

    card.append(cardImg,cardHeader,cardText)
    wrapper.appendChild(card)
}
async function updateUi(){
    data = await getFetch()
    try {
        data.forEach(el => createCard(el.img,el.header,el.text));
    } catch (error) {
        console.log("updateUiFunction:",error.message);
    }

}
updateUi()