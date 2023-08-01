// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById('missionTarget');
    // Here is the HTML formatting for our mission target div.
    missionTarget.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">`
}

function validateInput(testInput) {
    if (/^\s*$/.test(testInput)) return "Empty";
    else if (isNaN(testInput)) return "Not a Number";
    else if (!isNaN(testInput)) return "Is a Number";
};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    //list items
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let header = document.getElementById('launchStatus');

    //default values
    pilotStatus.innerHTML = 'Pilot not ready.'
    copilotStatus.innerHTML = 'Copilot not ready.'
    fuelStatus.innerHTML = 'Fuel level high enough for launch';
    cargoStatus.innerHTML = 'Cargo mass low enough for launch';
    list.style.visibility = 'hidden';
    header.innerHTML = 'Awaiting Information Before Launch'
    header.style = ''

    let evaluate = {
        pilotName: validateInput(pilot),
        copilotName: validateInput(copilot),
        fuelLevel: validateInput(fuelLevel),
        cargoMass: validateInput(cargoLevel)
    };

    //validation arrays
    let empty = [];
    let notNumber = [];
    let isNumber = [];

    Object.entries(evaluate).forEach(([key, value]) => {
        if (value === "Empty") { empty.push(key); }
        else if ((value === "Not a Number" && key !== "pilotName") && (value === "Not a Number" && key !== "copilotName")) { notNumber.push(key); }
        else if ((value === "Is a Number" && key !== "fuelLevel") && (value === "Is a Number" && key !== "cargoMass")) { isNumber.push(key); };
    });

    if (empty.length > 0) {
        alert(`Fields can not be left empty: ${empty.join(', ')}`);
        // return;
    } else if (isNumber.length > 0) {
        alert(`Expected a string in field(s): ${isNumber.join(', ')}`);
        // return;
    } else if (notNumber.length > 0) {
        alert(`Expected a number in field(s): ${notNumber.join(', ')}`);
        // return;
    } else {

        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`

        if (fuelLevel < 10000) {
            header.innerHTML = 'Shuttle Not Ready for Launch';
            fuelStatus.innerHTML = `Fuel level too low for launch`;
            header.style.color = '#C7254E';
            list.style.visibility = "visible";
        }
        if (cargoLevel > 10000) {
            header.innerHTML = 'Shuttle Not Ready for Launch';
            cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
            header.style.color = "rgb(199, 37, 78)";
            list.style.visibility = "visible";
        }
        if (fuelLevel >= 10000 && cargoLevel <= 10000) {
            header.style.color = "rgb(65, 159, 106)";
            header.innerHTML = 'Shuttle is Ready for Launch';
            list.style.visibility = "visible";
        }
    }

};

async function myFetch() {
    let planetsReturned;
    //don't hardcode values like this..
    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then(function (response) {
        return response;
    });

    return planetsReturned.json();
}

function pickPlanet(planets) {
    let planet;
    planet = planets[Math.floor(Math.random() * planets.length)];
    return planet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
