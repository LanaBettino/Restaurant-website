<script>
document.getElementById("searchInput")
.addEventListener("keyup", function(){

    let value = this.value.toLowerCase();

    let items =
    document.querySelectorAll(".food-item");

    items.forEach(item => {

        let text =
        item.innerText.toLowerCase();

        if(text.includes(value)){
            item.style.display = "block";
        }
        else{
            item.style.display = "none";
        }

    });
});
</script>
