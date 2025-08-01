// 🎵 Mula page selepas klik "Play Universe"
window.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const landing = document.getElementById("landing");
  const startBtn = document.getElementById("start-btn");
  const universe = document.querySelector(".universe");
    // 💌 Bila klik "Next", tunjuk surat cinta
  const nextBtn = document.getElementById("next-btn");
  const letter = document.getElementById("love-letter");

  nextBtn.addEventListener("click", () => {
    letter.classList.add("show");

    // Optional: scroll ke atas surat
    letter.scrollTop = 0;
  });

  startBtn.addEventListener("click", () => {
    music.play().catch(err => console.log("Autoplay Blocked:", err));

    landing.classList.add("fade-out");

    setTimeout(() => {
      landing.style.display = "none";
      universe.classList.add("show");
      universe.classList.remove("hidden");

      // Tunjuk butang Next
      document.getElementById("next-btn").classList.add("show");
    }, 1000);
  });

  // 🌌 Buat gambar terapung
  createFloatingImages();

  // 🌠 Mula shooting star animation
  startShootingStars();
});

// 💫 Data caption sweet
const captions = [
  "saye suka syng tau 💖", "happy selalu tauu syng", "lup uu syng",
  "My sunshine ☀️", "nak aeishaa tknk orng laen", "Muehehehe ⭐",
  "saye syng awak", "Forever you", "Kawen jomm 💍", "Comel la syng nii hehe",
  "Love you more", "pendek takpe saye sukaa", "aeishaa cantekk",
  "My love", "masehhh hadir dlm hidup saye ❤️", "si maniesss hehe",
  "Always mine ❤️", "jngan tinggalkan saye 🥹", "Cinta hati saye", "first gmbar syng ❤️"
];

// 📦 Buat semua gambar terapung dengan caption
function createFloatingImages() {
  const starsContainer = document.querySelector(".stars");

  for (let i = 1; i <= 20; i++) {
    const wrapper = document.createElement("div");
    wrapper.className = "star-wrapper";
    wrapper.style.top = Math.random() * 90 + "vh";
    wrapper.style.left = Math.random() * 90 + "vw";
    wrapper.style.animationDuration = (Math.random() * 10 + 5) + "s";

    const img = document.createElement("img");
    img.src = `img${i}.jpg`;

    const caption = document.createElement("div");
    caption.className = "caption";
    caption.textContent = captions[i - 1];

    wrapper.appendChild(img);
    wrapper.appendChild(caption);
    starsContainer.appendChild(wrapper);

    img.addEventListener("click", () => focusImage(wrapper));
  }
}

// 🔍 Fokuskan 1 gambar bila diklik
function focusImage(clickedWrapper) {
  document.querySelectorAll(".star-wrapper").forEach(wrap => {
    wrap.classList.add("blur");
    wrap.classList.remove("focused");
  });

  clickedWrapper.classList.remove("blur");
  clickedWrapper.classList.add("focused");

  clickedWrapper.style.position = "fixed";
  clickedWrapper.style.top = "50%";
  clickedWrapper.style.left = "50%";
  clickedWrapper.style.transform = "translate(-50%, -50%) scale(1.8)";
  clickedWrapper.style.zIndex = "999";

  document.querySelector(".title").classList.add("hidden");

  // ❌ Buka balik gambar bila klik luar
  document.body.addEventListener("click", function cancel(e) {
    if (!clickedWrapper.contains(e.target)) {
      clickedWrapper.classList.remove("focused");

      document.querySelectorAll(".star-wrapper").forEach(wrap => {
        wrap.classList.remove("blur");

        const top = Math.random() * 80 + 10;
        const left = Math.random() * 80 + 10;

        wrap.style.top = `${top}vh`;
        wrap.style.left = `${left}vw`;
        wrap.style.position = "absolute";
        wrap.style.transform = "";
        wrap.style.zIndex = "";
      });

      document.querySelector(".title").classList.remove("hidden");
      document.body.removeEventListener("click", cancel);
    }
  });
}

// 🌠 Shooting star canvas
function startShootingStars() {
  const canvas = document.getElementById("shooting-stars");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = [];
  function Star() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.len = Math.random() * 80 + 10;
    this.speed = Math.random() * 5 + 2;
  }
  Star.prototype.draw = function () {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.len, this.y + this.len);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.stroke();
  };
  Star.prototype.update = function () {
    this.x += this.speed;
    this.y += this.speed;
    if (this.x > canvas.width || this.y > canvas.height) {
      this.x = Math.random() * canvas.width;
      this.y = 0;
    }
  };

  for (let i = 0; i < 30; i++) stars.push(new Star());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.update();
      s.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}
