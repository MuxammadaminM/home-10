const apiUrl = 'https://669a77e99ba098ed61ffc202.mockapi.io/products/cars';

document.addEventListener('DOMContentLoaded', () => {
    fetchCars();

    document.getElementById('add-car-form').addEventListener('submit', addCar);
    document.getElementById('update-car-form').addEventListener('submit', updateCar);
});

function fetchCars() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const carList = document.getElementById('car-list');
            carList.innerHTML = '';
            data.forEach(car => {
                const carItem = document.createElement('div');
                carItem.innerHTML = `
                    <p>
                        <strong>Name:</strong> ${car.name} <br>
                        <strong>Model:</strong> ${car.model} <br>
                        <button onclick="editCar(${car.id}, '${car.name}', '${car.model}')">Edit</button>
                        <button onclick="deleteCar(${car.id})">Delete</button>
                    </p>
                `;
                carList.appendChild(carItem);
            });
        });
}

function addCar(event) {
    event.preventDefault();
    const name = document.getElementById('car-name').value;
    const model = document.getElementById('car-model').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, model })
    }).then(response => response.json())
      .then(data => {
          document.getElementById('add-car-form').reset();
          fetchCars();
      });
}

function editCar(id, name, model) {
    document.getElementById('update-car-id').value = id;
    document.getElementById('update-car-name').value = name;
    document.getElementById('update-car-model').value = model;
    document.getElementById('update-car-form').style.display = 'block';
}

function updateCar(event) {
    event.preventDefault();
    const id = document.getElementById('update-car-id').value;
    const name = document.getElementById('update-car-name').value;
    const model = document.getElementById('update-car-model').value;

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, model })
    }).then(response => response.json())
      .then(data => {
          document.getElementById('update-car-form').style.display = 'none';
          fetchCars();
      });
}

function deleteCar(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    }).then(response => response.json())
      .then(data => {
          fetchCars();
      });
}
