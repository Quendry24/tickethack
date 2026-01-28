fetch('http://localhost:3000/voyages/allisCartedisTrue').then(res => res.json()).then(data => {
    data.length > 0 ? document.querySelector('#cart').textContent = `Cart (${data.length})` : document.querySelector('#cart').textContent = 'Cart'
})

fetch('http://localhost:3000/voyages/allisBookedisTrue').then(res => res.json()).then(data => {
    // let tripsBooked = data.filter(el => el.isBooked === true)
    // console.log(tripsBooked)
    console.log(data)
    if (data.length > 0) {
        document.querySelector('#book').innerHTML = `
                <p> My bookings</p>`
        for (let trajet of data) {
            const restDay = trajet.timeRemaining.days
            const restHours = trajet.timeRemaining.hours
            const restMin = trajet.timeRemaining.minutes
            const restTime = `${restDay} jours, ${restHours} heures, ${restMin} min`
            let remaining = '';
            if (restDay < 0 || restHours < 0 || restMin < 0) {
                remaining = 'trop tard mon gars';
            } else {
                remaining = `Departure dans ${restTime}`
            }
            console.log(restTime)
            console.log(trajet)
            document.querySelector('#book').innerHTML += `
                   <div class="trajet id='${trajet['_id']}">
                            <p>${trajet.departure}>${trajet.arrival}</p>
                            <p>${trajet.hour}</p>
                            <p class='price'><strong>${trajet.price}€</strong></p>
                            <p>${remaining}</p>
                    </div>            
                         `
        }
        document.querySelector('#book').innerHTML += `<p id="enjoy">Enjoy your travel with Tickethack!</p>`
    } else {
        document.querySelector('#book').innerHTML = `
            <p>No booking yet.</p>
            <p>Why not plan a trip?</p>`
    }
})
