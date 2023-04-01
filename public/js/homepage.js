filterSelection = (category) => {
    history.pushState(null, null, `/${category}`);
}

sortSelection = (column, sortDirection) => {
    console.log(column, sortDirection);
    history.pushState(null, null, `/sortBy/${column}/${sortDirection}`);
}

var feedbackFilter = document.getElementById('feedback-filter');

parseSortString = (sortString) => {
    let sortDirection;
    let [direction, column] = sortString.split(' ');
    
    if (direction === 'most') {
        sortDirection = 'DESC';
    } else if (direction === 'least') {
        sortDirection = 'ASC';
    } else {
        sortDirection = 'ASC';
    }
    
    return [column, sortDirection];
}

feedbackFilter.addEventListener("click", function(event) {
    // console.log(window.location);
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
    // console.log(window.location);
    const [ column, sortDirection ] = parseSortString(this.value);
    const [ ,,lastSortedColumn ,lastSortedDirection  ] = window.location.pathname.split('/');
    // console.log(lastSortedColumn);
    // console.log(lastSortedDirection);
    // console.log(column === lastSortedColumn);
    console.log(sortDirection === lastSortedDirection);
    if (column !== lastSortedColumn || sortDirection !== lastSortedDirection) {
        sortSelection(column, sortDirection)
    }
});