document.getElementById('mobile-trapper').style.color = 'green';
document.getElementById('main-body').style.backgroundColor = '#c6f3e4c4';
document.getElementById('error-message').style.display = 'none';
document.getElementById('no-phone-message').style.display = 'none';

const loadPhone = () => {
    const inputSearch = document.getElementById('input-search').value;
    inputSearch.innerText = '';
    document.getElementById('error-message').style.display = 'none';
    if(inputSearch == '') {
        document.getElementById('error-message').style.display = 'block';
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputSearch}`;
        fetch(url)
        .then(res => res.json())
        .then(data => showPhoneDetail(data.data))
    } 
}

const showPhoneDetail = (infos) => {
    // console.log(infos.length);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    document.getElementById('no-phone-message').style.display = 'none';
    if (infos.length == 0) {
        document.getElementById('no-phone-message').style.display = 'block';
    }
    else {
        for (const phone of infos.slice(0, 20)) {
            // console.log(phone);
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = ` 
                <div class="card h-100">
                    <div class="text-center">
                        <img src="${phone.image}" alt="">
                    </div>
                    <h2 class="text-center">Name: ${phone.phone_name}</h2>
                    <h3 class="text-center">Brand: ${phone.brand}</h3>
                    <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-info">Explore</button>
                </div>
            `;
            phoneContainer.appendChild(div);
        }
    }  
}

const loadPhoneDetail = (details) => {
    // console.log(details);
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data));
}

const displayPhoneDetail = (explore) => {
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add("card")
    div.innerHTML = `
    <div class="text-center">
        <img src="${explore.image}" class="card-img-top w-50" alt="...">
    </div>
    <div class="card-body text-center">
      <h3 class="card-title">${explore.name}</h3>
      <p class="card-text text-danger">Release Date: ${explore.releaseDate?explore.releaseDate: 'No release date'}</p>
      <div>
        <h3 class="text-center">Main Features</h3>
        <p class="card-text text-info">ChipSet: ${explore.mainFeatures.chipSet}</p>
        <p class="card-text text-info">DisplaySize: ${explore.mainFeatures.displaySize}</p>
        <p class="card-text text-info">Memory: ${explore.mainFeatures.memory}</p>
      </div>
      <div>
        <h3 class="text-center">Others</h3>
        <p class="card-text text-info">${explore.mainFeatures.sensors}</p>
      </div>
    </div>
    `;
    phoneDetails.appendChild(div);
}