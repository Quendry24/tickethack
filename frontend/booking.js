fetch('http://localhost:3000/voyagesAll').then(res => res.json()).then(data => {
    let tripsBooked = data.filter(el => el.isBooked === true)
    console.log(tripsBooked)
    if (data.length > 0) {
        document.querySelector('#book').innerHTML = `
                <p> My bookings</p>`
        for (let trajet of tripsBooked) {
            console.log(trajet)

            document.querySelector('#book').innerHTML += `
                   <div class="trajet id='${trajet['_id']}">
                            <p>${trajet.departure}>${trajet.arrival}</p>
                            <p>${trajet.hour}</p>
                            <p class='price'><strong>${trajet.price}€</strong></p>
                            <p>Departure in <span id='restTime'>5 hours</span></p>
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
