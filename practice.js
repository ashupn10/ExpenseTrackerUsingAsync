let btn = document.getElementById('addItem');
let container=document.getElementById('Expenses');
let inputs=document.querySelectorAll('.form-control');
console.log(btn);
btn.addEventListener('click',addExpense)
async function addExpense(){
    try{
        await axios.post('https://crudcrud.com/api/c48fc60db391474cae9ecc2793a51a67/Expenses',{
        "Expense": inputs[0].value,
        "Category": inputs[1].value,
        "Description": inputs[2].value
    })
    }catch(error){
        console.log(error);
    }
    ShowExpenses();
}
async function ShowExpenses(){
    try{
        const output=await axios.get('https://crudcrud.com/api/c48fc60db391474cae9ecc2793a51a67/Expenses')
        container.innerHTML='';
            output.data.forEach((key)=>{
                // console.log(key);
                let list=document.createElement('li');
                let expenseItem=document.createTextNode(`Expense: ${key.Expense} Category: ${key.Category} Description: ${key.Description}`);
                let Editbtn=document.createElement('button');
                Editbtn.textContent='Edit';
                let Deletebtn=document.createElement('button');
                Deletebtn.textContent='Delete';
                Editbtn.addEventListener('click',()=>{
                    Edit(key,list);
                })
                Deletebtn.addEventListener('click',()=>{
                    Delete(key._id,list);
                })
                list.appendChild(expenseItem);
                list.appendChild(Editbtn);
                list.appendChild(Deletebtn);
                container.appendChild(list);
            })
    }catch(error){
        console.error(error);
    }
    // .catch(err=>console.log(err));
}
async function Delete(key,list){
    try{  
        list.remove();
        await axios.delete('https://crudcrud.com/api/c48fc60db391474cae9ecc2793a51a67/Expenses/'+key)
        ShowExpenses();
    }catch(err){
        console.error(err);
    }
}
function Edit(key,list){
    try{
    inputs[0].value=key.Expense;
    inputs[1].value=key.Category;
    inputs[2].value=key.Description;
    Delete(key._id,list);
    }catch(err){
        console.error(err);
    }

}

window.addEventListener('DOMContentLoaded',()=>{
    ShowExpenses();
})