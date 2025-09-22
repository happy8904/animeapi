 let currentPage = 1; 
        let isLoading = false; 

        async function fetchAnimeData(page) {
            if (isLoading) return; 
            isLoading = true;
            document.getElementById('loadingMessage').style.display = 'block'; 

            try {
                const response = await fetch(`https://api.jikan.moe/v4/anime?page=${page}`);
                const data = await response.json();

                const animeList = data.data;
                const animeContainer = document.getElementById('animeList');

                
                animeList.forEach(anime => {
                    const animeCard = document.createElement('div');
                    animeCard.classList.add('anime-card');

                    const animeImage = document.createElement('img');
                    animeImage.src = anime.images.jpg.image_url;
                    animeImage.alt = anime.title;

                    const animeTitle = document.createElement('h3');
                    animeTitle.innerText = anime.title;

                    const animeSynopsis = document.createElement('p');
                    animeSynopsis.innerText = anime.synopsis ? anime.synopsis.slice(0, 100) + "..." : "No synopsis available";

                    animeCard.appendChild(animeImage);
                    animeCard.appendChild(animeTitle);
                    animeCard.appendChild(animeSynopsis);
                    animeContainer.appendChild(animeCard);
                });

                
                document.getElementById('loadingMessage').style.display = 'none';
                isLoading = false; 
            } catch (error) {
                console.error("Error fetching anime data:", error);
                document.getElementById('loadingMessage').innerText = 'Failed to load anime data. Please try again later.';
                isLoading = false;
            }
        }

        function checkScroll() {
            const scrollPosition = window.innerHeight + window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollPosition >= documentHeight - 100) { 
                currentPage++;
                fetchAnimeData(currentPage);
            }
        }

        window.addEventListener('scroll', checkScroll);

        fetchAnimeData(currentPage);
    