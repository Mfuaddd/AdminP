async function getFetch(id = "") {
    const data = await fetch("http://localhost:3000/projects/"+id)
    .then(res => res.json())
    .catch(er => console.log("getFetchFunction:",er.message))
    return data
}
async function createCard(idApi,imgApi,headerApi,textApi) {
    const table = document.querySelector(".table")
    const box = document.createElement("div")
    const info = document.createElement("div")
    const infoImg = document.createElement("img")
    const infoText = document.createElement("div")
    const infoHeader = document.createElement("h3")
    const infoBody = document.createElement("p")
    const action = document.createElement("div")
    const editBtn = document.createElement("a")
    const removeBtn = document.createElement("button")

    box.classList.add("box")

    info.classList.add("info")
    infoImg.setAttribute("src",imgApi)

    infoText.classList.add("infotext")
    infoHeader.textContent = headerApi
    infoBody.textContent = textApi

    action.classList.add("action")
    editBtn.classList.add("btn")
    editBtn.classList.add("edit")
    editBtn.setAttribute("href","http://127.0.0.1:5500/adminPanelEdit.html#"+idApi)
    editBtn.textContent = "Edit"


    removeBtn.classList.add("btn")
    removeBtn.classList.add("remove")
    removeBtn.textContent = "Remove"
    removeBtn.addEventListener("click",function () {
        fetch('http://localhost:3000/projects/'+idApi,{ method: 'Delete'});
        updateUi() 
    })
    

    infoText.append(infoHeader,infoBody)
    info.append(infoImg,infoText)
    action.append(editBtn,removeBtn)
    box.append(info,action)
    table.appendChild(box)
}
async function updateUi(){
    const box = document.querySelectorAll(".box")
    box.forEach(x=>x.remove())
    const search = document.querySelector(".search")
    data = await getFetch()
    try {
        const res = data.filter(x=>x.header.includes(search.value))
        res.forEach(el => createCard(el.id,el.img,el.header,el.text));
    } catch (error) {
        console.log("updateUiFunction:",error.message);
    }
}
updateUi()
const search = document.querySelector(".search")
console.log(search);
search.addEventListener("input", function () {
    updateUi()
})