const add = document.getElementById("add-ele"); // triggers prompt to add a new entry
const root = document.getElementById("root"); // wrapper for everything

const addPrompt = document.getElementById("addPrompt"); // background for popup
const done_add = document.getElementById("done-add"); //done button in the popup for adding

const list = document.getElementById("list"); // list of videos

const allInput = document.querySelectorAll("input"); // array of all the input tags

// makes a new component
//params : type, attribute(Object), text values
const createComponent = (type, attribute, textValue) => {
  let comp = document.createElement(type);
  let textNode;
  for (key in attribute) {
    comp.setAttribute(key, attribute[key]);
  }

  if (textValue != undefined) {
    comp.textContent = textValue;
  }

  return comp;
};

// adds children to parent component
const addChildren = (parent, ...children) => {
  for (let i = 0; i < children.length; i++) {
    parent.appendChild(children[i]);
  }
};

const addFormValidate = (link, title, currVid, totalVid) => {
  return link.length > 0 && title.length > 0 && +currVid <= +totalVid;
};

// creates one element to be added to "list"
const createListElement = (link, title, currVid, totalVid) => {
  let title_anchor = createComponent("a", { href: link }, title);

  //sets the title part
  let currSpan = createComponent("span", {}, currVid);

  // sets the counting part
  let p = createComponent("p");
  let text_node = document.createTextNode(` out of ${totalVid}`);
  addChildren(p, currSpan, text_node);

  let plus = createComponent("button", {}, "+");
  plus.addEventListener("click", () => {
    if (+currVid < +totalVid) {
      currVid = +currVid + 1;
      currSpan.textContent = currVid;
    }
  });

  let minus = createComponent("button", {}, "-");
  minus.addEventListener("click", () => {
    if (+currVid > 1) {
      currVid = +currVid - 1;
      currSpan.textContent = currVid;
    }
  });

  let li = createComponent("li");
  let remove = createComponent("button", { id: "remove" }, "X");
  remove.addEventListener("click", function() {
    this.parentNode.parentNode.removeChild(this.parentNode);
  });

  addChildren(li, remove, title_anchor, p, plus, minus);

  return li;
};

add.addEventListener("click", function() {
  addPrompt.style.display = "block";
});

done_add.addEventListener("click", function() {
  const link = allInput[0].value;
  const title = allInput[1].value;
  const currVid = allInput[2].value;
  const totalVid = allInput[3].value;
  if (addFormValidate(link, title, currVid, totalVid)) {
    addPrompt.style.display = "none";
    let li = createListElement(link, title, currVid, totalVid);
    list.appendChild(li);
  } else {
    // display error
  }
});

/*
IDEA
autofill the name based on the url
-identify the first string that contains -
- using that format the string so that you get the name
- if its Youtube use their api
*/
