const slug = "bobs-garage";
const base_url = `https://wagon-garage-api.herokuapp.com/`;

const carsList = document.querySelector(".cars-list");
const carSubmitButton = document.querySelector("#car-submit");

const carTag = (carData) => `
  <div class="car">
    <div class="car-image">
      <img src="http://loremflickr.com/280/280/${carData.brand} ${carData.model}" />
    </div>
    <div class="car-info">
      <h4>${carData.brand} ${carData.model}</h4>
      <p><strong>Owner:</strong> ${carData.owner}</p>
      <p><strong>Plate:</strong> ${carData.plate}</p>
      <a href="${base_url}/cars/${carData.id}" class="car-destroy">Delete</a>
    </div>
  </div>
`;

const insertCarTag = car => carsList.insertAdjacentHTML("beforeEnd", carTag(car));

const handleDestroy = (event) => {
  event.preventDefault();
  fetch(event.currentTarget.href, { method: "DELETE" })
    .then(fetchAndDisplayCars)
}

const assignDestroyButtonsBehavior = () => {
  const carDestroyButtons = document.querySelectorAll(".car-destroy");
  carDestroyButtons.forEach((button) => {
    button.addEventListener("click", handleDestroy)
  })  ;
};

const postCar = (new_car) => {
  fetch(`${base_url}${slug}/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(new_car)
  })
    .then(response => response.json())
    .then((data) => {
      carSubmitButton.removeAttribute("disabled");
      carSubmitButton.value = "Add a Car";
      fetchAndDisplayCars();
    })
};

const fetchAndDisplayCars = () => {
  fetch(`${base_url}${slug}/cars`)
    .then(response => response.json())
    .then((cars) => {
      carsList.innerHTML = "";
      cars.forEach(insertCarTag);
      assignDestroyButtonsBehavior();
    });
};

const buildCarFromForm = () => {
  const brand = document.querySelector("#brand").value;
  const model = document.querySelector("#model").value;
  const plate = document.querySelector("#plate").value;
  const owner = document.querySelector("#owner").value;

  // return { brand: brand, model: model, owner: owner, plate: plate }; // Is the same as bellow
  return { brand, model, owner, plate };
};

const handleCarsForm = (event) => {
  event.preventDefault();

  carSubmitButton.setAttribute("disabled", "");
  carSubmitButton.value = "Sending..."

  const car = buildCarFromForm();

  event.currentTarget.reset();
  postCar(car);
}

export { fetchAndDisplayCars, handleCarsForm };
