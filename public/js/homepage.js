filterSelection = (category) => {
    window.location.replace(`/${category}`)
}

// sortSelection = (column, sortDirection) => {
//     console.log(column, sortDirection);
//     // history.pushState(null, null, `/sortBy/${column}/${sortDirection}`);
//     window.location.replace(`/sortBy/${column}/${sortDirection}`);
// }

sortSelection = () => {
    const selectedOption = feedbackFilter.options[feedbackFilter.selectedIndex];
    const sortString = selectedOption.value;
    const [column, sortDirection] = parseSortString(sortString);
    console.log(column, sortDirection);
    // history.pushState(null, null, `/sortBy/${column}/${sortDirection}`);
    window.location.replace(`/sortBy/${column}/${sortDirection}`);
};

var feedbackFilter = document.getElementById('feedback-filter');

parseSortString = (sortString) => {
    let sortDirection;
    let [ direction, column ] = sortString.split(' ');

    sortDirection = direction === 'most' ? 'DESC' : 'ASC';
    return [ column, sortDirection ];
}

feedbackFilter.addEventListener("click", function(event) {
    console.log(window.location);
    const [ column, sortDirection ] = parseSortString(this.value);
    const [ ,,lastSortedColumn ,lastSortedDirection  ] = window.location.pathname.split('/');
    // console.log(lastSortedColumn);
    // console.log(lastSortedDirection);
    // console.log(column === lastSortedColumn);
    // console.log(sortDirection === lastSortedDirection);
    if (column !== lastSortedColumn || sortDirection !== lastSortedDirection) {
        sortSelection(column, sortDirection)
    }
});

feedbackFilter.addEventListener("change", function(event) {
    console.log(window.location);
    const [ column, sortDirection ] = parseSortString(this.value);
    const [ ,,lastSortedColumn ,lastSortedDirection  ] = window.location.pathname.split('/');
    // console.log(lastSortedColumn);
    // console.log(lastSortedDirection);
    // console.log(column === lastSortedColumn);
    // console.log(sortDirection === lastSortedDirection);
    if (column !== lastSortedColumn || sortDirection !== lastSortedDirection) {
        sortSelection(column, sortDirection)
    }
});

// const feedbackFilter = document.getElementById('feedback-filter');

// const parseSortString = (sortString) => {
//   const [direction, column] = sortString.split(' ');
//   const sortDirection = direction === 'most' ? 'DESC' : 'ASC';
//   return [column, sortDirection];
// };

// const updateUrl = (column, sortDirection) => {
//   const url = `/sortBy/${column}/${sortDirection}`;
//   history.pushState(null, null, url);
// };

// const updateContent = () => {
//   // Get the selected option
//   const selectedOption = feedbackFilter.options[feedbackFilter.selectedIndex];

//   // Get the URL to fetch the updated content from
//   const url = `/sortBy/${selectedOption.dataset.column}/${selectedOption.dataset.sortDirection}`;

//   // Fetch the updated content from the server
//   fetch(url)
//     .then(response => response.text())
//     .then(content => {
//       // Replace the existing content with the new content
//       document.querySelector('.feedback-list').innerHTML = content;
//     })
//     .catch(error => {
//       console.error('Error fetching content:', error);
//     });
// };

// // Event listener for the feedback filter form
// feedbackFilter.addEventListener('change', function(event) {
//   const [column, sortDirection] = parseSortString(this.value);
//   const [,, lastSortedColumn, lastSortedDirection] = window.location.pathname.split('/');
//   if (column !== lastSortedColumn || sortDirection !== lastSortedDirection) {
//     updateUrl(column, sortDirection);
//     updateContent();
//   }
// });
