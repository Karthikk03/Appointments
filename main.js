document.addEventListener('DOMContentLoaded', ()=>{
    axios.get('https://crudcrud.com/api/865582eaebaf4191bae413e96de79ef5/Appointments')
    .then(response=>{
        for(let i=0;i<response.data.length;i++){
            addUser(response.data[i]);
        }
    })
    .catch(err=>console.log(err));
});


let form=document.querySelector('#Myform');
let users=document.querySelector('.users');
form.addEventListener('submit',onsubmit);

document.addEventListener('click',deleteUsers);

function onsubmit(e) {
    e.preventDefault();
    let name = document.getElementById('name');
    let phone = document.getElementById('phone');
    let age = document.getElementById('age');
    let userItems = users.querySelectorAll('li');
    for(let i=0;i<userItems.length;i++) {
        const text=userItems[i].textContent;
        if(text.includes(phone.value)){
            let entry=document.createElement('li');
            entry.textContent='You have already booked';
            form.appendChild(entry);
            setTimeout(()=>{
                entry.remove();
            },3000);
            return ;
        }
    }
    axios.post('https://crudcrud.com/api/865582eaebaf4191bae413e96de79ef5/Appointments',{
        'name':name.value,
        'phone':phone.value,
        'age':age.value
    })
    .then(response=>{
        addUser(response.data);
        console.log(response.data);
    })
    .catch(err=>console.log(err));
    age.value='';
    name.value='';
    phone.value='';
}

function addUser(user){
    let li=document.createElement('li');
    li.setAttribute('id',user._id);
    li.textContent=user.name+' '+user.phone+' '+user.age+' ';
    let del= document.createElement('button');
    let edit= document.createElement('button');
    del.classList.add('btn', 'btn-danger','btn-sm','m-2');
    edit.classList.add('btn', 'btn-primary','btn-sm');
    del.textContent = 'delete';
    edit.textContent = 'edit';
    li.appendChild(edit);
    li.appendChild(del);
    users.appendChild(li);
}

function deleteUsers(e){
    if(e.target.textContent==='delete'){
        let li=e.target.parentNode;
        let id=li.getAttribute('id');
        axios.delete(`https://crudcrud.com/api/865582eaebaf4191bae413e96de79ef5/Appointments/${id}`)
            .then((res)=>{
                users.removeChild(li);
                console.log(res);
            })
            .catch(err=>console.log(err));
        
    }
}