const tableServices = document.querySelector("tbody");

getServices().then((services) => {
  getServicesCategories().then((categories) => {
    for (category of categories) {
      const newRowHeader = document.createElement("tr");
      newRowHeader.innerHTML = ` 
        <th><h4>${category.service_category}</h4></th>
        <th><h4>Цена (бел. руб.)</h4></th>
    `;
      newRowHeader.classList.add("services-table__title");
      newRowHeader.id = `header-${category.id_service_category}`;
      tableServices.appendChild(newRowHeader);
      loadServices(category.id_service_category);
    }
  });

  function loadServices(id) {
    const filtederServices = services.filter(
      (service) => service.service_category_id === id
    );

    for (service of filtederServices) {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
            <td>${service.service}</td>
            <td>${service.price}</td>
        `;
      tableServices.appendChild(newRow);
    }
  }
});
