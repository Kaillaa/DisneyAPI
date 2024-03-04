// Quando o DOM é carregado, esta função é executada
document.addEventListener("DOMContentLoaded", async function() {
    // Obtém o parâmetro 'name' da URL
    const params = new URLSearchParams(window.location.search);
    const characterName = params.get("name");
    const nameElement = document.getElementById("name");
    const infosPersonElement = document.getElementById("infosPerson");

    // Define o nome do personagem no elemento correspondente
    nameElement.textContent = characterName;

    try {
        // Tenta obter os detalhes do personagem da API
        const characterDetails = await fetchCharacterDetails(characterName);
        // Exibe os detalhes do personagem na página
        displayCharacterDetails(characterDetails);
    } catch (error) {
        // Em caso de erro, exibe uma mensagem de erro
        console.error("Erro ao buscar detalhes do personagem:", error);
        infosPersonElement.textContent = "Erro ao carregar detalhes do personagem.";
    }
});

// Função para buscar os detalhes do personagem na API
async function fetchCharacterDetails(characterName) {
    try {
        // Faz uma solicitação à API para obter os detalhes do personagem
        const response = await fetch(`https://api.disneyapi.dev/character?name=${encodeURIComponent(characterName)}`);
        const data = await response.json();
        let foundCharacter;

        // Verifica se os dados retornados são um array ou um objeto
        if (Array.isArray(data.data)) {
            // Procura pelo personagem com o nome correspondente
            foundCharacter = data.data.find(character => 
                character.name.trim().toLowerCase() === characterName.trim().toLowerCase()
            );
        } else {
            foundCharacter = data.data;
        }

        // Se o personagem não for encontrado, lança um erro
        if (!foundCharacter) {
            throw new Error("Personagem não encontrado.");
        }
        
        return foundCharacter;
    } catch (error) {
        // Em caso de erro, lança um erro com uma mensagem específica
        throw new Error(`Erro ao buscar detalhes do personagem "${characterName}": ${error.message}`);
    }
}

// Função para exibir os detalhes do personagem na página
function displayCharacterDetails(characterDetails) {
    const infosPersonElement = document.getElementById("infosPerson");
    infosPersonElement.innerHTML = ''; 

    try {
        // Cria e configura a imagem do personagem
        const characterImage = document.createElement("img");
        characterImage.src = characterDetails.imageUrl; 
        characterImage.alt = characterDetails.name; 
        infosPersonElement.appendChild(characterImage); 

        // Cria parágrafos para os filmes, programas de TV e jogos de vídeo do personagem
        const films = document.createElement("p");
        films.textContent = "Filmes: " + (characterDetails.films.join(", ") || "Não disponível");

        const tvShows = document.createElement("p");
        tvShows.textContent = "Programas de TV: " + (characterDetails.tvShows.join(", ") || "Não disponível");

        const videoGames = document.createElement("p");
        videoGames.textContent = "Jogos de Vídeo: " + (characterDetails.videoGames.join(", ") || "Não disponível");

        // Adiciona os parágrafos ao elemento de informações do personagem
        infosPersonElement.appendChild(films);
        infosPersonElement.appendChild(tvShows);
        infosPersonElement.appendChild(videoGames);
    } catch (error) {
        // Em caso de erro ao exibir os detalhes do personagem, exibe uma mensagem de erro
        console.error(`Erro ao exibir detalhes do personagem: ${error.message}`);
        infosPersonElement.textContent = "Erro ao exibir detalhes do personagem.";
    }
}
