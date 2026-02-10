const checkboxes = document.querySelectorAll("input[type='checkbox']");

checkboxes.forEach(cb => {
  cb.addEventListener("change", () => {
    if(cb.checked){
      for(let i=0;i<4;i++) spawnHeart();
    }
  });
});

// Herzchen wiederverwenden 🫶
function spawnHeart(){
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = ["💗","💖","💘","💕"][Math.floor(Math.random()*4)];

  heart.style.left = Math.random()*window.innerWidth + "px";
  heart.style.bottom = "-20px";

  document.body.appendChild(heart);
  setTimeout(()=>heart.remove(), 4000);
}
