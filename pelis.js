let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});


const cargarPeliculas = async() => {
	try {
		//API
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=c8bff5e8a78e0b7dae3371e26e5ed94c&language=es-MX&page=${pagina}`);
		
		console.log(respuesta);

		

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();

								
			let peliculas = '';
			datos.results.forEach(pelicula => {
				
				cadena = pelicula.release_date;
				extraida = cadena.substring(0,4);  
				extraida1 = cadena.substring(5,7); 
				extraida2 = cadena.substring(8,10);
				
				peliculas += `
				
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
						
						<h3>${extraida2}-${extraida1}-${extraida}</h3>
					</div>
				`;

			});
			

			document.getElementById('contenedor').innerHTML = peliculas;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

cargarPeliculas();

