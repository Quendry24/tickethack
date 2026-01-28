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
        let remaining = '';
        for (let trajet of data) {
            const restDay = trajet.timeRemaining.days
            const restHours = trajet.timeRemaining.hours
            const restMin = trajet.timeRemaining.minutes
            let restTime = '';
            if (restDay <= 0) {
                restTime = `${restHours} heures, ${restMin} min`
            }
            else if (restDay <= 0 && restHours <= 0) {
                restTime = `${restMin} min`
            }
            else {
                restTime = `${restDay} jours, ${restHours} heures, ${restMin} min`
            }

            if (restDay < 0 || restHours < 0 || restMin < 0) {
                remaining = 'Trip expired';
            } else {
                remaining = `Departure in ${restTime}`
            }
            console.log(restTime)
            console.log(trajet)
            document.querySelector('#book').innerHTML += `
                   <div class="trajet id='${trajet['_id']}">
                            <p>${trajet.departure}>${trajet.arrival}</p>
                            <p>${trajet.hour}</p>
                            <p class='price'><strong>${trajet.price}€</strong></p>
                            <p id='restTime'>${remaining}</p>
                    </div>            
                         `
        }
        document.querySelector('#book').innerHTML += `<p id="enjoy">Enjoy your travel with Tickethack!</p>
        <button id="reset">Reset </button>`
    } else {
        document.querySelector('#book').innerHTML = `
            <p>No booking yet.</p>
            <p>Why not plan a trip?</p>`
    }
    reset()
})

function reset() {
    document.querySelector('#reset').addEventListener('click', function () {
        fetch('http://localhost:3000/voyages/deletefrombook', {
            method: 'POST'
        }).then(() => console.log('Every Bookings Deleted'))
        window.location.assign('booking.html')

    })
}