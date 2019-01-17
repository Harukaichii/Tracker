const add = document.getElementById("add-ele"); // triggers prompt to add a new entry
const root = document.getElementById("root"); // wrapper for everything

const addPrompt = document.getElementById("addPrompt"); // background for popup
const done_add = document.getElementById("done-add"); //done button in the popup for adding
const close_add = document.getElementById("close-add"); // closes the entire form

const list = document.getElementById("list"); // list of videos

const allInput = document.querySelectorAll("input"); // array of all the input tags

const error = document.querySelector(".error"); // gets error msg

const addFormValidate = (link, title, currVid, totalVid) => {
  return link.length > 0 && title.length > 0 && +currVid <= +totalVid;
};

const isWebsiteDomain = value => {
  const domain = new RegExp(".?(com|org|ca|net)$"); // TODO: maybe find better way of doing this?
  return domain.test(value);
};

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

// fills the Title field based on the input
const fillTitle = () => {
  let url = allInput[0].value === undefined ? "" : allInput[0].value.split("/");

  let words = url.filter(function(value) {
    return value.length > 0 && !isWebsiteDomain(value);
  });

  let name = words[words.length - 1];
  name = name.split("-").join(" ");

  allInput[1].value = name;
};

// function for displaying errors
const displayError = (link, title, currVid, totalVid) => {
  if (link.length <= 0) {
    error.textContent = "Please fill out link field!";
  } else if (title.length <= 0) {
    error.textContent = "Please fill out title field!";
  } else {
    error.textContent =
      "Current video number or total video number is not valid!";
  }

  error.style.visibility = "visible";
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

  let remove = createComponent("button", { id: "remove" }, "X");
  remove.addEventListener("click", function() {
    this.parentNode.parentNode.removeChild(this.parentNode);
  });

  let li = createComponent("li");
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
    error.style.visibility = "hidden";
    allInput[0].value = "";
    allInput[1].value = "";
    allInput[2].value = "";
    allInput[3].value = "";
  } else {
    // display error
    displayError(link, title, currVid, totalVid);
  }
});

close_add.addEventListener("click", function() {
  addPrompt.style.display = "none";
});

/*
IDEA
autofill the name based on the url
-identify the first string that contains -
- using that format the string so that you get the name
- if its Youtube use their api
*/
