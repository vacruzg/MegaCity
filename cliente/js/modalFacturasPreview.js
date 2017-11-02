// JavaScript Document
function setModal(){
// Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
$('#myImg').click(function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
});

// When the user clicks on <span> (x), close the modal
$('close').click(function() { 
  modal.style.display = "none";
});
}