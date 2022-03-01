document.getElementById('mobile-trapper').style.color = 'green';
document.getElementById('main-body').style.backgroundColor = '#c6f3e4c4';
document.getElementById('error-message').style.display = 'none';
document.getElementById('no-phone-message').style.display = 'none';

const loadPhone = () => {
    const inputSearch = document.getElementById('input-search').value;

    document.getElementById('error-message').style.display = 'none';
    if(inputSearch == '') {
        document.getElementById('error-message').style.display = 'block';
    }
    else {
        // ----------load data---------------

        const url = `https://openapi.programming-hero.com/api/phones?search=${inputSearch}`;
        fetch(url)
        .then(res => res.json())
        .then(data => showPhoneDetail(data.data))

        //------------ clear data---------------
        document.getElementById('input-search').value = '';
    };
};

// -------all phone details loaded------------

const showPhoneDetail = (infos) => {
    // console.log(infos.length);
    const phoneContainer = document.getElementById('phone-container');
    const singlePhoneDetails = document.getElementById('phone-details');

    // -----------previous data clear---------
    
    phoneContainer.textContent = '';
    singlePhoneDetails.textContent = '';
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
                <div class="card h-100 rounded">
                    <div class="text-center">
                        <img src="${phone.image}" alt="">
                    </div>
                    <h2 class="text-center">Name: ${phone.phone_name}</h2>
                    <h3 class="text-center">Brand: ${phone.brand}</h3>
                    <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-info">Explore</button>
                </div>
            `;
            phoneContainer.appendChild(div);
        };
    };  
};

// ----------single phone data loaded------------

const loadPhoneDetail = (details) => {
    // console.log(details);
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data));
}

// ------------display single phone details-------------

const displayPhoneDetail = (explore) => {
    console.log(explore);
    const phoneDetails = document.getElementById('phone-details');

    // -----------previous data clear---------

    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add("card");
    div.classList.add("rounded");
    div.classList.add("mb-4");
    div.innerHTML = `
    <div class="text-center">
        <img src="${explore.image}" class="card-img-top w-50" alt="...">
    </div>
    <div class="card-body text-center">
      <h3 class="card-title">${explore.name}</h3>
      <p class="card-text text-danger">Release Date:: ${explore.releaseDate?explore.releaseDate: 'No release date'}</p>
      <div>
        <h3 class="text-center">Main Features</h3>
        <h5 class="card-text text-info">ChipSet:: ${explore.mainFeatures.chipSet}</h5>
        <h5 class="card-text text-info">Storage:: ${explore.mainFeatures.storage}</h5>
        <h5 class="card-text text-info">DisplaySize:: ${explore.mainFeatures.displaySize}</h5>
        <h5 class="card-text text-info">Memory:: ${explore.mainFeatures.memory}</h5>
        <h5 class="card-text text-info">Sensors:: ${explore.mainFeatures.sensors}</h5>
      </div>
      <div>
        <h3 class="text-center">Others</h3>
        <h5 class="card-text text-info">Bluetooth:: ${explore.others.Bluetooth}</h5>
        <h5 class="card-text text-info">GPS:: ${explore.others.GPS}</h5>
        <h5 class="card-text text-info">NFC:: ${explore.others.NFC}</h5>
        <h5 class="card-text text-info">Radio:: ${explore.others.Radio}</h5>
        <h5 class="card-text text-info">USB:: ${explore.others.USB}</h5>
        <h5 class="card-text text-info">WLAN:: ${explore.others.WLAN}</h5>
      </div>
    </div>
    `;
    phoneDetails.appendChild(div);
    window.scrollTo(0, 100);
};