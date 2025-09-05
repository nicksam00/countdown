document.addEventListener("DOMContentLoaded", function() {
  const timerEl = document.getElementById("timer");
  const birthdayEl = document.getElementById("birthday");
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  let fireworks = [];

  // Responsive canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Countdown Logic
  const endDate = new Date("Sep 5, 2025 11:17:00").getTime();
  function updateTimer() {
    const now = new Date().getTime();
    const diff = endDate - now;
    if (diff <= 0) {
      timerEl.style.display = "none";
      birthdayEl.classList.remove("hidden");
      startFireworks();
      clearInterval(x);
      return;
    }
    const hours = Math.floor((diff % (1000*60*60*24))/(1000*60*60));
    const minutes = Math.floor((diff % (1000*60*60))/(1000*60));
    const seconds = Math.floor((diff % (1000*60))/1000);
    if (diff <= 60000) {
      timerEl.className = "timer last-minute";
      timerEl.innerHTML = seconds + "s";
    } else {
      const days = Math.floor(diff/(1000*60*60*24));
      timerEl.className = "timer";
      timerEl.innerHTML = 
        (days*24 + hours).toString().padStart(2,'0') + ":" +
        minutes.toString().padStart(2,'0') + ":" +
        seconds.toString().padStart(2,'0');
    }
  }
  let x = setInterval(updateTimer,1000);
  updateTimer();

  // Link button
  window.openLink = function() {
    window.location.href = "https://your-link.com"; // <-- Change this to your desired link
  }

  // Fireworks Animation
  function Firework(x,y) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.color = `hsl(${Math.random()*360},100%,50%)`;
    this.vx = (Math.random()-0.5)*6;
    this.vy = (Math.random()-0.5)*6;
    this.alpha = 1;
    this.update = function(){
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 0.01;
    }
    this.draw = function(){
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
  function startFireworks(){
    function animate(){
      requestAnimationFrame(animate);
      ctx.clearRect(0,0,canvas.width,canvas.height);
      if (Math.random() < 0.05) {
        let x = Math.random()*canvas.width;
        let y = Math.random()*canvas.height/2;
        for (let i=0;i<100;i++) fireworks.push(new Firework(x,y));
      }
      fireworks.forEach((fw,i)=>{
        fw.update();
        fw.draw();
        if (fw.alpha <= 0) fireworks.splice(i,1);
      });
    }
    animate();
  }
});
