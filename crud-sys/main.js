let cName = document.getElementById('courseName');
let cCatg = document.getElementById('courseCategory');
let cPrice = document.getElementById('coursePrice');
let cDesp = document.getElementById('courseDescription');
let data = document.getElementById('data');
let warn_mssg = document.getElementsByClassName('warn-mssg');
let courses = [ ];
// because we used L.S when we close browes and opnen it again 
// courses shouldn't be empty , may l.s have data so
//used JSON.parse to convert from string to array of object
if(localStorage.getItem('data')!=null){
  courses = JSON.parse(localStorage.getItem("data"));
// we must call display() so that  when open browser show the data in L.S
    display(); 
}else{
  courses=[];
}


function createCourse(){
    if(cName.value==''||cCatg.value==''||cPrice.value==''||cDesp.value==''||!validateCourseName())
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
    }
    else{
    let course = {
        name:cName.value,
        category:cCatg.value,
        price:cPrice.value,
        description:cDesp.value,
    }
    courses.push(course);
    localStorage.setItem("data",JSON.stringify(courses));
    console.log(courses);

    display();
    makeEmpty();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }
}

function display(){
    let result=` `;
    for(let i=0;i<courses.length;i++){
        result += `
        <tr>
        <td>${i+1}</td>
        <td>${courses[i].name}</td>
        <td>${courses[i].category}</td>
        <td>${courses[i].price}</td>
        <td>${courses[i].description}</td>
        <td><button onclick="update(${i})"><i class="far fa-edit"></i></button></td>
        <td><button class="delete" onclick="deleteElement(${i})"><i class="far fa-trash-alt"></i></button></td>
        </tr>
        
        `
    };

    data.innerHTML=result;
}


function makeEmpty(){
    cName.value='';
    cCatg.value='';
    cPrice.value='';
    cDesp.value='';
}


function deleteElement(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(id,1);
            localStorage.setItem("data",JSON.stringify(courses));
            display();
            Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        )
        }
    })
}

function update(id){
    courses[id].name=cName.value;
    courses[id].category=cCatg.value;
    courses[id].price=cPrice.value;
    courses[id].description=cDesp.value;
    localStorage.setItem("data",JSON.stringify(courses));
    display();
    makeEmpty();
}

function searchCourse(){
    
    let result=` `;
    for(let i=0;i<courses.length;i++){
        if(courses[i].name.toLowerCase().includes(search.value.toLowerCase()))
        result += `
        <tr>
        <td>${i+1}</td>
        <td>${courses[i].name}</td>
        <td>${courses[i].category}</td>
        <td>${courses[i].price}</td>
        <td>${courses[i].description}</td>
        <td><button onclick="update(${i})"><i class="far fa-edit"></i></button></td>
        <td><button class="delete" onclick="deleteElement(${i})"><i class="far fa-trash-alt"></i></button></td>
        </tr>
        
        `
    };

    data.innerHTML=result;

}

let submit = document.getElementById("submit");
submit.addEventListener('click' , createCourse);
let clean = document.getElementById("clear");
clean.addEventListener('click' , makeEmpty);
let search = document.getElementById('search');
search.setAttribute('onkeyup','searchCourse()');

// (come from lecture 13) using regex
function validateCourseName(course_name){
    let regexVaild = /^[A-Z][a-z0-9]{3,15}$/
    if(!regexVaild.test(cName.value)){
        warn_mssg[0].style.display='block'
        return false;
    }else{
        warn_mssg[0].style.display='none'
        return true;
    }
}
// we call vaild  function when we write in input
// we will use blur event (when move-out from input do)
cName.addEventListener('blur',validateCourseName);