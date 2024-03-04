// Adiciona a classe "scroll" ao cabeçalho quando a página é rolada para baixo
window.addEventListener("scroll", function() {
    let header = document.querySelector("#header");
    // Verifica se a posição de rolagem (scroll) da janela é maior que 100px
    // e adiciona ou remove a classe 'scroll' do cabeçalho de acordo
    header.classList.toggle("scroll", window.scrollY > 100);
});

// Quando o DOM é carregado, inicia a busca e renderização dos personagens
document.addEventListener("DOMContentLoaded", function() {
    // Define as variáveis para elementos HTML e parâmetros da API
    const baseUrl = "https://api.disneyapi.dev/character";
    const charactersContainer = document.getElementById("charactesContainer");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Mantém o controle da página atual e quantos personagens mostrar por vez
    let currentPage = 1;
    const charactersPerPage = 5;

    // Função assíncrona para buscar personagens da API
    async function fetchCharacters(page) {
        // Tenta obter os personagens da API e retorna uma lista
        try {
            const res = await fetch(`${baseUrl}?page=${page}`);
            const data = await res.json();
            const characters = data.data;
            return characters;
        } catch (error) {
            // Em caso de erro, registra o erro no console e retorna uma lista vazia
            console.error("Erro ao buscar personagens:", error);
            return [];
        }
    }

    // Função assíncrona para renderizar os personagens na página
    async function renderCharacters(page) {
        // Obtém os personagens da API e limpa o container antes de adicionar novos
        const characters = await fetchCharacters(page);
        charactersContainer.innerHTML = '';

        // Calcula os índices de início e fim dos personagens a serem exibidos
        const start = (page - 1) * charactersPerPage;
        const end = start + charactersPerPage;
        const charactersToShow = characters.slice(start, end);

        // Para cada personagem, cria elementos HTML e os adiciona ao container
        charactersToShow.forEach(character => {
            const characterElement = document.createElement("div");
            const characterImage = document.createElement("img");
            const characterCaption = document.createElement("p");
            const characterData = document.createElement("div");
            const films = document.createElement("p");
            const tvShows = document.createElement("p");
            const videoGames = document.createElement("p");
            const moreDetailsButton = document.createElement("button");

            // Configura atributos e conteúdo para cada elemento
            characterElement.classList.add("character");
            characterImage.src = character.imageUrl;
            characterImage.alt = character.name;
            characterCaption.textContent = character.name;
            characterData.classList.add("character-data");
            films.textContent = "Filmes: " + (character.films.join(", ") || "Não disponível");
            tvShows.textContent = "Programas de TV: " + (character.tvShows.join(", ") || "Não disponível");
            videoGames.textContent = "Jogos de Vídeo: " + (character.videoGames.join(", ") || "Não disponível");
            moreDetailsButton.textContent = "Mais Detalhes";
            moreDetailsButton.classList.add("more-details-btn");

            // Adiciona um ouvinte de evento para redirecionar para a página de detalhes do personagem
            moreDetailsButton.addEventListener("click", function() {
                window.location.href = `./pages/person.html?name=${encodeURIComponent(character.name)}`;
            });

            // Adiciona os elementos criados ao DOM
            characterElement.appendChild(characterImage);
            characterElement.appendChild(characterCaption);
            characterData.appendChild(films);
            characterData.appendChild(tvShows);
            characterData.appendChild(videoGames);
            characterData.appendChild(moreDetailsButton);
            characterElement.appendChild(characterData);
            charactersContainer.appendChild(characterElement);
        });

        // Atualiza o estado dos botões de navegação
        updateButtonsState(page);
    }

    // Funções para navegar entre as páginas de personagens
    function showNextPage() {
        currentPage++;
        renderCharacters(currentPage);
    }

    function showPrevPage() {
        currentPage--;
        renderCharacters(currentPage);
    }

    // Atualiza o estado dos botões de navegação com base na página atual
    function updateButtonsState(page) {
        prevBtn.disabled = page === 1;
        nextBtn.disabled = charactersPerPage * page >= 149;
    }

    // Adiciona ouvintes de evento aos botões de navegação
    prevBtn.addEventListener("click", showPrevPage);
    nextBtn.addEventListener("click", showNextPage);

    // Renderiza os personagens na página inicial ao carregar o DOM
    renderCharacters(currentPage);
});
