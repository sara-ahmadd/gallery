let natureDiv = document.querySelector("#nature");
let cityDiv = document.querySelector("#city");

let cityArr = ["city-1", "city-2", "city-3", "city-4", "city-5"];

let natureArr = ["nature-1", "nature-2", "nature-3"];

let gallery = document.createElement("div");
document.querySelector(".gallery").appendChild(gallery);
gallery.className = "gallery-child";

cityArr.forEach((img) => {
  createDiv("div", img, cityDiv);
});
natureArr.forEach((img) => {
  createDiv("div", img, natureDiv);
});

//create and display images in the page.
function createDiv(ele, img, parent) {
  let div = document.createElement(ele);
  div.className = "img";
  let imgTag = document.createElement("img");
  imgTag.setAttribute("src", `./images/${img}.jpeg`);
  imgTag.id = `${img}`;
  div.appendChild(imgTag);
  parent.appendChild(div);
}

let buttonsDiv = document.createElement("div");
buttonsDiv.className = "buttons";
document.querySelector(".gallery").appendChild(buttonsDiv);

createBtns("prev", `&#8810;`);
createBtns("next", `&#8811;`);
//function create buttons.
function createBtns(id, html) {
  let btn = document.createElement("button");
  btn.id = id;
  btn.innerHTML = html;
  buttonsDiv.appendChild(btn);
}
let images = Array.from(document.querySelectorAll("img"));
let galleryDiv = document.querySelector(".gallery-child");
//set the active image by default.
images[1].classList.add("active");

//create list contains all the available images.
let imageBullets = document.createElement("ul");
document.querySelector(".gallery").appendChild(imageBullets);

let totalImagesArr = cityArr.concat(natureArr);

totalImagesArr.forEach((img) => {
  let listImage = document.createElement("li");
  listImage.id = `${img}`;
  imageBullets.appendChild(listImage);
  let imgTag = document.createElement("img");
  imgTag.setAttribute("src", `./images/${img}.jpeg`);
  listImage.appendChild(imgTag);
});

let imgList = Array.from(document.querySelectorAll("ul li"));

//toggle active and not-active classes from list images by click on them.
imgList.forEach((li) => {
  li.addEventListener("click", () => {
    imgList.forEach((li) => {
      //each (li) contains one image tag, which classes are added and removed from its classlist.
      li.children[0].classList.remove("active");
      li.children[0].classList.add("not-active");
    });
    li.children[0].classList.add("active");
    li.children[0].classList.remove("not-active");
    galleryDiv.innerHTML = "";
    let activeImg = document
      .querySelector("ul li > img.active")
      .cloneNode(true);

    imgName(li.id);

    galleryDiv.appendChild(activeImg);
  });
});
//function create heading tag iw which the image name is added.
function imgName(name) {
  let imgName = document.createElement("h1");
  imgName.textContent = `${name}`;
  gallery.appendChild(imgName);
}

let nextBtn = document.querySelector("#next");
let prevBtn = document.querySelector("#prev");
let i = 0;
//add click event to the next button to get the next slide.
nextBtn.addEventListener("click", () => {
  i++;
  if (i === images.length) {
    i = 0;
  }
  galleryDiv.innerHTML = "";
  imgList.map((li) => {
    if (li.id === images[i].id) {
      li.children[0].classList.remove("not-active");
      imgName(li.id);
    } else {
      li.children[0].classList.add("not-active");
    }
  });
  //get a copy from th active image to be displayed in the slider.
  let eachImg = images[i].cloneNode();
  galleryDiv.appendChild(eachImg);
});

//add click event to the previus button to get the previus slide.
prevBtn.addEventListener("click", () => {
  i--;
  if (i <= -1) {
    i = images.length - 1;
  }
  galleryDiv.innerHTML = "";
  imgList.forEach((li) => {
    if (li.id === images[i].id) {
      li.children[0].classList.remove("not-active");
      // li.children[0].classList.add("active");
      imgName(li.id);
    } else {
      li.children[0].classList.add("not-active");
    }
  });
  let eachImg = images[i].cloneNode(true);
  galleryDiv.appendChild(eachImg);
});
//the clicked image has the active class added, and is displayed in the slider.
images.forEach((img) => {
  img.addEventListener("click", (e) => {
    images.forEach((i) => {
      i.classList.remove("active");
    });
    img.classList.add("active");
    //scroll to the top of the page
    window.scrollTo({ top: 0 });
    document.body.style.overflow = "hidden";

    // document.querySelector(".gallery").style.display = "flex";
    document.querySelector(
      ".gallery"
    ).style.cssText = ` opacity:1; pointer-events:all`;
    galleryDiv.innerHTML = "";

    let activeImg = document.querySelector("img.active").cloneNode();
    galleryDiv.appendChild(activeImg);

    imgList.forEach((li) => {
      if (li.id === activeImg.id) {
        imgName(li.id);
        li.children[0].classList.remove("not-active");
      } else {
        li.children[0].classList.add("not-active");
      }
    });
  });
});

let closeBtn = document.querySelector("#close-btn");
closeBtn.addEventListener("click", () => {
  closeBtn.parentElement.style.cssText = ` opacity:0; pointer-events:none `;
  document.body.style.overflow = "visible";
});

//by default the active slide is displayed in the slider.
let activeImg = document.querySelector(".active").cloneNode();
galleryDiv.appendChild(activeImg);
