document.addEventListener("DOMContentLoaded", function () {
    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const lista = document.getElementById("lista");
    btnBuscar.addEventListener("click", () => {
        const aBuscar = inputBuscar.value.toLowerCase();
        fetch("https://japceibal.github.io/japflix_api/movies-data.json")
            .then((response) => response.json())
            .then((data) => {
                const peliculasFiltradas = data.filter((movie) => {
                    return (
                        movie.title.toLowerCase().includes(aBuscar) ||
                        movie.genres.some((genre) => genre.name.toLowerCase().includes(aBuscar)) ||
                        movie.tagline.toLowerCase().includes(aBuscar) ||
                        movie.overview.toLowerCase().includes(aBuscar)
                    );
                });
                mostrarPeliculas(peliculasFiltradas);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });

    function mostrarPeliculas(movies) {
        lista.innerHTML = "";
        movies.forEach((movie) => {
            const listaItems = document.createElement("li");
            listaItems.classList.add("list-group-item");
            listaItems.innerHTML = `
            <div id="pelis">
                <div class="d-flex justify-content-between align-items-center">
                <h3>${movie.title}</h3>
                <span class="star-icon">${obtenerEstrellas(movie.vote_average)}</span>
                </div>
                <p>${movie.tagline}</p>
            </div>
          `;
          listaItems.addEventListener("click", () => {
                mostrarDetallesPeliculas(movie);
            });
            lista.appendChild(listaItems);
        });
    }

    function obtenerEstrellas(voteAverage) {
        const maximoEstrellas = 5;
        const puntuacion = Math.round(voteAverage / 2);
        const estrellas = "★".repeat(puntuacion);
        const estrellasVacias = `<span class="empty-stars">${"★".repeat(maximoEstrellas - puntuacion)}</span>`;
        return `${estrellas}${estrellasVacias}`;
    }

    function mostrarDetallesPeliculas(movie) {
        const listaGeneros = movie.genres.map((genre) => genre.name).join(", ");
        const detallesTitle = document.getElementById("detallesTitle");
        const detallesOverview = document.getElementById("detallesOverview");
        const detallesGenres = document.getElementById("detallesGenres");
        const detallesYear = document.getElementById("detallesYear");
        const detallesDuration = document.getElementById("detallesDuration");
        const detallesBudget = document.getElementById("detallesBudget");
        const detallesRevenue = document.getElementById("detallesRevenue");
        detallesTitle.textContent = movie.title;
        detallesOverview.textContent = movie.overview;
        detallesGenres.textContent = listaGeneros;
        detallesYear.textContent = movie.release_date.substring(0, 4);
        detallesDuration.textContent = movie.runtime + " minutos";
        detallesBudget.textContent = "$" + movie.budget.toLocaleString();
        detallesRevenue.textContent = "$" + movie.revenue.toLocaleString();
        const btnMas = document.getElementById("btnMas");
        const masInfo = document.getElementById("masInfo");
        btnMas.addEventListener("click", () => {
            if (masInfo.classList.contains("show")) {
                btnMore.textContent = "Más";
            }
        });
        const offcanvas = new bootstrap.Offcanvas(document.getElementById("detallesContainer"));
        offcanvas.show();
    }
});