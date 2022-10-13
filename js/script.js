const servicesCategoriesTemp = [
  'Консультация стоматолога',
  'Эстетическая стоматология',
  'Терапевтическая стоматология',
  'Детская стоматология'
]

let servicesCategories = JSON.parse(localStorage.getItem("services-categories"));

if (!servicesCategories) {
  servicesCategories = servicesCategoriesTemp;
  localStorage.setItem('services-categories', JSON.stringify(servicesCategories))
}
