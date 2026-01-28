function deleteFromCart() {
    const panier = document.querySelectorAll('.delBtn')
    for (trajet of panier) {
        console.log('trajet', trajet)
        trajet.addEventListener('click', function () {
            const voyageId = this.id
            console.log('id', voyageId)
            fetch('http://localhost:3000/voyages/deletefromcart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ voyageId })
            }).then(res => res.json()).then(data => console.log('Trip deleted from cart'))
            window.location.assign('cart.html')
        })
    }
}

fetch('http://localhost:3000/voyages/allisCartedisTrue').then(res => res.json()).then(data => {
    data.length > 0 ? document.querySelector('#cart').textContent = `Cart (${data.length})` : document.querySelector('#cart').textContent = 'Cart'
    let totalPrice = 0;
    for (let trajet of data) {
        console.log(trajet)
        document.querySelector('#bodyCart').innerHTML += `
               <div class="trajet id='${trajet['_id']}">
                        <p>${trajet.departure}>${trajet.arrival}</p>
                        <p>${trajet.hour}</p>
                        <p class='price'><strong>${trajet.price}€</strong></p>
                        <button class="delBtn" id='${trajet['_id']}'>X</button>
                    </div>            
                     `
        totalPrice += trajet.price
    }
    document.querySelector('#total').textContent = totalPrice
    deleteFromCart()
})

document.querySelector('#purchaseBtn').addEventListener('click', function () {
    const tripToPurchase = document.querySelectorAll('.trajet')
    for (let trip of tripToPurchase) {
        const voyageId = trajet.id
        console.log('id', voyageId)
        console.log('trip', trip)
        fetch('http://localhost:3000/voyages/addtobook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ voyageId })
        }).then(res => res.json()).then(data => {
            console.log(`Trip ${trip.id} booked`)
        })
    }
    window.location.assign('cart.html')
})
