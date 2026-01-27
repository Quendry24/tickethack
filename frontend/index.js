document.querySelector('#searchBtn').addEventListener('click', function () {
    const departure = document.querySelector('#departureCity').value
    const arrival = document.querySelector('#arrivalCity').value
    let date = document.querySelector('#searchDate').value
    fetch(`http://localhost:3000/voyages?departure=${departure}&arrival=${arrival}&date=${date}`).then(res => res.json()).then(data => {
        if (data.message === "Remplissez Departure, Arrival et Date !") {
            document.querySelector('#returnCard').innerHTML = `
            <img src=".\images\train.png" alt="train" id="icon">
                <p>It's time to book your future trip</p> 
            `
            document.querySelector('#icon').src = './images/notfound.png'
            document.querySelector('#returnCard>p').textContent = "No trip found"
        }
        else {
            document.querySelector('#returnCard').innerHTML = "";
            for (let trajet of data) {

                document.querySelector('#returnCard').innerHTML += `
                <div class="trajet">
                    <p>${trajet.departure}>${trajet.arrival}</p>
                    <p>${trajet.hour}</p>
                    <p><strong>${trajet.price}€</strong></p>
                    <button class="bookBtn">Book</button>
                </div>            
                `
            }
            document.querySelector('#departureCity').value = ''
            document.querySelector('#arrivalCity').value = ''
        }
    })

})
