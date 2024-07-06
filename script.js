
const menubar = document.querySelector(".fa-bars");
const  hidemenu = document.querySelector(".fa-xmark");
const showmenu = document.querySelector(".sidemenu");

document.addEventListener("DOMContentLoaded", function() {
  menubar.addEventListener("click", () =>{
    showmenu.style.right = "0";
  })

  hidemenu.addEventListener("click", () =>{
    showmenu.style.right = "-250px";
  })
});
