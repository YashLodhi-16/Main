// creating an navBar class for our web component
class navBar extends HTMLElement {
  // calling constructor
  constructor() {
    // first thing to do is calling parent class constructor using super
    super();

    // this keyword mean it will reference this object
    // creating an this.shadow variable (scope only in this class(navBar)) for accesing shadow dom, attach shadow with mode to open
    this.shadow = this.attachShadow({ mode: "open" });

    // calling createWebComponent function
    this.createWebComponent();
  }

  // to collect all important data and push it into shadow dom.
  async createWebComponent() {
    // defines url of the file
    const url = "/Component_html/navbar.html";

    // a get request using fetch api
    await fetch(url)
      // if first promise resolve then it returns a promise that resolves with a String
      .then((request) => request.text())

      // if second promise resolve then will execute this
      .then((data) => {
        // creating an template element
        this.template = document.createElement("template");

        // set template inner html equals to data
        this.template.innerHTML = data;

        // creating an content variable for collecting template variable content
        const content = this.template.content;

        // appending content with cloneNode function with deep argument to true. cloneNode(true) clones all attributes and their values. Set the deep parameter to true if you also want to clone descendants (children).
        this.shadow.appendChild(content.cloneNode(true));

        // calling toggle function
        this.toggle();
      });
  }

  // not using connectedCallback() function because it fire immedately when a element connected to dom but createWebComponent() function takes more time
  // if i add event listener in connectedCallback() it throws an error of hamburger is null
  // this function is for adding event listener
  toggle() {
    // grabing hamburger from shadow dom
    const hamburger = this.shadowRoot.getElementById("hamburger");

    //  add click event on it.
    hamburger.addEventListener("click", () => {
      // grabing navbar from shadow dom
      const navbar = this.shadow.getElementById("navbar");

      // if navbar has toggle-height class then toggle function will remove it. else add it
      navbar.classList.toggle("toggle-height");
    });
  }
}

// defining component name with navBar class
customElements.define("nav-bar", navBar);

// creating our navbar web component
// const navigationBar = document.createElement('nav-bar');
