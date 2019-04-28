const search = document.getElementById('search');
const matchList = document.getElementById('match-list');


search.addEventListener('input',()=>searchStates(search.value));
//search function
const searchStates= async searchText=>{
    const res = await fetch('./states.json');
    const states = await res.json();
    
    //get matches 
    let matches = states.filter(state=>{
        const regex = new RegExp(`^${searchText}`,'gi');
        return state.name.match(regex)|| state.abbr.match(regex); 
    })

    if(searchText.length===0){
        matches=[];
        matchList.innerHTML = '';
    }
    //after filtering outputting the data
    outputHtml(matches);
}

const outputHtml = matches=>{
    if(matches.length>0){
        const html = matches.map(match=>`
            <div className="card card-body mb-1 bg-secondary ">
                <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital }</span>  </h4>
                <small>Lat: ${match.lat}/Long: ${match.long}</small>
            </div>
        `).join('');

        matchList.innerHTML =html;
     
    }
}