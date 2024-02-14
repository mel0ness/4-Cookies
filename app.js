let cookie = "";
let cookieStore = [];
let idCookie = 0;
let toFind = null;
let cookieToCreate = [];
let cookieToValidate = true;
const getCookie = () => {
if(document.cookie === "") {
idCookie = 1;
}
else {
  cookie = document.cookie.split(";");
  readCookies();
    idCookie = cookieStore.length + 1;
}
}

const readCookies = () => {
for(let i = 0; i < cookie.length; i++) {
  let ghostCookie = cookie[i].slice(0, cookie[i].length-25);
  ghostCookie = ghostCookie.split("/");
cookieStore.push(JSON.parse(ghostCookie[1]))

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
const DatasError = document.getElementById("datasError");
const Modale = document.getElementById("modale");


form.addEventListener("submit", (e) => {
e.preventDefault();

})

Create.addEventListener("click", () => {
    if(value.value=== "" || Name.value === "") {
        error.textContent = "Veuillez remplir les deux informations!"
        }
        else {
            objectCookie = {id: idCookie, name: Name.value, Value: value.value};
            cookieToCreate[0] = Name.value;
            cookieToCreate[1] = value.value;
        error.textContent = "";
      idCookie++;
      createCookie();
      
        objectCookie={};
       
       
       
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
        toFind = e.srcElement.attributes.value.value;
modale();
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
    for(let i = 0; i < cookieStore.length; i++) {
      if(cookieToCreate[0] === cookieStore[i].name) {
        cookieToValidate = false;
        NewCookie();
        return;
      }
      else {
        cookieToValidate = true;
      }
    }
    NewCookie();
}
const NewCookie = () => {
  if(cookieToValidate){
  const newCookie = JSON.stringify(objectCookie);
    let date = new Date();
    date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
    let expires = "";
    expires = "" + date.toISOString();

      document.cookie = cookieToCreate[0] +' = ' + cookieToCreate[1] + "/" +  newCookie + " " + expires + " " + "; path=/";
      cookieToCreate=[];
      cookieStore = [...cookieStore, objectCookie];
      Toast("green", "ajouté", "Votre cookie a bien été ")
      value.value = "";
      Name.value = "";}

      else {
        Toast("red", "Veuillez modifier le nom", "Votre cookie existe déjà : ")
      }
}

  const deleteCookie = (e) => {
document.cookie = e.name + ' = ;' + "expires=Thu, 01-Jan-70 00:00:01 GMT"
  }
  
const modale = () => {
Modale.classList.add("P4-modaleVisible")
Modale.classList.remove("P4-modaleInvisible")
setTimeout(() => {
  Modale.innerHTML = `    <div class="P4-modaleTitle">Voulez-vous supprimer ce cookie?</div>
  <div class="P4-modaleButton" id="Yes">Oui</div>
  <div class="P4-modaleButton" id="No">Non</div>`

  const Yes = document.getElementById("Yes")
const No = document.getElementById("No")

Yes.addEventListener("click", () => {
  Modale.innerHTML = "";
  Modale.classList.remove("P4-modaleVisible")
  Modale.classList.add("P4-modaleInvisible")
  deleteCookie(cookieStore[toFind -1]);
         cookieStore.splice(toFind - 1, 1)
       newIDs(cookieStore);
       DisplayPlace.innerHTML = "";
       CreateDatas(cookieStore);
       toFind = null;
       const close = document.getElementsByClassName("P4-close");
CreateEventListener(close);
Toast("red", "supprimé", "Votre cookie a bien été ")
})
No.addEventListener("click", () => {
  Modale.innerHTML = "";
  Modale.classList.remove("P4-modaleVisible")
  Modale.classList.add("P4-modaleInvisible")
  toFind = null;
})
}, 500)
}

const Toast = (color, message, intro) => {
  const toast = document.createElement("div");
  toast.classList.add("P4-modale");
  toast.innerHTML = `
 <div>${intro}<span class="P4-${color}">${message}</span></div>
`;
window.document.body.appendChild(toast)

setTimeout(() => {
toast.remove()
}, 3000)
}