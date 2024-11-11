/*Mobile Navigtion*/
function openNav() {
  document.getElementById("myNav").style.display = "block";
}

function closeNav() {
  document.getElementById("myNav").style.display = "none";
}

/*Travel Search Engine*/
function increment(id) {
  let input = document.getElementById(id);
  let value = parseInt(input.value);
  input.value = value + 1;
  updateTravelerInfo();
}

function decrement(id) {
  let input = document.getElementById(id);
  let value = parseInt(input.value);
  if (value > 0) {
      input.value = value - 1;
      updateTravelerInfo();
  }
}

function toggleModal() {
  document.getElementById("travelersModal-big").classList.toggle("active");
  document.getElementById("travelersModal-small").classList.toggle("active");
}

function closeModal() {
  document.getElementById("travelersModal-big").classList.remove("active");
  document.getElementById("travelersModal-small").classList.remove("active");
}

function updateTravelerInfo() {
  let adultsbig = parseInt(document.getElementById("adults-big").value);
  let adultssmall = parseInt(document.getElementById("adults-small").value);
  let childrenbig = parseInt(document.getElementById("children-big").value);
  let childrensmall = parseInt(document.getElementById("children-small").value);
  let infantsbig = parseInt(document.getElementById("infants-big").value);
  let infantssmall = parseInt(document.getElementById("infants-small").value);

  let totalTravelersbig = adultsbig + childrenbig + infantsbig;
  let totalTravelerssmall = adultssmall + childrensmall + infantssmall;
  let travelerTextbig = `${totalTravelersbig} Traveler${totalTravelersbig > 1 ? 's' : ''}`;
  let travelerTextssmall = `${totalTravelerssmall} Traveler${totalTravelerssmall > 1 ? 's' : ''}`;

  let selectedClassbig = document.querySelector('input[name="class"]:checked').value;
  let selectedClasssmall = document.querySelector('input[name="class"]:checked').value;

  document.getElementById("travelersButton-big").innerText = `${travelerTextbig}, ${selectedClassbig}`;
  document.getElementById("travelersButton-small").innerText = `${travelerTextssmall}, ${selectedClasssmall}`;
}