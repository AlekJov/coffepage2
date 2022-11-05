/******* 
class UI {
  hidePreloader() {
    document.querySelector(".preloader").style.display = "none";
  }
  showNav() {
    document.querySelector(".nav").classList.toggle("nav__show");
  }
}

//event listeners
function eventListeners() {
  const ui = new UI();
  //hide preloader
  window.addEventListener("load", () => ui.hidePreloader());

  /////nav btn
  document
    .querySelector(".navBtn")
    .addEventListener("click", () => ui.showNav());
}
eventListeners();

****/ ///
// event Listeners
eventListeners();
function eventListeners() {
  const ui = new UI();
  /////preloader
  window.addEventListener("load", function() {
    ui.hidePreloader();
  });
  //nav btn
  document.querySelector(".navBtn").addEventListener("click", function() {
    ui.showNav();
  });
  //////control the video
  document
    .querySelector(".video__switch")
    .addEventListener("click", function() {
      ui.videoControls();
    });

  ////////submit the form
  document
    .querySelector(".drink-form")
    .addEventListener("submit", function(event) {
      event.preventDefault();
      const name = document.querySelector(".input-name").value;
      const lastName = document.querySelector(".input-lastname").value;
      const email = document.querySelector(".input-email").value;

      let value = ui.checkEmpty(name, lastName, email);

      if (value) {
        let customer = new Customer(name, lastName, email);
        console.log(customer);
        ui.addCustomer(customer);
        ui.showFeedBack("custumer added to the list", "success");
        ui.clearFields();
      } else {
        ui.showFeedBack("some form values empty", "error");
      }
    });
  //////////////display model
  const links = document.querySelectorAll(".work-item__icon");

  links.forEach(function(item) {
    item.addEventListener("click", function(event) {
      ui.showModel(event);
    });
  });

  ///////hide model

  document
    .querySelector(".work-model__close")
    .addEventListener("click", function() {
      ui.closeModel();
    });
}
///////constructor function
function UI() {}
/////hide preloader
UI.prototype.hidePreloader = function() {
  document.querySelector(".preloader").style.display = "none";
};
//////////nav btn
UI.prototype.showNav = function() {
  document.querySelector(".nav").classList.toggle("nav__show");
};
//////control the video

UI.prototype.videoControls = function() {
  let btn = document.querySelector(".video__switch-btn");
  if (!btn.classList.contains("btnSlide")) {
    btn.classList.add("btnSlide");
    document.querySelector(".video__item").pause();
  } else {
    btn.classList.remove("btnSlide");
    document.querySelector(".video__item").play();
  }
};

//////// check for empty values

UI.prototype.checkEmpty = function(name, lastname, email) {
  let result;
  if (name === "" || lastname === "" || email === "") {
    result = false;
  } else {
    result = true;
  }
  return result;
};

////////show feedback
UI.prototype.showFeedBack = function(text, type) {
  if (type === "success") {
    let feedback = document.querySelector(".drink-form__feedback");
    feedback.classList.add("success");
    feedback.innerText = text;
    this.removeAlert("success");
  } else if (type === "error") {
    let feedback = document.querySelector(".drink-form__feedback");
    feedback.classList.add("error");
    feedback.innerText = text;
    this.removeAlert("error");
  }
};
////remove alert
UI.prototype.removeAlert = function(type) {
  setTimeout(function() {
    document.querySelector(".drink-form__feedback").classList.remove(type);
  }, 3000);
};
////add customer
UI.prototype.addCustomer = function(customer) {
  const images = [1, 2, 3];
  let random = Math.floor(Math.random() * images.length);
  const div = document.createElement("div");
  div.classList.add("person");
  div.innerHTML = `<img src="img/person-${random}.jpg"
   alt="" class="person__thumbnail" />
  <h4 class="person__name">${customer.name}</h4>
  <h4 class="person__last-name">${customer.lastname}</h4>`;
  document.querySelector(".drink-card__list").appendChild(div);
};

/// clear field
UI.prototype.clearFields = function() {
  document.querySelector(".input-name").value = "";
  document.querySelector(".input-lastname").value = "";
  document.querySelector(".input-email").value = "";
};
////show model
UI.prototype.showModel = function(event) {
  event.preventDefault();
  if (
    event.target.parentElement.parentElement.classList.contains(
      "work-item__icon"
    )
  ) {
    let id = event.target.parentElement.parentElement.dataset.id;
    const model = document.querySelector(".work-model");
    const modelItem = document.querySelector(".work-model__item");
    model.classList.add("work-model--show");
    modelItem.style.backgroundImage = `url(img/work-${id}.jpg)`;
  }
};
/////hide model
UI.prototype.closeModel = function() {
  document.querySelector(".work-model").classList.remove("work-model--show");
};
//////custumer
function Customer(name, lastname, email) {
  (this.name = name), (this.lastname = lastname), (this.email = email);
}
