import fetchJsonp from 'fetch-jsonp';
import {isValidZip} from  './validate';
import {showAlert} from  './validate';

const petForm = document.querySelector('#pet-form');
petForm.addEventListener('submit',fetchAnimals);

function fetchAnimals(e){
    e.preventDefault();

    //Get user input
    const animal =  document.querySelector('#animal').value;
    const zip =  document.querySelector('#zip').value;

    if(!isValidZip(zip)){
        showAlert('Please Enter A Valid Zipcode','danger');
        return;
    }

    //Fetch Pets
    fetchJsonp(`http://api.petfinder.com/pet.find?format=json&key=8498e105961170e140dc68aa7ac69d08&animal=${animal}&location=${zip}&callback=callback`,{
        jsonpCallbackFunction:'callback'
    })
        .then(res=>res.json())
        .then(data=>showAnimals(data.petfinder.pets.pet))
        .catch(err=>console.log(err))
}
function callback(data){
    console.log(data);
}
function showAnimals(pets ){
    const results = document.querySelector('#results');
    //clear first
    results.innerHTML='';
    //Loop through pets 
    pets.forEach((pet)=>{
        const div = document.createElement('div');
        div.classList.add('card','card-body','mb-3');
        div.innerHTML =`
            <div class="row">
                <div class="col-sm-6" >
                   <h4>${pet.name.$t}(${pet.age.$t})</h4>
                   <p class="text-secondary">${pet.breeds.breed.$t}</p> 
                   <p>${pet.contact.address1.$t} ${pet.contact.city.$t} ${pet.contact.state.$t} ${pet.contact.zip.$t}</p>
                   <ul class="list-group"> 
                        <li class = "list-group-item">Phone: ${pet.contact.phone.$t}</li>
                        ${pet.contact.email.$t? `<li class="list-group-item">Email: ${pet.contact.email.$t}</li>`:``}
                        <li class = "list-group-item">Shelter ID: ${pet.shelterId.$t}</li>
                    </ul>
                </div>
                <div class="col-sm-6 text-center">
                    <img src="${pet.media.photos.photo[3].$t}" class="img-fluid rounded-circle mt-2">
                </div>
            </div>
        `;
        results.appendChild(div);
    })
}