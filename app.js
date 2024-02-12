const cookie = document.cookie.slice(0, document.cookie.length-25);
let cookieStore = [];
let idCookie = 0;
const getCookie = () => {
if(cookie.length < 25) {
idCookie = 1;
}
else {
    const finalCookies = JSON.parse(cookie);
    cookieStore = finalCookies;
    idCookie = cookieStore.length + 1;
}
}

getCookie();


let objectCookie = {};

const form = document.getElementById("form");
const value = document.getElementById("value");
const Name = document.getElementById("name");
const error = document.getElementById("error");
const Create = document.getElementById("create");
const Display = document.getElementById("display");
const DisplayPlace = document.getElementById("displayDatas");
const DatasError = document.getElementById("datasError")


form.addEventListener("submit", (e) => {
e.preventDefault();

})

Create.addEventListener("click", () => {
    if(value.value=== "" || Name.value === "") {
        error.textContent = "Veuillez remplir les deux informations!"
        }
        else {
            objectCookie = {id: idCookie, name: Name.value, Value: value.value};
        error.textContent = "";
        value.value = "";
        Name.value = "";
      idCookie++;
        cookieStore = [...cookieStore, objectCookie];
        createCookie(3);
       
        }
})

Display.addEventListener("click", () => {
DisplayPlace.innerHTML = "";
DatasError.innerHTML = "";
if(cookieStore.length < 1) {
    const Data = document.createElement("div");
    Data.innerHTML = `<div>Vous n'avez pas de cookies à afficher!</div>`;
  DatasError.appendChild(Data);
}
else{
CreateDatas(cookieStore);
const close = document.getElementsByClassName("P4-close");
CreateEventListener(close);

}
})

const CreateEventListener = (e) => {
    for(let i=0; i < e.length; i++) {
      e[i].addEventListener("click", (e) => {
        const toFind = e.srcElement.attributes.value.value;
       cookieStore.splice(toFind - 1, 1)
       newIDs(cookieStore);
       DisplayPlace.innerHTML = "";
       CreateDatas(cookieStore);
       createCookie();
       const close = document.getElementsByClassName("P4-close");
CreateEventListener(close);
      })

    }
}

const newIDs = (e) => {
    for (let i = 0; i < e.length; i++) {
        e[i].id = i + 1;
      }
}

const CreateDatas = (e) => {
    for(let i=0; i < e.length; i++) {
        CreateElement(e[i])

    }
}

const CreateElement = (e) => {
    const Data = document.createElement("div");
    Data.classList.add("P4-cookie");
    Data.setAttribute("id", e.id)
    Data.innerHTML = `
    <div class="P4-close" value=${e.id}>X</div>
    <div class="P4-name"><span class="P4-title">Nom : </span>${e.name}</div>
    <div class="P4-value"><span class="P4-title">Valeur : </span>${e.Value}</div>
  `;
  DisplayPlace.appendChild(Data);


}

const createCookie = () => {
    const newCookie = JSON.stringify(cookieStore);
    let date = new Date();
    date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000);
    let expires = "";
    expires = "" + date.toISOString();
      document.cookie = newCookie + " " + expires + " " + "; path=/";
  };
  