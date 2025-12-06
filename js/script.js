// script.js

// ===== 1. SETUP AWAL =====
console.log("Selamat datang di Console Kopi Linty!");

// ===== 2. TUGAS PERCABANGAN (Cek Kategori Usia) =====
function cekKategori() {
  const usiaInput = document.getElementById("usiaInput").value;
  const hasil = document.getElementById("hasilUsia");

  if (usiaInput === "") {
    hasil.textContent = "Silakan masukkan usia terlebih dahulu.";
    return;
  }

  const usia = parseInt(usiaInput);
  let kategori = "";

  if (usia < 13) {
    kategori = "Anak-anak";
  } else if (usia >= 13 && usia <= 17) {
    kategori = "Remaja";
  } else if (usia >= 18 && usia <= 60) {
    kategori = "Dewasa";
  } else if (usia > 60) {
    kategori = "Lansia";
  } else {
    kategori = "Usia tidak valid";
  }

  hasil.textContent = `Kategori: ${kategori}`;
}

// ===== 3. TUGAS PERULANGAN (Testimoni) =====
const testimoni = [
  "Kopinya mantap, bikin melek!",
  "Pelayanan cepat dan ramah.",
  "Suka banget sama snack-nya.",
  "Tempat nongkrong asik.",
];

const daftarTestimoni = document.getElementById("daftarTestimoni");
if (daftarTestimoni) {
  testimoni.forEach((pesan) => {
    daftarTestimoni.innerHTML += `<p>⭐ ${pesan}</p>`;
  });
}

// ===== 4. TUGAS FUNGSI (Hitung Belanja) =====
function hitungTotal(harga, jumlah) {
  return harga * jumlah;
}

function prosesBelanja(event) {
  // Mencegah reload jika tombol berada dalam form
  event.preventDefault();

  const harga = parseFloat(document.getElementById("harga").value) || 0;
  const jumlah = parseInt(document.getElementById("jumlah").value) || 0;
  const total = hitungTotal(harga, jumlah);

  document.getElementById(
    "totalBelanja"
  ).textContent = `Total Belanja: Rp ${total.toLocaleString("id-ID")}`;
}

