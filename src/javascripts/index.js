// Required by Webpack - do not touch
require.context("../", true, /\.(html|json|txt|dat)$/i);
require.context("../images/", true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i);
require.context("../stylesheets/", true, /\.(css|scss)$/i);

// JavaScript
//TODO
import "bootstrap";
import { ifError } from "assert";

// 15. return a multi-line string that has the html of the card
// 17. DELETE: add data-title and interpolate title
function displayCard(c) {
  return `
    <div class="card" data-title="${c.title}">
            <img
              class="card-img-top"
              src="${c.poster}"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">${c.title}</h5>
              <p class="card-text">
                ${c.description}
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
              <button class="btn btn-danger float-right">Delete</button>
            </div>
          </div>`;
}

//12.  Add new card function - how do you want to display the cards
function displayCards() {
  let cards = JSON.parse(localStorage.getItem("cards") || "[]");
  //13.  clear the cards
  document.querySelector("#cards").innerHTML = "";
  //14. iterate through the cards and add them to the storage one by one
  for (let c of cards) {
    let col = document.createElement("div");
    col.setAttribute("class", "col-md-4");
    //16. call the displayCard function
    col.innerHTML = displayCard(c);
    document.querySelector("#cards").appendChild(col);
  }

  // 18. delete buttons
  document.querySelectorAll("button.btn-danger").forEach(function(b) {
    b.onclick = function(event) {
      let cards = JSON.parse(localStorage.getItem("cards") || "[]");
      let ndx = -1;
      for (let i in cards) {
        if (cards[i].title === event.target.closest(".card").dataset.title) {
          ndx = i;
          break;
        }
      }
      if (ndx != -1) {
        cards.splice(ndx, 1);
        localStorage.setItem("cards", JSON.stringify(cards));
        location.reload();
      }
    };
  });
}

// 4. when the form is submitted we want to capture the value of the title, description, and poster
function addNewCard(event) {
  if (event) event.preventDefault();

  let t = document.querySelector("#title").value;
  let d = document.querySelector("#description").value;
  let p = document.querySelector("#poster").value;

  // 6. store cards in local storage (convert from a string to an object use JSON.parse)
  let cards = JSON.parse(localStorage.getItem("cards") || "[]");

  // 5. If there is a value for each of them then create an object i.e new card
  if (t && d && p) {
    let card = { title: t, description: d, poster: p };
    // 7. push/add the card to the list
    cards.push(card);
    //   8. Save the card information to the local storage (convert the object to a string- use JSON.strigify)
    localStorage.setItem("cards", JSON.stringify(cards));
  }
  // 9. reset the form
  this.reset();
  // 10. hide the form and display cards
  document.querySelector("#cards").classList.remove("d-none");
  document.querySelector("#myForm").classList.add("d-none");

  //11.  display cards for the new ones added
  displayCards();
}

// 1. select the form and display and select the cards and make them hidden
document.querySelector("#new_card").onclick = function() {
  document.querySelector("#myForm").classList.remove("d-none");
  // row of cards has an id called cards
  document.querySelector("#cards").classList.add("d-none");
};
// 2. When you hit cancel you hide the form
document.forms[0].querySelector('[type="button"]').onclick = function() {
  document.querySelector("#cards").classList.remove("d-none");
  document.querySelector("#myForm").classList.add("d-none");
};

// 3.  make it so that the form does not submit when hitting the submit button
document.forms[0].addEventListener("submit", addNewCard, false);
//  19.
displayCards();
