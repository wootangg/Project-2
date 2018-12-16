/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//initial total students
var studentsItem = document.getElementsByClassName('student-item');

//get total number of pages
var totalPageNumbers = Math.ceil(studentsItem.length / 10);


//clear student items
function clearStudents() {
    for(var i = 0; i < studentsItem.length; i++ ){
        studentsItem[i].style.display = 'none';
    }
}

function showPage(students, page) {
    clearStudents();

    var firstItemStudent = (page * 10) - 10;
    var lastItemStudent = firstItemStudent + 10;

    //student list of last page adjustments
    if ( page == totalPageNumbers ) {
        lastItemStudent = firstItemStudent + studentsItem.length % 10;
    }

    //display students of page
    for( var i = firstItemStudent; i < lastItemStudent; i++) {
        studentsItem[i].style.display = 'block';
    }
}


function appendPageLinks() {
    //get parent element to add pagination
    var paginationParent = document.getElementsByClassName('page');
    
    //create pagination div and ul element
    var paginationBox = document.createElement('div');
    var paginationUnorderedList = document.createElement('ul');
    
    
    //add ul to the div element
    paginationBox.appendChild(paginationUnorderedList);

    //add class pagination on div
    paginationBox.classList.add('pagination');

    //create dynamic li and a tag elements
    for(var i = 1; i < totalPageNumbers + 1; i++) {
        var paginationList = document.createElement('li');
        var paginationAtags = document.createElement('a');
        var paginationNumbers = document.createTextNode(i);

        //add class active on first pagination
        if(i == 1) {
            paginationAtags.classList.add('active');
        }

        paginationList.appendChild(paginationAtags);
        paginationAtags.setAttribute('href', "#");
        paginationAtags.appendChild(paginationNumbers);

        paginationUnorderedList.appendChild(paginationList);
    }

    //append created pagination element
    paginationParent[0].appendChild(paginationBox);


    //add functionality on pagination
    var getClickedPagination = document.querySelectorAll('a');

    for(var i = 0; i < getClickedPagination.length; i++) {
        
            getClickedPagination[i].addEventListener('click', function(e) {
                e.preventDefault();
                var getPageNumber = e.target.innerText;
                
                //show student list of clicked page
                showPage(studentsItem, getPageNumber);

                //remove previous active class
                for(var i = 0; i < getClickedPagination.length; i++) {
                    getClickedPagination[i].classList.remove('active');
                }
                //add active class name on clicked pagination
                this.classList.add('active');

        })
    }

}


showPage(studentsItem, 1);
appendPageLinks();