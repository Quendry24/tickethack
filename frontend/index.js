function count() {
    fetch('http://localhost:3000/voyages/allisCartedisTrue').then(res => res.json()).then(data => {
        data.length > 0 ? document.querySelector('#cart').textContent = `Cart (${data.length})` : document.querySelector('#cart').textContent = 'Cart'
    })
}
count()
function tripAddToCart() {
    const tripsToBook = document.querySelectorAll('.bookBtn')
    for (let trip of tripsToBook) {
        trip.addEventListener('click', function () {
            console.log(trip)
            const voyageId = this.id
            console.log('id', voyageId)
            fetch('http://localhost:3000/voyages/addtocart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ voyageId })
            }).then(res => res.json()).then(data => console.log('Trip add to cart'))
            if (!document.querySelector('#retour').checked) {
                window.location.assign('cart.html')
            }
        })

    }
}

document.querySelector('#searchBtn').addEventListener('click', function () {
    const departure = document.querySelector('#departureCity').value
    const arrival = document.querySelector('#arrivalCity').value
    let date = document.querySelector('#searchDate').value
    if (!document.querySelector('#retour').checked) {
        fetch(`http://localhost:3000/voyages?departure=${departure}&arrival=${arrival}&date=${date}`).then(res => res.json()).then(data => {
            console.log('aller')
            if (data.message === "Remplissez Departure, Arrival et Date !" || data.message === "Aucun voyage trouvé!") {
                document.querySelector('#returnCard').innerHTML = `
                <img src=".\images\train.png" alt="train" id="icon">
                    <p>It's time to book your future trip</p> 
                `
                document.querySelector('#icon').src = './images/notfound.png'
                document.querySelector('#returnCard>p').textContent = "No trip found"
            }
            else {
                document.querySelector('#returnCard').innerHTML = `<h3>${departure}>${arrival}</h3>`;
                for (let trajet of data) {
                    document.querySelector('#returnCard').innerHTML += `
                    <div class="trajet">
                        <p>${trajet.departure}>${trajet.arrival}</p>
                        <p>${trajet.hour}</p>
                        <p><strong>${trajet.price}€</strong></p>
                        <button class="bookBtn" id='${trajet['_id']}'>Book</button>
                    </div>            
                    `
                }
                document.querySelector('#departureCity').value = ''
                document.querySelector('#arrivalCity').value = ''
                tripAddToCart()
            }
        })
    }
    else {
        fetch(`http://localhost:3000/voyages?departure=${departure}&arrival=${arrival}&date=${date}`).then(res => res.json()).then(data => {
            console.log('aller')
            if (data.message === "Remplissez Departure, Arrival et Date !" || data.message === "Aucun voyage trouvé!") {
                document.querySelector('#returnCard').innerHTML = `
                <img src=".\images\train.png" alt="train" id="icon">
                    <p>It's time to book your future trip</p> 
                `
                document.querySelector('#icon').src = './images/notfound.png'
                document.querySelector('#returnCard>p').textContent = "No trip found"
            }
            else {
                document.querySelector('#returnCard').innerHTML = `<h3>${departure}>${arrival}</h3>`;
                for (let trajet of data) {
                    document.querySelector('#returnCard').innerHTML += `
                    <div class="trajet">
                        <p>${trajet.departure}>${trajet.arrival}</p>
                        <p>${trajet.hour}</p>
                        <p><strong>${trajet.price}€</strong></p>
                        <button class="bookBtn" id='${trajet['_id']}'>Book</button>
                    </div>            
                    `
                }
                document.querySelector('#departureCity').value = ''
                document.querySelector('#arrivalCity').value = ''
                tripAddToCart()
            }
            const tripsToBook = document.querySelectorAll('.bookBtn')
            for (let trip of tripsToBook) {
                trip.addEventListener('click', function () {
                    tripAddToCart()
                    fetch(`http://localhost:3000/voyages?departure=${arrival}&arrival=${departure}&date=${date}`).then(res => res.json()).then(data => {
                        if (data.message === "Remplissez Departure, Arrival et Date !" || data.message === "Aucun voyage trouvé!") {
                            document.querySelector('#returnCard').innerHTML = `
                    <img src=".\images\train.png" alt="train" id="icon">
                        <p>It's time to book your future trip</p> 
                    `
                            document.querySelector('#icon').src = './images/notfound.png'
                            document.querySelector('#returnCard>p').textContent = "No trip found"
                        }
                        else {
                            document.querySelector('#returnCard').innerHTML = `<h3>${arrival}>${departure}</h3>`;
                            for (let trajet of data) {
                                document.querySelector('#returnCard').innerHTML += `
                        <div class="trajet">
                            <p>${trajet.departure}>${trajet.arrival}</p>
                            <p>${trajet.hour}</p>
                            <p><strong>${trajet.price}€</strong></p>
                            <button class="bookBtn" id='${trajet['_id']}'>Book</button>
                        </div>            
                        `
                            }
                            document.querySelector('#departureCity').value = ''
                            document.querySelector('#arrivalCity').value = ''
                        }

                        document.querySelector('#retour').checked = false
                        tripAddToCart()
                    })
                })
            }
        }
        )
    }
})