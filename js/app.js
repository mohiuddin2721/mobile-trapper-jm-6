document.getElementById('mobile-trapper').style.color = 'green';
document.getElementById('main-body').style.backgroundColor = '#c6f3e4c4';

const loadPhone = () => {
    const inputSearch = document.getElementById('input-search').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputSearch}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showPhoneDetail(data.data))
}

const showPhoneDetail = (infos) => {
    // console.log(infos);
    const phoneContainer = document.getElementById('phone-container');
    for (const phone of infos) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = ` 
            <div class="card h-100">
                <div class="text-center">
                    <img src="${phone.image}" alt="">
                </div>
                <h2 class="text-center">Name: ${phone.phone_name}</h2>
                <h2 class="text-center">Brand: ${phone.brand}</h2>
                <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-info">Explore</button>
            </div>
        `;
        phoneContainer.appendChild(div);
    }
}

const loadPhoneDetail = (details) => {
    // console.log(details);
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
    .then(res => res.json())
    .then(data => phoneExplore(data.data));
}

const phoneExplore = (explore) => {
    console.log(explore);
}