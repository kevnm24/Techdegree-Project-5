// this will fetch data from url
fetch('https://randomuser.me/api?results=12&nat=us')
  .then(response => response.json())
  .then(data => getUsers(data.results));

// this function creates 12 user cards that will have information about them
function getUsers(data) {
  let userGallery = ""
  for (let i = 0; i < data.length; i++) {
    userGallery +=
// interpolation is used to get the data results and chose what we want to show like a picture and then it is inserted into an element
    `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${data[i].picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
            <p class="card-text">${data[i].email}</p>
            <p class="card-text cap">${data[i].location.city}</p>
        </div>
    </div>
    `;
// this line of code will get the div with an id of gallery and insert usergallery as its innerhtml
    document.querySelector('#gallery').innerHTML = userGallery;

// this is used when one of the cards is clicked it will get its index and isert it into the data array to show the appropiate user
    $('.card').on('click', function(){
        let currentIndex = $('.card').index(this);
        modalMarkup(data[currentIndex]);
      });
  }
}

// this function is used to create a modal for when one of the cards is clicked, it will show more information of the user.
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
// this line of code will insert modalWindow into the innerhtml of div element
            document.querySelector('div').innerHTML += modalWindow;

// these lines of code will be used to close modaWindow when x button is clicked
            $('#modal-close-btn').on('click', function(){
              $('.modal-container').remove();
            });
}