// ===== 5. VALIDASI FORM KONTAK (BAGIAN UTAMA) =====
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("kontakForm");

  // Ambil elemen input
  const nama = document.getElementById("nama");
  const email = document.getElementById("email");
  const hp = document.getElementById("hp");
  const pesan = document.getElementById("pesan");

  // Ambil elemen pesan error
  const errorNama = document.getElementById("errorNama");
  const errorEmail = document.getElementById("errorEmail");
  const errorHp = document.getElementById("errorHp");
  const errorPesan = document.getElementById("errorPesan");
  const feedback = document.getElementById("feedback");

  // Fungsi reset pesan error
  function resetErrors() {
    errorNama.textContent = "";
    errorEmail.textContent = "";
    errorHp.textContent = "";
    errorPesan.textContent = "";
    feedback.textContent = "";
    feedback.className = "";
  }

  // Event Listener saat Form di-Submit
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah form kirim data ke server dulu
    resetErrors(); // Hapus error lama

    let valid = true;

    // Validasi Nama (Tidak boleh kosong)
    if (nama.value.trim() === "") {
      errorNama.textContent = "Nama wajib diisi!";
      valid = false;
    }

    // Validasi Email (Regex sederhana)
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email.value)) {
      errorEmail.textContent = "Format email tidak valid (contoh: a@b.com)";
      valid = false;
    }

    // Validasi HP (Hanya angka & minimal digit)
    const hpPattern = /^[0-9]+$/;
    if (!hpPattern.test(hp.value)) {
      errorHp.textContent = "Nomor HP hanya boleh angka!";
      valid = false;
    }

    // Validasi Pesan (Minimal 10 karakter)
    if (pesan.value.trim().length < 10) {
      errorPesan.textContent = "Pesan terlalu pendek (minimal 10 karakter).";
      valid = false;
    }

    // Cek Hasil Akhir
    if (valid) {
      feedback.textContent = "Pesan berhasil dikirim! Terima kasih.";
      feedback.className = "feedback-success";
      // form.reset(); // Bersihkan form jika sukses
    } else {
      feedback.textContent = "Harap perbaiki kesalahan di atas.";
      feedback.className = "feedback-error";
    }

    const checkTopik = () => {
      if (topik.value === "") {
        return setError(topik, null);
      } else {
        return setSuccess(topik);
      }
    };

    const checkSyarat = () => {
      const errorSyarat = document.getElementById("errorSyarat");
      if (!syarat.checked) {
        errorSyarat.classList.add("show-error");
        return false;
      } else {
        errorSyarat.classList.remove("show-error");
        return true;
      }
    };
  });

  // Tombol Clear Data
  document.getElementById("clearBTN").addEventListener("click", function () {
    form.reset();
    resetErrors();
    feedback.textContent = "Form telah dibersihkan.";
    feedback.className = "feedback-success";
  });

  const setError = (element, messageElement, message = null) => {
    const small =
      element.parentElement.querySelector(".error-message") || messageElement;
    if (message) small.innerText = message;

    element.classList.add("input-error");
    element.classList.remove("input-success");
    small.classList.add("show-error");
    return false; // Mengembalikan false untuk status validasi
  };

  const setSuccess = (element, messageElement) => {
    const small =
      element.parentElement.querySelector(".error-message") || messageElement;

    element.classList.add("input-success");
    element.classList.remove("input-error");
    small.classList.remove("show-error");
    return true; // Mengembalikan true untuk status validasi
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah form kirim data ke server dulu

    // Validasi setiap field
    const isNamaValid = checkNama();
    const isEmailValid = checkEmail();
    const isHpValid = checkHp();
    const isTopikValid = checkTopik();
    const isSyaratValid = checkSyarat();
    // Cek Hasil Akhir
    if (
      isNamaValid &&
      isEmailValid &&
      isHpValid &&
      isTopikValid &&
      isSyaratValid
    ) {
      feedback.textContent = "pesan berhasil dikirim! Terima Kasih.";
      feedback.className = "feeback-success";
      // form.reset(); // Bersihkan form jika sukses
    }
  });
});


// --- BAGIAN B: FORM WEBINAR (Tugas Baru) ---
// Kita pisahkan variabelnya agar style coding tetap rapi tapi tidak bentrok
const webinarForm = document.getElementById("form-webinar");

