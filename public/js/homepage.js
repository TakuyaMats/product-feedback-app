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