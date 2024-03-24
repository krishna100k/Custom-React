const mainContainer = document.querySelector(".mainContainer");

const createElement = (type, props, children) => {
  return {
    type: type,
    props: props,
    children: children,
  };
};

const reactElements = [
  createElement("div", { class: "subContainer" }, [
    createElement("h1", { class: "Header" }, ["Products List"]),
    createElement("p", { class: "para" }, [
      "A product List made by using my own custom React made my me",
    ]),
  ]),
];

// Fetching Data from API
const fetchProducts = async () => {
  try {
    const resp = await fetch("https://dummyjson.com/products", {
      method: "GET",
    });
    const { products } = await resp.json();
    //operation started

    const productsChildren = [];

    products.forEach((product) => {
        productsChildren.push(
            createElement("div", { class: "productContainer" }, [
                createElement(
                  "img",
                  { class: "productImage", src: product.thumbnail },
                  []
                ),
                createElement("h3", { class: "productTitle" }, [product.title]),
                createElement("p", { class: "productDescription" }, [
                  product.description,
                ]),
              ])
        );
      })

    reactElements.push(
      createElement(
        "div",
        { class: "productsContainer" },
        productsChildren
      )
    );

    mainContainer.innerHTML = ""
    reactElements.forEach((element) => {
      reactRender(element, mainContainer);
    });

    //operation ended
  } catch (err) {
    console.log(err);
  }
};

fetchProducts();
//

console.log(reactElements);

const reactRender = (reactElement, container) => {
  const element = document.createElement(reactElement.type);
  for (let prop in reactElement.props) {
    element.setAttribute(prop, reactElement.props[prop]);
  }
  reactElement.children.forEach((child) => {
    if (typeof child === "string") {
      element.innerText = child;
    } else if (typeof child === "object") {
      reactRender(child, element);
    }
  });

  container.appendChild(element);
};

reactElements.forEach((element) => {
  reactRender(element, mainContainer);
});