if (webinarForm) {
  // 1. Ambil Elemen Input (Sesuai ID di HTML barumu)
  const namaWebinar = document.getElementById("namaWebinar");
  const emailWebinar = document.getElementById("emailWebinar");
  const hpWebinar = document.getElementById("noHpWebinar");
  const topikWebinar = document.getElementById("TopikWebinar");
  const syaratWebinar = document.getElementById("syaratWebinar"); // checkbox

  // 2. Ambil Elemen Error Text (Sesuai ID di HTML barumu)
  const errorNamaWeb = document.getElementById("errorNamaWebinar");
  const errorEmailWeb = document.getElementById("errorEmailWebinar");
  const errorHpWeb = document.getElementById("errorNoHpWebinar");
  // Untuk topik & syarat kita pakai querySelector karena di HTML kamu pakai class 'error-message'
  const errorSyaratWeb = document.getElementById("errorSyarat");

  // 3. Fungsi Helper Style Error (Sesuai style kamu: ubah text & border)
  const showWebinarError = (input, errorElement, msg) => {
    input.style.borderColor = "red"; // Merah
    if (errorElement) {
      errorElement.textContent = msg;
      errorElement.style.color = "red";
      errorElement.style.display = "block";
    }
    return false;
  };

  const showWebinarSuccess = (input, errorElement) => {
    input.style.borderColor = "green"; // Hijau
    if (errorElement) {
      errorElement.textContent = ""; // Kosongkan pesan error
      errorElement.style.display = "none";
    }
    return true;
  };

  // 4. Fungsi Validasi Per Item (Real-time)
  const checkNamaWebinar = () => {
    if (namaWebinar.value.trim().length < 3) {
      return showWebinarError(
        namaWebinar,
        errorNamaWeb,
        "Nama minimal 3 karakter"
      );
    } else {
      return showWebinarSuccess(namaWebinar, errorNamaWeb);
    }
  };

  const checkEmailWebinar = () => {
    const val = emailWebinar.value.trim();
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (val === "") {
      return showWebinarError(emailWebinar, errorEmailWeb, "Email wajib diisi");
    } else if (!pattern.test(val)) {
      return showWebinarError(
        emailWebinar,
        errorEmailWeb,
        "Format email salah"
      );
    } else if (val.toLowerCase().endsWith("yahoo.com")) {
      // Validasi Khusus Yahoo
      return showWebinarError(
        emailWebinar,
        errorEmailWeb,
        "Domain yahoo.com tidak diizinkan"
      );
    } else {
      return showWebinarSuccess(emailWebinar, errorEmailWeb);
    }
  };

  const checkHpWebinar = () => {
    const val = hpWebinar.value.trim();
    const numberPattern = /^[0-9]+$/;

    if (val === "") {
      return showWebinarError(hpWebinar, errorHpWeb, "No HP wajib diisi");
    } else if (!numberPattern.test(val)) {
      return showWebinarError(
        hpWebinar,
        errorHpWeb,
        "Hanya angka yang diperbolehkan"
      );
    } else {
      return showWebinarSuccess(hpWebinar, errorHpWeb);
    }
  };

  const checkTopikWebinar = () => {
    // Mencari elemen pesan error terdekat untuk dropdown
    const smallError = topikWebinar.nextElementSibling;
    if (topikWebinar.value === "") {
      if (smallError) smallError.style.display = "block";
      topikWebinar.style.borderColor = "red";
      return false;
    } else {
      if (smallError) smallError.style.display = "none";
      topikWebinar.style.borderColor = "green";
      return true;
    }
  };

  const checkSyaratWebinar = () => {
    if (!syaratWebinar.checked) {
      errorSyaratWeb.style.display = "block";
      errorSyaratWeb.style.color = "red";
      return false;
    } else {
      errorSyaratWeb.style.display = "none";
      return true;
    }
  };

  // 5. Event Listeners (Agar validasi jalan saat ngetik/pilih)
  namaWebinar.addEventListener("input", checkNamaWebinar); // input = saat mengetik
  namaWebinar.addEventListener("blur", checkNamaWebinar); // blur = saat keluar kolom

  emailWebinar.addEventListener("input", checkEmailWebinar);
  emailWebinar.addEventListener("blur", checkEmailWebinar);

  hpWebinar.addEventListener("input", checkHpWebinar);
  hpWebinar.addEventListener("blur", checkHpWebinar);

  topikWebinar.addEventListener("change", checkTopikWebinar);
  syaratWebinar.addEventListener("change", checkSyaratWebinar);

  // 6. Event Listener Submit (Cek semuanya saat tombol ditekan)
  webinarForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const isNamaValid = checkNamaWebinar();
    const isEmailValid = checkEmailWebinar();
    const isHpValid = checkHpWebinar();
    const isTopikValid = checkTopikWebinar();
    const isSyaratValid = checkSyaratWebinar();

    if (
      isNamaValid &&
      isEmailValid &&
      isHpValid &&
      isTopikValid &&
      isSyaratValid
    ) {
      alert("Pendaftaran Webinar Berhasil! Data siap dikirim.");
      webinarForm.reset();
      // Reset warna border kembali ke normal
      [namaWebinar, emailWebinar, hpWebinar, topikWebinar].forEach(
        (el) => (el.style.borderColor = "#ccc")
      );
    }
  });
}
