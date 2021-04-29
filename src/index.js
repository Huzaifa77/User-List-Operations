const api = `https://randomuser.me/api`;
const addUser = document.getElementById("userAdd-btn");
const sortascbtn = document.getElementById("sortasc");
const sortdscbtn = document.getElementById("sortdsc");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");

const appState = [];

class User {
  constructor(title, firstname, lastname, gender, email, pic) {
    this.title = title;
    this.name = `${firstname} ${lastname}`;
    this.gender = gender;
    this.email = email;

    this.pic = pic;
  }
}

// function User(){} -constructors intead of class
// User.prototype.method-to add the additional methods

addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });

  const userDataJson = await userData.json(); //it is also asynchronous operation and a ASYNC operation
  const user = userDataJson.results[0];
  console.log(user);
  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email,
    user.picture.large
  );

  appState.push(classUser); //state has new classes
  domRender(appState);
});

const domRender = (stateArr) => {
  userList.innerHTML = null;
  stateArr.forEach((userObj) => {
    const userEl = document.createElement("div");
    userEl.className = "card medium";
    userEl.innerHTML = `<div>
    <div class="card-image">
          <img src="${userObj.pic}">
          <span class="card-title">
           ${userObj.title} ${userObj.name}
          </span>
        </div>
        <div class="card-content">
          <p>
          <b>Gender: </b>${userObj.gender}<br/>
          
          </p>
        </div>
        <div class="card-action">
          <a href="#" class="card-link">${userObj.email}</a>
        </div> 
    </div>`;

    userList.appendChild(userEl);
  });
};

searchInput.addEventListener("keyup", (e) => {
  const filterAppState = appState.filter(
    (user) =>
      user.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  domRender(filterAppState);
});

sortascbtn.addEventListener("click", () => {
  const tempappState = [...appState];
  tempappState.sort((a, b) => (a.name < b.name ? -1 : 1));
  domRender(tempappState);
});

sortdscbtn.addEventListener("click", () => {
  const tempappState = [...appState];
  tempappState.sort((a, b) => (a.name < b.name ? 1 : -1));
  domRender(tempappState);
});
