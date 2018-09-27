fetch('https://randomuser.me/api?results=12&nat=us')
  .then(response => response.json())
  .then(data => getUsers(data.results));

function getUsers(data) {
  let userGallery = ""
  for (let i = 0; i < data.length; i++) {
    userGallery +=
    `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${data[i].picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
            <p class="card-text">${data[i].email}</p>
            <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
        </div>
    </div>
    `;

    document.querySelector('#gallery').innerHTML = userGallery;

    $('.card').on('click', function(){
        let currentIndex = $('.card').index(this);
        modalMarkup(data[currentIndex]);
      });
  }
}

function modalMarkup(info) {
  const dob = info.dob.date;
  dob.split('-')
  let month = dob.substr(5, 2);
  let day = dob.substr(8, 2);
  let year= dob.substr(2, 2);
    let modalWindow = ""
    modalWindow += `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${info.picture.large} " alt="profile picture">
                <h3 id="name" class="modal-name cap">${info.name.first} ${info.name.last}</h3>
                <p class="modal-text">${info.email}</p>
                <p class="modal-text cap">${info.location.city}</p>
                <hr>
                <p class="modal-text">${info.phone}</p>
                <p class="modal-text">${info.location.street}, ${info.location.state} ${info.location.postcode}</p>
                <p class="modal-text">Birthday:${month}/${day}/${year}</p>
            </div>`;
            document.querySelector('div').innerHTML += modalWindow;
            $('#modal-close-btn').on('click', function(){
              $('.modal-container').remove();
            });
}
