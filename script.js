const allEl = document.getElementById("all");
const allObjs = [];
class MyObj {
  constructor(name, parent) {
    this.name = name;
    this.id = this.lastIndex + 1;
    this.parent = parent;
  }
  get childs() {
    return allObjs.filter((obj) => obj.parent === this.id);
  }
  get lastIndex() {
    let maxId = 0;
    allObjs.map((item) => {
      maxId = Math.max(maxId, item.id);
    });
    return maxId;
  }
}
function addNewObj(name, parentId) {
  if (!name || !parent) throw new Error("parent ve ya name yoxdur");
  const newObj = new MyObj(name, parentId);
  allObjs.push(newObj);
  return newObj;
}
function findObjById(id) {
  if (!id) throw new Error("Id yoxdur");
  return allObjs.find((item) => item.id == id);
}

function clearEverything() {
  const parentEl = document.querySelector(`[data-id="0"]`);

  const parentOfParentEl = parentEl.parentElement;
  parentOfParentEl.querySelector("ul").innerHTML = "";
}
function changeState() {
  allObjs.map((obj) => {
    if (obj.id !== 0) {
      const parentId = obj.parent;

      const parentEl = document.querySelector(`[data-id="${parentId}"]`);
      const parentOfParentEl = parentEl.parentElement;

      parentOfParentEl.querySelector("ul").innerHTML =
        parentOfParentEl.querySelector("ul").innerHTML +
        `<li><a data-id="${obj.id}"><input value="${obj.name}" data-id="${obj.id}" onchange='changeName(this)'><button  onclick="createChild(${obj.id})">+</button></a><ul></ul></li>`;
    }
  });
}
changeState();
function createChild(id) {
  clearEverything();
  addNewObj(" ", id);

  changeState();
}
function editObj(id, value) {
  let obj = findObjById(id);
  let index = null;
  allObjs.map((item, ind) => {
    if (id == item.id) {
      index = ind;
    }
  });
  obj.name = value;
  allObjs[index] = { ...obj };
}
function changeName(e) {
  const value = e.value;
  const objId = e.getAttribute("data-id");
  editObj(objId, value);
}
