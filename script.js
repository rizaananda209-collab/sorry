/* =========================================================
   ELEMENT HTML
========================================================= */

const openBtn = document.getElementById("openBtn");
const againBtn = document.getElementById("againBtn");

const letter = document.getElementById("letter");
const typedText = document.getElementById("typedText");
const signature = document.getElementById("signature");

const particles = document.getElementById("particles");
const musicBtn = document.getElementById("musicBtn");


/* =========================================================
   PESAN SURAT
========================================================= */

const message = `Hai kamu...

Aku mungkin tidak selalu pandai mengatakan apa yang aku rasakan, jadi kali ini aku memilih menuliskannya.

Terima kasih sudah hadir dan menjadi bagian dari cerita kecil ini. Ada sesuatu tentang kehadiranmu yang membuat hari biasa terasa sedikit lebih hangat.

Aku tidak tahu apa yang akan terjadi setelah halaman ini selesai kamu baca. Aku juga tidak ingin terburu-buru menentukan apa pun.

Aku hanya ingin kamu tahu satu hal:

Aku senang bisa mengenalmu.

Semoga setiap kali kamu melihat halaman ini, kamu bisa tersenyum kecil dan mengingat bahwa ada seseorang yang berharap kamu selalu baik-baik saja. ❤️`;


/* =========================================================
   TYPING EFFECT
========================================================= */

let started = false;

function typeMessage() {

    if (started) return;

    started = true;

    typedText.classList.add("typing");
    typedText.textContent = "";

    let index = 0;

    function type() {

        if (index < message.length) {

            typedText.textContent += message[index];

            index++;

            setTimeout(type, 28);

        } else {

            typedText.classList.remove("typing");

            signature.classList.add("show");
        }
    }

    type();
}


/* =========================================================
   TOMBOL "OPEN MY LETTER"
========================================================= */

openBtn.addEventListener("click", () => {

    letter.scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(typeMessage, 650);
});


/* =========================================================
   TOMBOL "AGAIN"
========================================================= */

againBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    started = false;

    typedText.textContent = "";

    signature.classList.remove("show");
});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");
            }
        });

    },
    {
        threshold: 0.14
    }
);


document.querySelectorAll(".reveal").forEach((element) => {

    observer.observe(element);

});


/* =========================================================
   HATI MELAYANG
========================================================= */

function makeParticle() {

    const particle = document.createElement("span");

    particle.className = "particle";

    particle.textContent =
        Math.random() > 0.35 ? "♥" : "♡";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.fontSize =
        10 + Math.random() * 18 + "px";

    const duration =
        5 + Math.random() * 6;

    particle.style.animationDuration =
        duration + "s";

    particles.appendChild(particle);

    setTimeout(() => {

        particle.remove();

    }, duration * 1000);
}


setInterval(makeParticle, 650);


/* =========================================================
   EFEK HATI SAAT LAYAR DIKLIK
========================================================= */

document.addEventListener("click", (event) => {

    if (event.target.closest("button")) return;

    const heart = document.createElement("span");

    heart.textContent = "♥";

    heart.style.position = "fixed";

    heart.style.left =
        event.clientX + "px";

    heart.style.top =
        event.clientY + "px";

    heart.style.color = "#d75b7c";

    heart.style.fontSize = "20px";

    heart.style.pointerEvents = "none";

    heart.style.zIndex = "50";

    document.body.appendChild(heart);


    heart.animate(
        [
            {
                transform: "translateY(0) scale(1)",
                opacity: 1
            },
            {
                transform: "translateY(-75px) scale(1.6)",
                opacity: 0
            }
        ],
        {
            duration: 850,
            easing: "ease-out"
        }
    );


    setTimeout(() => {

        heart.remove();

    }, 850);
});


/* =========================================================
   MUSIK DARI FILE MP3
========================================================= */

/*
   Musik tidak lagi menggunakan Web Audio.

   Kamu cukup menaruh file lagu di folder yang sama
   dengan index.html.

   Contoh:

   index.html
   style.css
   script.js
   lagu.mp3

   Lalu di index.html harus ada:

   <audio id="bgMusic" loop>
       <source src="lagu.mp3" type="audio/mpeg">
   </audio>
*/


const bgMusic = document.getElementById("bgMusic");

let playing = false;


/* =========================================================
   TOMBOL MUSIK
========================================================= */

musicBtn.addEventListener("click", async () => {

    /* Jika musik sedang dimainkan */
    if (playing) {

        bgMusic.pause();

        playing = false;

        musicBtn.textContent = "♫";

        return;
    }


    /* Memainkan musik */
    try {

        await bgMusic.play();

        playing = true;

        musicBtn.textContent = "Ⅱ";

    } catch (error) {

        console.error(
            "Musik gagal diputar:",
            error
        );

        musicBtn.textContent = "♫";
    }
});


/* =========================================================
   KETIKA LAGU SELESAI
========================================================= */

bgMusic.addEventListener("ended", () => {

    playing = false;

    musicBtn.textContent = "♫";
});


/* =========================================================
   JIKA FILE LAGU TIDAK DITEMUKAN
========================================================= */

bgMusic.addEventListener("error", () => {

    playing = false;

    musicBtn.textContent = "♫";

    console.error(
        "File lagu tidak ditemukan. " +
        "Periksa nama file lagu di index.html."
    );
});