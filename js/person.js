document.addEventListener("DOMContentLoaded", async function() {
    const params = new URLSearchParams(window.location.search);
    const characterName = params.get("name");
    const nameElement = document.getElementById("name");
    const infosPersonElement = document.getElementById("infosPerson");

    nameElement.textContent = characterName;

    try {
        const characterDetails = await fetchCharacterDetails(characterName);
        displayCharacterDetails(characterDetails);
    } catch (error) {
        console.error("Erro ao buscar detalhes do personagem:", error);
        infosPersonElement.textContent = "Erro ao carregar detalhes do personagem.";
    }
});

async function fetchCharacterDetails(characterName) {
    try {
        const response = await fetch(`https://api.disneyapi.dev/character?name=${encodeURIComponent(characterName)}`);
        const data = await response.json();
        let foundCharacter;

        if (Array.isArray(data.data)) {
            foundCharacter = data.data.find(character => 
                character.name.trim().toLowerCase() === characterName.trim().toLowerCase()
            );
        } else {
            foundCharacter = data.data;
        }

        if (!foundCharacter) {
            throw new Error("Personagem não encontrado.");
        }
        
        return foundCharacter;
    } catch (error) {
        throw new Error(`Erro ao buscar detalhes do personagem "${characterName}": ${error.message}`);
    }
}

function displayCharacterDetails(characterDetails) {
    const infosPersonElement = document.getElementById("infosPerson");
    infosPersonElement.innerHTML = ''; 

    try {

        const characterImage = document.createElement("img");
        characterImage.src = characterDetails.imageUrl; 
        characterImage.alt = characterDetails.name; 
        infosPersonElement.appendChild(characterImage); 

        
        const films = document.createElement("p");
        films.textContent = "Filmes: " + (characterDetails.films.join(", ") || "Não disponível");

        const tvShows = document.createElement("p");
        tvShows.textContent = "Programas de TV: " + (characterDetails.tvShows.join(", ") || "Não disponível");

        const videoGames = document.createElement("p");
        videoGames.textContent = "Jogos de Vídeo: " + (characterDetails.videoGames.join(", ") || "Não disponível");

        
        infosPersonElement.appendChild(films);
        infosPersonElement.appendChild(tvShows);
        infosPersonElement.appendChild(videoGames);
    } catch (error) {
        console.error(`Erro ao exibir detalhes do personagem: ${error.message}`);
        infosPersonElement.textContent = "Erro ao exibir detalhes do personagem.";
    }
}