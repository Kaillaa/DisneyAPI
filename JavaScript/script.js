window.addEventListener("scroll", function(){
    let header = document.querySelector('#header')
    header.classList.toggle('scroll', window.scrollY > 100)
})
document.addEventListener("DOMContentLoaded", function() {
    const baseUrl = "https://api.disneyapi.dev/character";
    const caractersImg = document.getElementById("caracters-img");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");


    let currentPage = 1;
    const charactersPerPage = 7;

    async function fetchCharacters(page) {
        try {
            const res = await fetch(`${baseUrl}?page=${page}`);
            const data = await res.json();
            const characters = data.data;
            return characters;
        } catch (error) {
            console.error("Erro ao buscar personagens:", error);
            return [];
        }
    }

    async function renderCharacters(page) {
        const characters = await fetchCharacters(page);
        caractersImg.innerHTML = '';

        const start = (page - 1) * charactersPerPage;
        const end = start + charactersPerPage;
        const charactersToShow = characters.slice(start, end);

        charactersToShow.forEach(character => {
            const characterContainer = document.createElement("div");
            characterContainer.classList.add("character-container");

            const characterElement = document.createElement("div");
            characterElement.classList.add("character");

            const characterImage = document.createElement("img");
            characterImage.src = character.imageUrl;
            characterImage.alt = character.name;

            const characterCaption = document.createElement("p");
            characterCaption.textContent = character.name;

            const characterData = document.createElement("div");
            characterData.classList.add("character-data");

            const films = document.createElement("p");
            films.textContent = "Filmes: " + (character.films.join(", ") || "Não disponível");

            const tvShows = document.createElement("p");
            tvShows.textContent = "Programas de TV: " + (character.tvShows.join(", ") || "Não disponível");

            const videoGames = document.createElement("p");
            videoGames.textContent = "Jogos de Vídeo: " + (character.videoGames.join(", ") || "Não disponível");

            characterElement.addEventListener("click", function() {
                window.location.href = character.url;
            });

            characterElement.appendChild(characterImage);
            characterContainer.appendChild(characterElement);
            characterContainer.appendChild(characterCaption);
            characterData.appendChild(films);
            characterData.appendChild(tvShows);
            characterData.appendChild(videoGames);
            characterContainer.appendChild(characterData);
            caractersImg.appendChild(characterContainer);
        });

        updateButtonsState(page);
    }

    function showNextPage() {
        currentPage++;
        renderCharacters(currentPage);
    }

    function showPrevPage() {
        currentPage--;
        renderCharacters(currentPage);
    }

    function updateButtonsState(page) {
        prevBtn.disabled = page === 1;
        nextBtn.disabled = charactersPerPage * page >= 149; 
    }

    prevBtn.addEventListener("click", showPrevPage);
    nextBtn.addEventListener("click", showNextPage);

    renderCharacters(currentPage);
});

