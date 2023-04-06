// Get the burger menu icon element
const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuLines = document.querySelectorAll('.burger-menu-line');

// Get the "main__sidebar-category" and "main__sidebar-roadmap" containers
const categoryContainer = document.querySelector('.main__sidebar-category');
const roadmapContainer = document.querySelector('.main__sidebar-roadmap');
const sideMenu = document.querySelector('.side-menu');


console.log(categoryContainer);
// Add a click event listener to the burger menu icon
burgerMenu.addEventListener('click', () => {
  // Toggle the "active" class on the burger menu icon
    burgerMenu.classList.toggle('active');
    
    // Toggle the visibility of the "main__sidebar-category" and "main__sidebar-roadmap" containers
    categoryContainer.classList.toggle('active');
    roadmapContainer.classList.toggle('active');
    sideMenu.classList.toggle('show');
});
