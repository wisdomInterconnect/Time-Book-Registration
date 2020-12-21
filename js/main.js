const name = document.getElementById('name');
const btnSignIn = document.getElementById('btnSignIn');
const clearAll = document.getElementById('btnClear');
const filter = document.getElementById('filter');
const form = document.getElementById('form');
const mainTable = document.getElementById('mainTable');
const time = timeIn();

// Event Listeners
form.addEventListener('submit',addName);
btnSignIn.addEventListener('click',addName);
filter.addEventListener('keyup',filterLogins);
clearAll.addEventListener('click',clearNames);



// Add item function
function addName(e){
    if(name.value !== ""){                
        createElements();
        storeNameInLocalStorage(name.value);
        name.focused = true;
        name.value = "";
    }
    else{
        alert('Please enter a name!');
    }
  
    e.preventDefault();
}



// Get Task from LS 
function getNames(){
    let names;
    if(localStorage.getItem('names') === null){
        names = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('names'));
    }

    names.forEach(function(name){
        
        var holder = document.createElement('tr');
        let nameHolder = document.createElement('td');
        let timeHolder = document.createElement('td');
        let actionHolder = document.createElement('td');
        let empty = document.createElement('td');
        let btnAction = document.createElement('button');
        let btnClear = document.createElement('h4');
        holder.className = 'name-list';
        btnAction.style.backgroundColor = 'red';
        btnAction.style.color = 'white';
        btnAction.innerHTML = 'Edit';    
        empty.innerHTML = "";
        btnClear.innerHTML = 'x';
        btnClear.className = 'x';
        btnClear.addEventListener('click',removeName);
        btnClear.style.color = 'red';
        nameHolder.innerText = name.value;
        timeHolder.innerText = time;
        holder.style.width = '100%';
        holder.style.padding = '10px';
        actionHolder.appendChild(btnAction);
        actionHolder.appendChild(btnClear);
        holder.appendChild(nameHolder);
        holder.appendChild(timeHolder);
        holder.appendChild(empty);
        holder.appendChild(actionHolder);
        mainTable.appendChild(holder);
    });
}




// Create all element
function createElements(){
    var holder = document.createElement('tr');
    let nameHolder = document.createElement('td');
    let timeHolder = document.createElement('td');
    let actionHolder = document.createElement('td');
    let empty = document.createElement('td');
    let btnAction = document.createElement('button');
    let btnClear = document.createElement('h4');
    holder.className = 'name-list';
    btnAction.style.backgroundColor = 'red';
    btnAction.style.color = 'white';
    btnAction.innerHTML = 'Edit';    
    empty.innerHTML = "";
    btnClear.innerHTML = 'x';
    btnClear.className = 'x';
    btnClear.addEventListener('click',removeName);
    btnClear.style.color = 'red';
    nameHolder.innerText = name.value;
    timeHolder.innerText = time;
    holder.style.width = '100%';
    holder.style.padding = '10px';
    actionHolder.appendChild(btnAction);
    actionHolder.appendChild(btnClear);
    holder.appendChild(nameHolder);
    holder.appendChild(timeHolder);
    holder.appendChild(empty);
    holder.appendChild(actionHolder);
    mainTable.appendChild(holder);
}

// filter function
function filterLogins(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.name-list').forEach(function(names){
        const item = names.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            names.style.display = 'block';            
            names.colspan = '4';            
        }
        else{
            names.style.display = 'none';
        }
    });
}


// clear names
function clearNames(){            
    while(mainTable.firstChild){
        mainTable.removeChild(mainTable.firstChild);
    }            
}

// Remove name from list
function removeName(e){    
        if(confirm('Are you sure you want to delete this?')){
            e.target.parentElement.parentElement.remove();  
            removeNameFromLocalStorage(e.target.parentElement.parentElement);      
    }
}

// Add name to ls
function storeNameInLocalStorage(name){
    let names;
    if(localStorage.getItem('names') === null){
        names = [];
    }
    else{
        names = JSON.parse(localStorage.getItem('names'));
    }
    names.push(names);
    localStorage.setItem('names', JSON.parse(localStorage.getItem('names')));
}


// Remove Name from LS
function removeNameFromLocalStorage(mainTable){
    let names;
    if(localStorage.getItem('tasks') === null){
        names = [];
    }
    else{
        names = JSON.parse(localStorage.getItem('names'));
    }

    tasks.forEach(function(name, index){
        if(mainTable.textContent === name){
            name.splice(index, 1);
        }
    });
    localStorage.setItem('names', JSON.stringify(names));
}


// get time format
function timeIn(time){
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var session = "AM";
        if(h == 0){
            h = 12;        
        }
        if(h > 12){
            h = h - 12;
            session = " PM";
        }    
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;    
        return (time = h + ":" + m + ":" + s + " "+session);    
}

