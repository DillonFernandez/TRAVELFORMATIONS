function openNav() {
  document.getElementById("myNav").style.display = "block";
}

function closeNav() {
  document.getElementById("myNav").style.display = "none";
}

/* ----------------------------------------------------------------------------------------------------*/

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

scrollToTopBtn.style.display = "none";

window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

scrollToTopBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

/* ----------------------------------------------------------------------------------------------------*/

function increment(id1, id2) {
  let input1 = document.getElementById(id1);
  let input2 = document.getElementById(id2);
  let value = parseInt(input1.value);
  input1.value = value + 1;
  input2.value = value + 1;
  updateTravelerInfo();
}

function decrement(id1, id2) {
  let input1 = document.getElementById(id1);
  let input2 = document.getElementById(id2);
  let value = parseInt(input1.value);
  if (value > 0) {
    input1.value = value - 1;
    input2.value = value - 1;
    updateTravelerInfo();
  }
}

function syncInputs(sourceId, targetId) {
  document.getElementById(targetId).value = document.getElementById(sourceId).value;
}

function syncTripType(formType) {
  const selectedTripType = document.querySelector(`input[name="tripType${formType === 'big' ? 'Big' : 'Small'}"]:checked`).value;
  const oppositeForm = formType === 'big' ? 'small' : 'big';
  document.querySelectorAll(`input[name="tripType${oppositeForm === 'big' ? 'Big' : 'Small'}"]`).forEach(el => {
    el.checked = el.value === selectedTripType;
  });
  updateTravelerInfo();
}

function syncClass(formType) {
  const selectedClass = document.querySelector(`input[name="class${formType === 'big' ? 'Big' : 'Small'}"]:checked`).value;
  const oppositeForm = formType === 'big' ? 'small' : 'big';
  document.querySelectorAll(`input[name="class${oppositeForm === 'big' ? 'Big' : 'Small'}"]`).forEach(el => {
    el.checked = el.value === selectedClass;
  });
  updateTravelerInfo();
}

function toggleModal(type) {
  if (type === 'flights') {
    document.getElementById("travelersModal-flights").classList.toggle("active");
  } else if (type === 'big') {
    document.getElementById("travelersModal-big").classList.toggle("active");
  } else if (type === 'small') {
    document.getElementById("travelersModal-small").classList.toggle("active");
  }
}

function closeModal() {
  const modals = document.querySelectorAll('.travelers-modal-flights, .travelers-modal-big, .travelers-modal-small');
  modals.forEach(modal => modal.classList.remove('active'));
}

function updateTravelerInfo() {
  let adultsbig = parseInt(document.getElementById("adults-big").value);
  let childrenbig = parseInt(document.getElementById("children-big").value);
  let infantsbig = parseInt(document.getElementById("infants-big").value);

  let totalTravelersbig = adultsbig + childrenbig + infantsbig;
  let travelerTextbig = `${totalTravelersbig} Traveler${totalTravelersbig > 1 ? 's' : ''}`;
  
  let selectedClassbig = document.querySelector('input[name="classBig"]:checked').value;
  
  let adultssmall = parseInt(document.getElementById("adults-small").value);
  let childrensmall = parseInt(document.getElementById("children-small").value);
  let infantssmall = parseInt(document.getElementById("infants-small").value);

  let totalTravelerssmall = adultssmall + childrensmall + infantssmall;
  let travelerTextssmall = `${totalTravelerssmall} Traveler${totalTravelerssmall > 1 ? 's' : ''}`;
  
  let selectedClasssmall = document.querySelector('input[name="classSmall"]:checked').value;

  document.getElementById("travelersButton-big").innerText = `${travelerTextbig}, ${selectedClassbig}`;
  document.getElementById("travelersButton-small").innerText = `${travelerTextssmall}, ${selectedClasssmall}`;
}

function searchFlights() {
  let formDataBig = {
    adults: document.getElementById("adults-big").value,
    children: document.getElementById("children-big").value,
    infants: document.getElementById("infants-big").value,
    from: document.getElementById("from-big")?.value || "",
    to: document.getElementById("to-big")?.value || "",
    depart: document.getElementById("depart-big")?.value || "",
    return: document.getElementById("return-big")?.value || "",
    class: document.querySelector('input[name="classBig"]:checked').value,
    tripType: document.querySelector('input[name="tripTypeBig"]:checked').value,
    source: "big",
  };

  let formDataSmall = {
    adults: document.getElementById("adults-small").value,
    children: document.getElementById("children-small").value,
    infants: document.getElementById("infants-small").value,
    from: document.getElementById("from-small")?.value || "",
    to: document.getElementById("to-small")?.value || "",
    depart: document.getElementById("depart-small")?.value || "",
    return: document.getElementById("return-small")?.value || "",
    class: document.querySelector('input[name="classSmall"]:checked').value,
    tripType: document.querySelector('input[name="tripTypeSmall"]:checked').value,
    source: "small",
  };

  let activeForm = event.target.classList.contains("search-button-big") ? formDataBig : formDataSmall;
  
  localStorage.setItem("selectedFormData", JSON.stringify(activeForm));

  window.location.href = "flights.html";
}


