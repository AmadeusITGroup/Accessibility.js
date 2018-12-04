function alertbox() {
    alert("You are at home page!");
}

var modal = document.getElementById('myModal');
var btn = document.getElementById("charts");
var span = document.getElementsByClassName("close")[0];
btn.on("click", function() {
    modal.style.display = "block";
});

span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

jQuery(".modal").on('keydown',function(e) {
    if (e.keyCode == 27) {
        jQuery("#myModal").toggle();
    }
});

