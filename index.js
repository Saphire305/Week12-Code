const url = "http://localhost:3000/customers"

const rowClass = ['container', 'row', 'my-2', 'border-bottom', 'border-dark'];
const colClass = ['container', 'col-sm', 'mx-auto'];
const buttonClass = ['btn', 'btn-danger', 'btn-sm','w-25', 'mx-auto', 'my-1']

function displayCustomers(){
    $.get(url).then(customers => {
        
        for(let customer of customers){
            let row = document.createElement('div');
            row.classList.add(...rowClass);

            let name = document.createElement('div');
            let phone = document.createElement('div');
            let email = document.createElement('div');
            let address = document.createElement('div');
            let notes = document.createElement('div');
            let del = document.createElement('button');

            name.classList.add(...colClass);
            phone.classList.add(...colClass);
            email.classList.add(...colClass);
            address.classList.add(...colClass);
            notes.classList.add(...colClass);
            del.classList.add(...buttonClass);

            name.innerText = customer.name;
            phone.innerText = customer.phoneNumber;
            email.innerText = customer.email;
            address.innerText = customer.address;
            notes.innerText = customer.comment;
            del.innerText = 'Remove'

            del.setAttribute('onclick', `deleteCustomer(${customer.id})`);

            row.append(name,phone,email,address,notes,del);
            document.getElementById('customers').append(row);
        }
        
    });
}

function deleteCustomer(id){
    console.log(id);
    $.ajax({
        url: `${url}/${id}`,
        type: 'DELETE'
    })
};

function addCustomer(){
    let newCustomer = {
        name: document.getElementById("newName").value,
        phoneNumber: document.getElementById("newNumber").value,
        email: document.getElementById("newEmail").value,
        address: document.getElementById("newAddress").value,
        comment: document.getElementById("newComment").value
    }

    $.post(url, newCustomer);
}
displayCustomers();