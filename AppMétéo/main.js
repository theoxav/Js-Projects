let villeChoisie;

if("geolocation" in navigator) {
    navigator.geolocation.watchPosition((position) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=fr&appid=38109625ee75e7c0e12b70d38f091bfd&units=metric`; 
        fetch(url)
         .then((reponse) => {
             return reponse.json();
         })
         .then((data) => {
             console.log(data);
             let temperature = Math.trunc(data.main.temp);
             let temps = data.weather[0].description;
             let ville = data.name;
            
             let heureActuelle = new Date().getHours();
             let imgIcon = document.querySelector('img');
             document.querySelector('#temperature_label').textContent = temperature;
             document.querySelector('#ville').textContent = ville;
             document.querySelector('#temps').textContent = temps;
           
             imgIcon.src = `ressources/icon/${data.weather[0].icon}.svg`
   
         })
        
    })
} 
   

let changerDeVille = document.querySelector('#changer');
changerDeVille.addEventListener('click', () => {
  villeChoisie = prompt('Quelle ville souhaitez-vous voir ?');
  recevoirTemperature(villeChoisie);
});

async function recevoirTemperature(ville) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ ville +'&lang=fr&appid=38109625ee75e7c0e12b70d38f091bfd&units=metric';

  let requete = await fetch(url, {
    method: 'GET'
  }); 

  if(!requete.ok) {
    alert('Une erreur est survenue merci de revenir plus tard')
  } 
  else {
    let data = await requete.json();
    //console.log(data);
    let temperature = `${Math.trunc(data.main.temp)}`;
    let temps = data.weather[0].description;
    let ville       = data.name;
   
    let heureActuelle = new Date().getHours();
    let imgIcon = document.querySelector('img');

    document.querySelector('#temperature_label').textContent = temperature;
    document.querySelector('#ville').textContent = ville;
    document.querySelector('#temps').textContent = temps;

    imgIcon.src = `ressources/icon/${data.weather[0].icon}.svg`
   


  }


}