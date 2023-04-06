const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuLines = document.querySelectorAll('.burger-menu-line');
const categoryContainer = document.querySelector('.main__sidebar-category');
const roadmapContainer = document.querySelector('.main__sidebar-roadmap');
const sideMenu = document.querySelector('.side-menu');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    categoryContainer.classList.toggle('active');
    roadmapContainer.classList.toggle('active');
    sideMenu.classList.toggle('show');
});