window.onload = function() {
  let selectedFormData = JSON.parse(localStorage.getItem("selectedFormData"));

  if (selectedFormData) {
    document.getElementById("adults-flights").value = selectedFormData.adults;
    document.getElementById("children-flights").value = selectedFormData.children;
    document.getElementById("infants-flights").value = selectedFormData.infants;
    document.getElementById("from-flights").value = selectedFormData.from;
    document.getElementById("to-flights").value = selectedFormData.to;
    document.getElementById("depart-flights").value = selectedFormData.depart;
    document.getElementById("return-flights").value = selectedFormData.return;
    document.querySelector(`input[name="classFlights"][value="${selectedFormData.class}"]`).checked = true;
    document.querySelector(`input[name="tripTypeFlights"][value="${selectedFormData.tripType}"]`).checked = true;

    let totalTravelers = parseInt(selectedFormData.adults) + parseInt(selectedFormData.children) + parseInt(selectedFormData.infants);
    let travelerText = `${totalTravelers} Traveler${totalTravelers > 1 ? 's' : ''}, ${selectedFormData.class}`;
    document.getElementById("travelersButton-flights").innerText = travelerText;
  }

  localStorage.removeItem("selectedFormData");
};

function incrementflights(id) {
  let input = document.getElementById(id);
  let value = parseInt(input.value);
  input.value = value + 1;
  updateTravelerInfoFlights();
}

function decrementflights(id) {
  let input = document.getElementById(id);
  let value = parseInt(input.value);
  if (value > 0) {
    input.value = value - 1;
    updateTravelerInfoFlights();
  }
}

function updateTravelerInfoFlights() {
  let adultsFlights = parseInt(document.getElementById("adults-flights").value);
  let childrenFlights = parseInt(document.getElementById("children-flights").value);
  let infantsFlights = parseInt(document.getElementById("infants-flights").value);

  let totalTravelersFlights = adultsFlights + childrenFlights + infantsFlights;
  let travelerTextFlights = `${totalTravelersFlights} Traveler${totalTravelersFlights > 1 ? 's' : ''}`;

  let selectedClassFlights = document.querySelector('input[name="classFlights"]:checked') ? 
    document.querySelector('input[name="classFlights"]:checked').value : 'Economy';

  document.getElementById("travelersButton-flights").innerText = `${travelerTextFlights}, ${selectedClassFlights}`;
}

const todaybig = new Date().toISOString().split('T')[0];
document.getElementById('depart-big').setAttribute('min', todaybig);
document.getElementById('return-big').setAttribute('min', todaybig);

const todaysmall = new Date().toISOString().split('T')[0];
document.getElementById('depart-small').setAttribute('min', todaysmall);
document.getElementById('return-small').setAttribute('min', todaysmall);

/* ----------------------------------------------------------------------------------------------------*/

let slideshow1Index = 0;
const slideshow1Slides = document.querySelectorAll('.slideshow1-slide');
const slideshow1TotalSlides = slideshow1Slides.length;

function changeSlide1(direction) {
  slideshow1Index += direction;

  if (slideshow1Index < 0) {
    slideshow1Index = getTotalSlidesForCurrentLayout1() - 1;
  } else if (slideshow1Index >= getTotalSlidesForCurrentLayout1()) {
    slideshow1Index = 0;
  }

  showSlides1();
}

function goToSlide1(index) {
  slideshow1Index = index;
  showSlides1();
}

function showSlides1() {
  const slideshow1SlidesContainer = document.querySelector('.slideshow1-slides');
  const slideshow1SlidesPerView = getSlidesPerView1();
  slideshow1SlidesContainer.style.transform = `translateX(${-slideshow1Index * 100 / slideshow1SlidesPerView}%)`;
}

setInterval(() => {
  changeSlide1(1);
}, 3500);

showSlides1();

function getSlidesPerView1() {
  if (window.innerWidth <= 490) {
    return 1;
  } else if (window.innerWidth <= 890) {
    return 2;
  } else {
    return 3;
  }
}

function getTotalSlidesForCurrentLayout1() {
  return Math.ceil(slideshow1TotalSlides / getSlidesPerView1());
}

/* ----------------------------------------------------------------------------------------------------*/

let slideshow3Index = 0;
const slideshow3Slides = document.querySelectorAll('.slideshow3-slide');
const slideshow3TotalSlides = slideshow3Slides.length;

function changeSlide3(direction) {
  slideshow3Index += direction;

  if (slideshow3Index < 0) {
    slideshow3Index = getTotalSlidesForCurrentLayout3() - 1;
  } else if (slideshow3Index >= getTotalSlidesForCurrentLayout3()) {
    slideshow3Index = 0;
  }

  showSlides3();
}

function goToSlide3(index) {
  slideshow3Index = index;
  showSlides3();
}

function showSlides3() {
  const slideshow3SlidesContainer = document.querySelector('.slideshow3-slides');
  const slideshow3SlidesPerView = getSlidesPerView3();
  slideshow3SlidesContainer.style.transform = `translateX(${-slideshow3Index * 100 / slideshow3SlidesPerView}%)`;
}

setInterval(() => {
  changeSlide3(1);
}, 3500);

showSlides3();

function getSlidesPerView3() {
  if (window.innerWidth <= 490) {
    return 1;
  } else if (window.innerWidth <= 890) {
    return 2;
  } else {
    return 3;
  }
}

function getTotalSlidesForCurrentLayout3() {
  return Math.ceil(slideshow3TotalSlides / getSlidesPerView3());
}

/* ----------------------------------------------------------------------------------------------------*/

const today = new Date().toISOString().split('T')[0];    
document.getElementById('checkin').setAttribute('min', today);
document.getElementById('checkout').setAttribute('min', today);