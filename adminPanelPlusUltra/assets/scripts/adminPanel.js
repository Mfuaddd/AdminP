async function myFetch(method = "GET",id = "",icon,head,text) {
    let data
    if (method === "GET") {
        data = await fetch("http://localhost:3000/projects/"+id,{method: "GET"})
        .then(res => res.json())
        .catch(er => console.log("myFetchGet:",er.message))
    }
    else if (method === "PUT") {
        data = await fetch("http://localhost:3000/projects/"+id,{
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({img: icon, header: head,text: text})
        })
        .then(res => res.json())
        .catch(er => console.log("myFecthPut:",er.message))  
    }
    else if (method === "POST") {
        data = await fetch("http://localhost:3000/projects/"+id,{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({img: icon, header: head,text: text})
        })
        .then(res => res.json())
        .catch(er => console.log("myFecthPost:",er.message)) 
    }
    else if (method === "DELETE") {
        data = await fetch("http://localhost:3000/projects/"+id,{method: "DELETE"})
        .then(res => res.json())
        .catch(er => console.log("myFetchDelete:",er.message))
    }

    return data
}
let what
async function createCard(idApi,imgApi,headerApi,textApi) {
    const table = document.querySelector(".table")
    const box = document.createElement("div")
    const info = document.createElement("div")
    const infoImg = document.createElement("img")
    const infoText = document.createElement("div")
    const infoHeader = document.createElement("h3")
    const infoBody = document.createElement("p")
    const action = document.createElement("div")
    const editBtn = document.createElement("button")
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
    editBtn.setAttribute("href","")
    editBtn.textContent = "Edit"
    editBtn.addEventListener("click",function () {
        what = "edit"
        openModal(false,idApi)
    })

    removeBtn.classList.add("btn")
    removeBtn.classList.add("remove")
    removeBtn.textContent = "Remove"
    removeBtn.addEventListener("click",function () {
        what = "delete"
        openModal(true,idApi)
    })
    

    infoText.append(infoHeader,infoBody)
    info.append(infoImg,infoText)
    action.append(editBtn,removeBtn)
    box.append(info,action)
    table.appendChild(box)
}
async function openModal(size,id) {
    const modal = document.querySelector(".modal")
    const modalContent = document.querySelector(".modal-content")
    const HeaderH2 = document.querySelector(".modal-header h3")
    const Card = document.querySelector(".modal-card")
    const btnXClose = document.querySelector(".modal-header span")
    const btnLeft= document.querySelector(".modal-btn-left")
    const btnRight = document.querySelector(".modal-btn-right")
    const BodyP = document.querySelector(".sure")
    const form = document.querySelector(".modal-form")
    const modalIcon = document.getElementById("modalicon")
    const modalHead = document.getElementById("modalhead")
    const modalText = document.getElementById("modaltext")
    const cardImg = document.querySelector(".modal-card img")
    const cardH3 = document.querySelector(".modal-card h3")
    const cardP = document.querySelector(".modal-card p")
    console.log(what);
    if (size) {
        BodyP.textContent = "This will delete post permanently.You cannot undo this action."
        BodyP.style.display = "block"
        HeaderH2.textContent = "Are you sure you want to delete this post?"
        btnRight.textContent = "Delete"
        modalContent.style.width = "600px"
    }
    else{
        data = await myFetch("GET",id)

        data.img ? cardImg.setAttribute("src",data.img) : cardImg.setAttribute("src","https://st4.depositphotos.com/36709788/41805/v/450/depositphotos_418053238-stock-illustration-rocky-mountains-vector-illustration-hand.jpg")

        data.header ? cardH3.textContent = data.header : cardH3.textContent = "Lorem, ipsum."
        data.text ? cardP.textContent =data.text : cardP.textContent ="Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, porro!"   

        Card.style.display = "block"
        form.style.display = "flex"
        HeaderH2.textContent = "Add"
        btnRight.textContent = "Save"
        modalContent.style.width = "1200px"
    }

    modal.style.display = "block"

    
    modalIcon.addEventListener("input",function(){
        cardImg.setAttribute("src",modalIcon.value)
    })
    modalHead.addEventListener("input",function(){
        cardH3.textContent = modalHead.value
    })
    modalText.addEventListener("input",function(){
        cardP.textContent = modalText.value
    })


    btnLeft.onclick =  function () {
        modal.style.display = "none"
        form.style.display = "none"
        BodyP.style.display = "none"
        Card.style.display = "none"
    }
    btnRight.onclick = function () {
        modal.style.display = "none"
        form.style.display = "none"
        BodyP.style.display = "none"
        Card.style.display = "none"
    
        let icon = modalIcon.value
        let head = modalHead.value
        let text = modalText.value
        console.log(icon,head.text);
        if (!modalIcon.value) {
            if (data.img) icon = data.img
            else{
                icon = "https://st4.depositphotos.com/36709788/41805/v/450/depositphotos_418053238-stock-illustration-rocky-mountains-vector-illustration-hand.jpg"
            }
        }
        if (!modalHead.value) {
            if (data.head) head = data.head
            else head = "Lorem, ipsum."
        }
        if (!modalText.value) {
            if (data.text) text = data.text
            else text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, porro!"
        }

        if (what === "add") {
            myFetch("POST","",icon,head,text)
            console.log("g");
        }
        else if(what === "edit"){
            myFetch("PUT",id,icon,head,text)
            console.log("edit");
        }
        else if(what === "delete"){
            myFetch("DELETE",id)
            console.log("delete");
        }
    }
    btnXClose.onclick =  function () {
        modal.style.display = "none"
        form.style.display = "none"
        BodyP.style.display = "none"
        Card.style.display = "none"
    }
}
async function updateUi(){
    const box = document.querySelectorAll(".box")
    box.forEach(x=>x.remove())
    const search = document.querySelector(".search")
    data = await myFetch()
    try {
        const res = data.filter(x=>x.header.includes(search.value))
        res.forEach(el => createCard(el.id,el.img,el.header,el.text));
    } catch (error) {
        console.log("updateUiFunction:",error.message);
    }
}
updateUi()

const addbtn = document.querySelector(".add")
addbtn.addEventListener("click",function () {
    what = "add"
    openModal(false)
})

const search = document.querySelector(".search")
search.addEventListener("input", function () {updateUi()})