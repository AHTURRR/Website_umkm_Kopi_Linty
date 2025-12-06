// js/galeri.js

export const inisialisasiGaleri = () => {
    const gambarProduk = document.querySelectorAll('.img-produk');

    if (gambarProduk.length === 0) {
        console.error("Tidak ada gambar dengan class .img-produk ditemukan!");
        return;
    }

    gambarProduk.forEach(img => {
        // 1. Simpan teks asli SEBELUM ada interaksi apapun.
        // Kita simpan di variabel agar bisa dipanggil kembali nanti.
        const elemenTeks = img.nextElementSibling;
        const teksAsli = elemenTeks ? elemenTeks.textContent : "";

        // --- Fitur Hover (Tetap sama) ---
        img.addEventListener('mouseenter', ({ target }) => {
            target.classList.add('sorot');
        });

        img.addEventListener('mouseleave', ({ target }) => {
            target.classList.remove('sorot');
        });

        // --- Fitur Klik (LOGIKA TOGGLE) ---
        img.addEventListener('click', (event) => {
            const target = event.target;
            
            // Cek apakah elemen teks ada?
            if (elemenTeks) {
                
                // LOGIKA SAKELAR (TOGGLE)
                // Kita cek: Apakah gambar ini punya class 'active'?
                
                if (target.classList.contains('active')) {
                    // KONDISI: SUDAH AKTIF -> MAU DIKEMBALIKAN (RESET)
                    
                    elemenTeks.textContent = teksAsli; // Kembalikan teks
                    elemenTeks.style.color = '';       // Hapus warna oranye
                    elemenTeks.style.fontWeight = '';
                    
                    // Cabut label 'active' agar klik berikutnya masuk ke kondisi 'else'
                    target.classList.remove('active'); 

                } else {
                    // KONDISI: BELUM AKTIF -> MAU DITAMPILKAN NAMANYA
                    
                    const namaProduk = target.getAttribute('alt');
                    elemenTeks.textContent = `Produk Terpilih: ${namaProduk}`;
                    elemenTeks.style.color = '#ff9900';
                    elemenTeks.style.fontWeight = 'bold';
                    
                    // Tempel label 'active' agar JS tahu ini sedang aktif
                    target.classList.add('active');
                }
            }
        });
    });

    console.log("Galeri berhasil diinisialisasi dengan fitur Toggle Click!");
};