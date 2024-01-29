let cards = document.querySelectorAll(".card");

cards.forEach(function(e){
    const link = e.querySelector(".hiddenLink").href
    e.addEventListener("click", function(e){
        window.location.href = link;
    });
});
