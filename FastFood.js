function sendOrder() {

    let name =
    document.getElementById("name").value;

    let phone =
    document.getElementById("phone").value;

    let food =
    document.getElementById("food").value;

    let address =
    document.getElementById("address").value;

    let message =
    "🍔 NEW ORDER%0A" +
    "Name: " + name + "%0A" +
    "Phone: " + phone + "%0A" +
    "Food: " + food + "%0A" +
    "Address: " + address;

    let ownerNumber = "0714767516";

    window.open(
        "https://wa.me/" +
        ownerNumber +
        "?text=" +
        message,
        "_blank"
    );
}

function calculateTotal(){

    let qty =
    parseInt(
    document.getElementById("qty").value);

    let total = qty * 99;

    document.getElementById("billOutput")
    .innerHTML =
    "Total Amount: R" + total;
}

document.getElementById("contactForm")
.addEventListener("submit",
function(event){

    event.preventDefault();

    document.getElementById("result")
    .innerHTML =
    "Thank you for contacting us!";

	const heroImages = [

"burger.WEBP",
"pizza.jpg",
"chicken.WEBP"

];

let current = 0;

setInterval(function(){

current++;

if(current >= heroImages.length){

current = 0;

}

document.querySelector(".hero")
.style.backgroundImage =

"linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('" +
heroImages[current] +
"')";

},3000);

});
