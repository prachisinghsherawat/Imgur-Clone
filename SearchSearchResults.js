//Fix Navbar
const navBar = document.getElementById("navContainer");
const navHeight = navBar.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fixNav");
  } else {
    navBar.classList.remove("fixNav");
  }
});

var pageNumber = 1;

const loadImages = async () => {
  let name = JSON.parse(localStorage.getItem("searchData"));

  // console.log(name);

  let res = await fetch(
    `https://api.unsplash.com/search/photos/?client_id=6OgB3TWOZEcZbsknpfN7IaRVv6KWuQpYU_Di1bLJr1w&query=${name}`
  );

  let data = await res.json();
   console.log(data);
  showImage(data.results);
};
// let data = JSON.parse(localStorage.getItem("ImageData"));

// showImage(data[0]);

loadImages();

function showImage(images) {
  const container = document.getElementById("imagesBox");

  images.forEach((image) => {
    let Div = document.createElement("div");
    Div.style.marginBottom = "6%";
    Div.style.borderRadius = "5px";

    let Img = document.createElement("img");
    Img.src = image.urls.small;

    let infoDiv = document.createElement("div");
    infoDiv.style.backgroundColor = "#474a51";
    infoDiv.style.width = "100%";
    infoDiv.style.height = "60px";
    infoDiv.style.borderRadius = "0 0 5px 5px";
    infoDiv.style.margin = "-1.8% 0 0 0";

    let headingDiv = document.createElement("div");
    headingDiv.innerText = image.user.name;
    headingDiv.style.fontSize = ".9vw";
    headingDiv.style.color = "white";
    headingDiv.style.padding = "4% 0 0 4%";
    headingDiv.style.fontWeight = "600";

    let votesDiv = document.createElement("div");
    votesDiv.style.width = "90%";
    // votesDiv.style.border = "1px solid white"
    votesDiv.style.margin = "1% auto auto auto";
    votesDiv.style.display = "flex";
    votesDiv.style.justifyContent = "space-Between";

    let upVotesDiv = document.createElement("div");
    upVotesDiv.innerHTML = `<span class="material-icons-round">
                        thumb_up
                    </span>
                    <div> ${Math.round(Math.random() * 1000)} </div> `;

    let commentsDiv = document.createElement("div");
    commentsDiv.innerHTML = `<span class="material-icons-round">
                        <span class="material-icons-round">
                        chat_bubble
                        </span>
                    </span>
                    <div> ${Math.round(Math.random() * 100)} </div> `;

    let seenDiv = document.createElement("div");
    seenDiv.innerHTML = `<span class="material-icons-round">
                        <span class="material-icons-round">
                            visibility
                        </span>
                    </span>
                    <div> ${Math.round(Math.random() * 100)} </div> `;

    votesDiv.append(upVotesDiv, commentsDiv, seenDiv);

    infoDiv.append(headingDiv, votesDiv);

    Div.append(Img, infoDiv);

    container.insertAdjacentElement("beforeend", Div);
  });
}

function showData() {
  setTimeout(() => {
    pageNumber++;
    loadImages();
  }, 50);
}

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  // console.log(document.documentElement);
  // console.log(scrollHeight, scrollTop, clientHeight);

  if (scrollTop + clientHeight >= scrollHeight) {
    showData();
  }
});

//////////Search engine/////////////////

let resultBox = document.querySelector(".searchResultDiv");
var timerId;

let imagesDiv = document.getElementById("imagesBox")
const results = async () => {
  resultBox.innerHTML = null;
  let inputVal = document.getElementById("inpBox").value;

  // console.log(inputVal);

  if (inputVal !== " ") {
    resultBox.style.display = "block";
  }

  if (inputVal == "") {
    resultBox.style.display = "none";
  }

  let res = await fetch(
    `https://api.unsplash.com/search/photos/?client_id=6OgB3TWOZEcZbsknpfN7IaRVv6KWuQpYU_Di1bLJr1w&query=${inputVal}`
  );

  let data = await res.json();

   //console.log(data.results);

  

  appendSearchRes(data.results);
};

function appendSearchRes(data) {
  if (data) {
    data.forEach((el) => {
      
 
  // console.log(el.alt-description)
      let div = document.createElement("div");
      //  let img = document.createElement("img");
      //  img.src = el.urls.thumb;
      //  let p = document.createElement("p");
          div.textContent=el.alt_description;
      // div.textContent = el.title;
      // div.style.fontSize = "1vw";
      // div.style.color = "white";
      // div.style.margin = "2%";
      // div.style.textAlign = "center";
      // div.style.fontWeight = "600";
      // div.append(p);
      div.addEventListener("click", () => {
        serachPage(data);
      });
      resultBox.append(div);
    });
  }

  
}

function serachPage(data) {
   data.map((el)=>{
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = el.urls.thumb;
    let p = document.createElement("p");
      p.textContent=el.alt_description;
      div.append(img,p);
      imagesDiv.append(div)
   })
}

function setDebouncing(func, delay) {
  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setTimeout(() => {
    func();
  }, delay);
}
