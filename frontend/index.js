document.querySelector('#searchBtn').addEventListener('clikc', function () {
    const departure = document.querySelector('#departureCity').value
    const arrival = document.querySelector('#arrivalCity').value
    const date = document.querySelector('#searchDate').value
    console.log(departure, date, arrival)
    fetch('http://localhost:3000/voyages?departure=Paris&arrival=Lyon&date=2026-01-28')
})