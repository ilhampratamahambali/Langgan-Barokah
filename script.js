// GANTI NOMOR WHATSAPP ADMIN DI SINI (Format: 628xxx)
const NOMOR_WA_ADMIN = "6281234567890";

const getFallbackImg = (teks) =>
  `https://placehold.co/600x800/fdf2f5/541626?text=${encodeURIComponent(teks)}`;

// 1. DATA PAKET SEMBAKO A, B, DAN C menggunakan aset yang tersedia di folder Img/
const paketSembako = [
  {
    id: "PKT-A",
    nama: "Paket Sembako SUPER Rp. 7.500 Sehari/300 Hari",
    img: "Img/Super.png",
    isi: [
    "Tersedia Paket Sembako Super A, B, C, D, dan E untuk kebutuhan Lebaran dan Hari Raya",
    ]
  },
  {
    id: "PKT-B",
    nama: "Paket Sembako Rp. 5.000 Sehari/300 Hari",
    img: "Img/Sembako_5000.png",
    isi: [
      "Tersedia Paket Sembako A, B, C, D, E, dan G untuk kebutuhan Lebaran dan Hari Raya"
    ]
  },
  {
    id: "PKT-C",
    nama: "Paket Anak Rp. 3.000 Sehari/300 Hari",
    img: "Img/Anak_3000.png",
    isi: [
      "Tersedia Paket Sembako Anak A, B, C, dan D untuk kebutuhan Lebaran dan Hari Raya"
    ]
  },
    {
    id: "PKT-D",
    nama: "Paket Anak Rp. 2.000 Sehari/300 Hari",
    img: "Img/Anak_2000.png",
    isi: [
      "Tersedia Paket Sembako Anak A, B, dan Cuntuk kebutuhan Lebaran dan Hari Raya"
    ]
  }
];

// 2. DAFTAR GAMBAR KATALOG SATUAN menggunakan aset yang tersedia di folder Img/
const gambarBrosurSatuan = [
  {
    judul: "Brosur Satuan — Halaman 1",
    keterangan: "",
    img: "Img/satuan1.png"
  },
  {
    judul: "Brosur Satuan — Halaman 2",
    keterangan: "",
    img: "Img/satuan2.png"
  },
  {
    judul: "Brosur Satuan — Halaman 3",
    keterangan: "",
    img: "Img/satuan3.png"
  }
];

// Toggle Menu Mobile Navbar
function initNavbar() {
  const toggleBtn = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  toggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => navMenu.classList.remove("open"));
  });

  const sections = document.querySelectorAll("main section[id], section[id].about-section, section[id].services-section");
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  const updateActiveLink = () => {
    const current = [...sections].reverse().find((section) => window.scrollY >= section.offsetTop - 150);
    navLinks.forEach((link) => link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`));
  };
  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();
}

function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal-up, .reveal-scale");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach((element) => observer.observe(element));
}

// Render Paket Sembako A, B, C
function renderPaket() {
  const listPaketEl = document.getElementById("list-paket");
  listPaketEl.innerHTML = paketSembako.map((p) => {
    const fallback = getFallbackImg(p.nama);
    return `
      <div class="paket-card reveal-scale">
        <div class="paket-img-wrap" onclick="bukaModal('${p.img}', '${p.nama}', 'Klik Kontak Kami untuk informasi lengkap', '${fallback}')">
          <img src="${p.img}" alt="${p.nama}" onerror="this.onerror=null;this.src='${fallback}';" />
        </div>
        <div class="paket-body">
          <div>
            <h3>${p.nama}</h3>
            <ul>
              ${p.isi.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Render Galeri Gambar Brosur Satuan
function renderGaleriBrosur() {
  const galeriEl = document.getElementById("galeri-brosur");
  galeriEl.innerHTML = gambarBrosurSatuan.map((b) => {
    const fallback = getFallbackImg(b.judul);
    return `
      <div class="brosur-card reveal-scale" onclick="bukaModal('${b.img}', '${b.judul}', '${b.keterangan}', '${fallback}')">
        <img src="${b.img}" alt="${b.judul}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}';" />
        <div class="brosur-caption">
          <h4>${b.judul}</h4>
          <span>Klik untuk perbesar gambar</span>
        </div>
      </div>
    `;
  }).join("");
}

// Modal Lightbox Gambar
function bukaModal(src, title, desc, fallback) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  modalImg.onerror = () => { modalImg.src = fallback; };
  modalImg.src = src;
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-price").innerText = desc;
  modal.classList.add("active");
  document.body.classList.add("modal-open");
}

function tutupModal() {
  document.getElementById("image-modal").classList.remove("active");
  document.body.classList.remove("modal-open");
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") tutupModal();
});

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  renderPaket();
  renderGaleriBrosur();
  initRevealAnimations();
});
