let selectedState = 0;

const loadAllStates = () => {
  fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
    .then((res) => res.json())
    .then((data) => {
      const allStates = data.states;
      const states = document.getElementById("states");
      const allStateNames = getStateNames(allStates);
      console.log(states);
      states.innerHTML = allStateNames.join("");
    });
};

const getStateNames = (states) => {
  return states.map((state) => {
    const stateId = "state" + "_" + state["state_id"];
    return `<option id='${stateId}' class='dropdown-item'>${state["state_name"]}</option>`;
    //return `<li id='${stateId}'><a class="dropdown-item" href="#" onclick='loadAllDistricts(${state["state_id"]});'>${state["state_name"]}</a></li>`;
  });
};

const loadAllDistricts = (stateId) => {
  fetch("https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + stateId)
    .then((res) => res.json())
    .then((data) => {
      const allDistricts = data.districts;
      const districts = document.getElementById("districts");
      const allDistrictNames = getDistricteNames(allDistricts);
      districts.innerHTML = allDistrictNames;
    });
};

const getDistricteNames = (districts) => {
  return districts.map((district) => {
    const districtId = "district" + "_" + district["district_id"];
    return `<option id='${districtId}'>${district["district_name"]}</option>`;
  });
};

const loadResultByDistrictId = (district_id) => {
  fetch(
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" +
      district_id +
      "&date=31-03-2021"
  )
    .then((res) => res.json())
    .then((data) => {
      const allSessions = data.sessions;
      const table = document.getElementById("sessions");
      console.log(table);
      const allData = fillTable(allSessions);
      table.innerHTML = allData;
    });
};

const fillTable = (allSessions) => {
  return allSessions.map((result) => {
    const center_name = allSessions["name"];
    const center_address = allSessions["address"];
    const center_pin = allSessions["pincode"];
    const available_capacity = allSessions["available_capacity"];
    const vaccine = allSessions["vaccine"];
    const slots = allSessions["slots"];
    // const slots = allSessions["slots"].join("");
    return `<tr><td>${result[center_name]}</td>
  <td>${result[center_address]}</td>
  <td>${result[center_pin]}</td>
  <td>${result[available_capacity]}</td>
  <td>${result[vaccine]}</td>
  <td>${result[slots]}</td>
  </tr>`;
    //   return (
    //     "Center Name=" +
    //     center_name +
    //     "\n Center Address=" +
    //     center_address +
    //     "\nCenter Pin=" +
    //     center_pin +
    //     "\n Available Capacity=" +
    //     available_capacity +
    //     "\nVaccine=" +
    //     vaccine +
    //     "\nSlots=" +
    //     slots
    //   );
  });
};

const onDistrictSelected = () => {
  const districts = document.getElementById("districts");
  const selectedValue = districts.options[districts.selectedIndex].id;
  const districtId = selectedValue.split("_")[1];
  console.log(districtId);

  loadResultByDistrictId(districtId);
};

const onStateSelected = () => {
  const states = document.getElementById("states");
  const selectedValue = states.options[states.selectedIndex].id;
  const stateId = selectedValue.split("_")[1];

  loadAllDistricts(stateId);
};

window.onload = loadAllStates;
