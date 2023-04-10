const plannedTab = document.querySelector('.roadmap-planned-tab');
const inProgressTab = document.querySelector('.roadmap-in-progress-tab');
const liveTab = document.querySelector('.roadmap-live-tab');

const plannedColumn = document.querySelector('.roadmap-planned');
const inProgressColumn = document.querySelector('.roadmap-in-progress');
const liveColumn = document.querySelector('.roadmap-live');

const roadmapNav = document.querySelector(".roadmap-nav");
const hr = document.querySelector(".hr");

function updateActiveTab() {
    if (window.innerWidth > 480) {
        plannedColumn.classList.add('active');
        inProgressColumn.classList.add('active');
        liveColumn.classList.add('active');

        plannedTab.classList.add('active');
        inProgressTab.classList.add('active');
        liveTab.classList.add('active');

        inProgressColumn.style.display = 'block';
        liveColumn.style.display = 'block';
        plannedColumn.style.display = 'block';
        roadmapNav.style.display = 'none';
        hr.style.display = 'none';
    } else {
        plannedColumn.classList.add('active');
        inProgressColumn.classList.remove('active');
        liveColumn.classList.remove('active');

        plannedTab.classList.add('active');
        inProgressTab.classList.remove('active');
        liveTab.classList.remove('active');

        inProgressColumn.style.display = 'none';
        liveColumn.style.display = 'none';
        plannedColumn.style.display = 'block';
        roadmapNav.style.display = 'flex';
        hr.style.display = 'block';
    }
}

  // call function initially and on window resize
updateActiveTab();
window.addEventListener('resize', updateActiveTab);

plannedTab.addEventListener('click', () => {
    inProgressColumn.classList.remove('active');
    liveColumn.classList.remove('active');
    plannedColumn.classList.add('active');

    plannedTab.classList.add('active');
    inProgressTab.classList.remove('active');
    liveTab.classList.remove('active');

    inProgressColumn.style.display = 'none';
    liveColumn.style.display = 'none';
    plannedColumn.style.display = 'block';
});

inProgressTab.addEventListener('click', () => {
    plannedColumn.classList.remove('active');
    liveColumn.classList.remove('active');
    inProgressColumn.classList.add('active');

    plannedTab.classList.remove('active');
    inProgressTab.classList.add('active');
    liveTab.classList.remove('active');

    plannedColumn.style.display = 'none';
    liveColumn.style.display = 'none';
    inProgressColumn.style.display = 'block';
});

liveTab.addEventListener('click', () => {
    plannedColumn.classList.remove('active');
    inProgressColumn.classList.remove('active');
    liveColumn.classList.add('active');

    plannedTab.classList.remove('active');
    inProgressTab.classList.remove('active');
    liveTab.classList.add('active');

    plannedColumn.style.display = 'none';
    inProgressColumn.style.display = 'none';
    liveColumn.style.display = 'block';
});

