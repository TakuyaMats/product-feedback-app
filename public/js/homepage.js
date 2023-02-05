filterSelection = (category) => {
    window.location.replace(`/${category}`)
}

sortSelection = (column, sortDirection) => {
    console.log(column, sortDirection);
    window.location.replace(`/sortBy/${column}/${sortDirection}`);
}

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
    console.log(lastSortedColumn);
    console.log(lastSortedDirection);
    console.log(column === lastSortedColumn);
    console.log(sortDirection === lastSortedDirection);
    if (column !== lastSortedColumn || sortDirection !== lastSortedDirection) {
        sortSelection(column, sortDirection)
    }

});

feedbackFilter.addEventListener("change", function(event) {
    console.log(window.location);
    const [ column, sortDirection ] = parseSortString(this.value);
    const [ ,,lastSortedColumn ,lastSortedDirection  ] = window.location.pathname.split('/');
    console.log(lastSortedColumn);
    console.log(lastSortedDirection);
    console.log(column === lastSortedColumn);
    console.log(sortDirection === lastSortedDirection);
    if (column !== lastSortedColumn || sortDirection !== lastSortedDirection) {
        sortSelection(column, sortDirection)
    }
});

// for (let i = 0; i < feedbackFilter.length; i++) {
//     const option = feedbackFilter[i];
//     console.log(option);
//     option.addEventListener("click", function(event) {
        
//         const column = option.dataset.column;
//         const sortDirection = option.dataset.sortDirection;
//         sortSelection(column, sortDirection);
//     });

//     option.addEventListener("change", function() {
//         const column = option.dataset.column;
//         const sortDirection = option.dataset.sortDirection;
//         sortSelection(column, sortDirection);
//     });
// };

// [...feedbackSortOptions].forEach(option => {
//     option.addEventListener("click", function(event) {
        
//         const column = option.dataset.column;
//         const sortDirection = option.dataset.sortDirection;
//         console.log(column, sortDirection);
//         sortSelection(column, sortDirection);
//     });

//     option.addEventListener("change", function() {
//         const column = option.dataset.column;
//         const sortDirection = option.dataset.sortDirection;
//         console.log(column, sortDirection);
//         sortSelection(column, sortDirection);
//     });
    
// });