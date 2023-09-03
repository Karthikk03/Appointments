document.addEventListener('DOMContentLoaded', ()=>{
    axios.get('https://crudcrud.com/api/3815c0f1ba4844aca9bc39933f967751/Appointments')
    .then(response=>{
        for(let i=0;i<response.data.length;i++){
            addUser(response.data[i]);
        }
    })
    .catch(err=>console.log(err));
});


let form=document.querySelector('#Myform');
let users=document.querySelector('.users');
let nam = document.getElementById('name');
let phone = document.getElementById('phone');
let age = document.getElementById('age');
form.addEventListener('submit',onsubmit);
document.addEventListener('click',updateUsers);

function onsubmit(e) {
    e.preventDefault();
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
    axios.post('https://crudcrud.com/api/3815c0f1ba4844aca9bc39933f967751/Appointments',{
        'name':nam.value,
        'phone':phone.value,
        'age':age.value
    })
    .then(response=>{
        addUser(response.data);
        console.log(response.data);
    })
    .catch(err=>console.log(err));
    age.value='';
    nam.value='';
    phone.value='';
}


function addUser(user){
    let li=document.createElement('li');
    li.setAttribute('id',user._id);
    li.textContent=user.name+' '+user.phone+' '+user.age+' ';
    let del= document.createElement('button');
    let edit= document.createElement('button');
    del.classList.add('btn','del','btn-danger','btn-sm','m-2');
    edit.classList.add('btn', 'btn-primary','btn-sm');
    del.textContent = 'delete';
    edit.textContent = 'edit';
    li.appendChild(edit);
    li.appendChild(del);
    users.appendChild(li);
}
function updateUsers(e){
    if(e.target.textContent==='delete')deleteUsers(e);
    else if(e.target.textContent==='edit')editUsers(e);
}
function deleteUsers(e){
    let li=e.target.parentNode;
    let id=li.getAttribute('id');
    axios.delete(`https://crudcrud.com/api/3815c0f1ba4844aca9bc39933f967751/Appointments/${id}`)
        .then((res)=>{
            users.removeChild(li);
            console.log(res);
            })
        .catch(err=>console.log(err));
}

function editUsers(e){
    let li=e.target.parentNode;
    let id=li.getAttribute('id');
    const inputs=li.textContent.split(' ');
    nam.value=inputs[0];
    phone.value=inputs[1];
    age.value=inputs[2];
    form.removeEventListener('submit',onsubmit);
    form.addEventListener('submit',(e) =>{
        e.preventDefault();
        axios.put(`https://crudcrud.com/api/3815c0f1ba4844aca9bc39933f967751/Appointments/${id}`,{
            'name': nam.value,
            'phone': phone.value,
            'age': age.value
        })
        .then(res=>{
            console.log(res);
            li.textContent=nam.value+' '+phone.value+' '+age.value+' ';
            let del= document.createElement('button');
            let edit= document.createElement('button');
            del.classList.add('btn','del','btn-danger','btn-sm','m-2');
            edit.classList.add('btn', 'btn-primary','btn-sm');
            del.textContent = 'delete';
            edit.textContent = 'edit';
            li.appendChild(edit);
            li.appendChild(del);
            form.reset();

        })
        .catch(err=>console.log(err));
        
    });

}
