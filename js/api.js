const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    /*------------------------------------------ 
        Clear the input in the input field
    ------------------------------------------*/
    searchField.value = '';

    /*---------------------------------------------------- 
        Spinner will show while the data is loading
    ----------------------------------------------------*/
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none');
    spinner.classList.add('d-flex');


    if (searchText === '') {
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';

        /*---------------------------------------------------------------- 
            clear previous selected item card before searching new phone 
        -----------------------------------------------------------------*/
        const phoneDetail = document.getElementById('phone-detail');
        phoneDetail.textContent = '';

        const div = document.createElement('div');
        // div.style.marginLeft = '500px';
        div.style.textAlign = 'center';
        div.classList.add('w-50', 'mx-auto');
        div.innerHTML = `
        <h2>Text field can't be empty</h2>
        `;
        searchResult.appendChild(div);
        return;
    }



    /*---------------------------------------------------------
        Load data after fetching dynamic URL 
       & Spinner will stop loading after data is fetched
    ---------------------------------------------------------*/
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displaySearchResult(data.data);
            spinner.classList.remove('d-flex')
            spinner.classList.add('d-none')

        })

}


const displaySearchResult = phones => {
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    /*---------------------------------------------------------------- 
        clear previous selected item card before searching new phone 
    ----------------------------------------------------------------*/
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = '';

    /*--------------------------------------------------------------------- 
        Show an error message after not finding the search result
    ---------------------------------------------------------------------*/
    if (!phones.length) {
        const div = document.createElement('div');
        // div.style.marginLeft = '500px';
        div.style.textAlign = 'center';
        div.classList.add('w-50', 'mx-auto');
        div.innerHTML = `
        <h2>No result found</h1>
        `;
        searchResult.appendChild(div);
        return;
    }

    phones.forEach(phone => {
        // console.log(phone);
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
    // console.log(phoneID);
    const url = ` https://openapi.programming-hero.com/api/phone/${phoneID}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}


const displayPhoneDetail = phone => {
    // console.log(phone);
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <p class="card-text">
                <b>Brand:</b> ${phone.brand} <br>
                <b>Release Date:</b> ${phone.releaseDate} <br>
                <b> Main Features: <br> </b>
                    Display Size: ${phone.mainFeatures.displaySize} <br>
                    Memory: ${phone.mainFeatures.memory} <br>
                    Chip Set:  ${phone.mainFeatures.chipSet} <br>
                <b> Sensors: <br> </b>
                     ${phone.mainFeatures.sensors[0]} <br>
                     ${phone.mainFeatures.sensors[1]} <br>
                     ${phone.mainFeatures.sensors[2]} <br> 
                     ${phone.mainFeatures.sensors[3]} <br>
                     ${phone.mainFeatures.sensors[4]} <br>
                     ${phone.mainFeatures.sensors[5]} <br>

                <b> Others: <br> </b>
                  GPS: ${phone.others ? phone.others.GPS : 'Not found'} <br>
                  WLAN: ${phone.others ? phone.others.WLAN : 'Not found'} <br>
                  USB:  ${phone.others ? phone.others.USB : 'Not found'} <br>
                  Bluetooth:  ${phone.others ? phone.others.Bluetooth : 'Not found'} <br>
            </p>
            
        </div>
    
    `;
    phoneDetail.appendChild(div);
}