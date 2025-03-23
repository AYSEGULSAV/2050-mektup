let allLetters = []; // Tüm mektupları burada saklıyoruz

// Haritayı başlat
const map = L.map('map').setView([39.9334, 32.8597], 6); // Türkiye

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Mektupları API'den al
fetch('http://127.0.0.1:3000/api/v1/letterMap')
    .then(response => response.json())
    .then(letters => {
        allLetters = letters;

        const letterGroups = {};

        letters.forEach(letter => {
            let coords = getCoordinatesForCountry(letter.country);
            const position = `${coords.lat},${coords.lng}`;

            if (!letterGroups[position]) {
                letterGroups[position] = [];
            }
            letterGroups[position].push(letter);
        });

        // Marker ekleme işlemi
        for (let position in letterGroups) {
            const [lat, lng] = position.split(',').map(Number);
            const marker = L.marker([lat, lng]).addTo(map);

            // Popup içeriği
            marker.bindPopup(
                `<div class="popup-content w-[400px] h-[300px] overflow-y-auto p-4" data-position="${position}"></div>`,
                { maxWidth: 500 }
            );

            marker.on("popupopen", (event) => {
                const popupContent = event.popup.getElement().querySelector(".popup-content");

                const groupMessages = letterGroups[position].map((letter, index) => {
                    const realIndex = allLetters.findIndex(l => l.content === letter.content);

                    return `<div class="message-item p-4 border-b border-gray-300">
                        <b class="text-lg">${letter.country}</b><br>
                        <p class="text-gray-700">${letter.content.slice(0, 100)}...</p>
                        <br>
                        <button class="viewLetterBtn bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
                            data-index="${realIndex}">
                            Tamamını Gör
                        </button>
                    </div>`;
                }).join('');

                popupContent.innerHTML = groupMessages;

                // Buton event ekleme
                setTimeout(() => {
                    document.querySelectorAll(".viewLetterBtn").forEach(button => {
                        button.addEventListener("click", (event) => {
                            const index = event.target.getAttribute("data-index");
                            showLetterContent(index, event.target, marker, letterGroups[position]);
                        });
                    });
                }, 100);
            });
        }
    })
    .catch(err => console.error("Mektuplar alınamadı:", err));

// Ülke ismine göre koordinatlar
function getCoordinatesForCountry(country) {
    const countryCoords = {
        'Türkiye': { lat: 39.9334, lng: 32.8597 },
        'Amerika': { lat: 37.0902, lng: -95.7129 },
        'Almanya': { lat: 51.1657, lng: 10.4515 }
    };
    return countryCoords[country] || { lat: 0, lng: 0 };
}

// Mektubu popup'da göster
function showLetterContent(index, button, marker, letterGroup) {
    const letter = allLetters[index];
    if (!letter) return;

    // "Tamamını Gör" butonunu, mesajın tamamını göstermek için değiştirelim
    const popupContent = button.closest('.popup-content');
    
    // Popup içeriğini değiştirelim
    popupContent.innerHTML = `
        <div class="message-item p-4">
            <b class="text-lg">${letter.country}</b><br>
            <p class="text-gray-700">${letter.content}</p>
            <br>
            <button class="closeLetterBtn bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700 transition">
                Kapat
            </button>
        </div>
    `;

    // "Kapat" butonuna event ekleyelim
    setTimeout(() => {
        document.querySelectorAll(".closeLetterBtn").forEach(button => {
            button.addEventListener("click", () => {
                closeLetterContent(marker, letterGroup);
            });
        });
    }, 100);
}

// Popup'ı eski haline döndürelim
function closeLetterContent(marker, letterGroup) {
    // Popup içeriğini eski haline getirelim
    const groupMessages = letterGroup.map((letter, index) => {
        const realIndex = allLetters.findIndex(l => l.content === letter.content);

        return `<div class="message-item p-4 border-b border-gray-300">
            <b class="text-lg">${letter.country}</b><br>
            <p class="text-gray-700">${letter.content.slice(0, 100)}...</p>
            <br>
            <button class="viewLetterBtn bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
                data-index="${realIndex}">
                Tamamını Gör
            </button>
        </div>`;
    }).join('');

    marker.setPopupContent(`
        <div class="popup-content w-[400px] h-[300px] overflow-y-auto p-4">
            ${groupMessages}
        </div>
    `);

    // Popup'ı tekrar açalım
    marker.openPopup();

    // Butonları tekrar ekleyelim
    setTimeout(() => {
        document.querySelectorAll(".viewLetterBtn").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                showLetterContent(index, event.target, marker, letterGroup);
            });
        });
    }, 100);
}
