const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    // Clear the input in the input field
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));
}


const displaySearchResult = phones => {
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div class="card">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.brand}</h5>
                        <p class="card-text">${phone.phone_name}</p>
                        <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-primary">Details</button>
                    </div>
                </div>
        
        `;
        searchResult.appendChild(div);
    });
}


const loadPhoneDetail = phoneID => {
    console.log(phoneID);
}