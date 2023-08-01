// Write your JavaScript code here!

window.addEventListener("load", function() {

    let form = document.querySelector('form[data-testid="testForm"');
    let list = document.getElementById("faultyItems");

    form.addEventListener('submit', (e) => {
        
        e.preventDefault(); //no submit
        
        let pilotValue = document.querySelector('input[name="pilotName"').value;
        let copilotValue = document.querySelector('input[name="copilotName"').value;
        let fuelLevelValue = document.querySelector('input[name="fuelLevel"').value;
        let cargoLevelValue = document.querySelector('input[name="cargoMass"').value;
        
        formSubmission(document, list, pilotValue, copilotValue, fuelLevelValue, cargoLevelValue);
        
    });


   let listedPlanets;
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
   }).then(function () {
       let chosenPlanet = pickPlanet(listedPlanets);
       //function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl)
       addDestinationInfo(document, chosenPlanet.name, chosenPlanet.diameter, chosenPlanet.star, chosenPlanet.distance, chosenPlanet.moons, chosenPlanet.image);
   });
   
});