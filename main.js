const add = document.getElementById("add-ele"); // triggers prompt to add a new entry
const root = document.getElementById("root"); // wrapper for everything

const addPrompt = document.getElementById("addPrompt"); // background for popup
const done_add = document.getElementById("done-add"); //done button in the popup for adding

const list = document.getElementById("list"); // list of videos

const allInput = document.querySelectorAll("input"); // array of all the input tags

// creates one element to be added to "list"
function createListElement() {
  let title_anchor = document.createElement("a"); // sets the link part
  title_anchor.setAttribute("href", allInput[0].value);
  title_anchor.textContent = allInput[1].value;

  //sets the title part
  let currSpan = document.createElement("span");
  currSpan.textContent = allInput[2].value;

  // sets the counting part
  let p = document.createElement("p");
  let text_node = document.createTextNode(` out of ${allInput[3].value}`);
  p.appendChild(currSpan);
  p.appendChild(text_node);

  //increment or decrements the number of current videos watched
  let plus = document.createElement("button");
  plus.textContent = "+";
  plus.addEventListener("click", function() {
    currSpan.textContent = parseInt(currSpan.textContent) + 1;
  });

  let minus = document.createElement("button");
  minus.textContent = "-";
  minus.addEventListener("click", function() {
    currSpan.textContent = parseInt(currSpan.textContent) - 1;
  });

  let li = document.createElement("li");
  li.appendChild(title_anchor);
  li.appendChild(p);
  li.appendChild(plus);
  li.appendChild(minus);

  return li;
}

add.addEventListener("click", function() {
  addPrompt.style.display = "block";

  // takes the li and add it to createListElement
});

done_add.addEventListener("click", function() {
  addPrompt.style.display = "none";
  let li = createListElement();
  list.appendChild(li);
});

/*
IDEA
autofill the name based on the url
-identify the first string that contains -
- using that format the string so that you get the name
- if its Youtube use their api
*/
