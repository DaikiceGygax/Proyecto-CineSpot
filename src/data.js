// Catálogo local de CineSpot.
// Películas: llevan `duracion` (minutos).
// Series: llevan `temporadas` -> [{ n, episodios, titulos? }].
//   `titulos` es opcional; si falta, la app muestra "Capítulo N".
// Para usar pósters reales, guarda la imagen en /public/posters y cambia `imagen`.
export const catalogo = [
  { id: 1, titulo: 'Interstellar', tipo: 'Película', genero: 'Ciencia ficción', anio: 2014, imagen: '/posters/interestellar.png', duracion: 169,
    sinopsis: 'Con la Tierra al borde del colapso, un grupo de astronautas cruza un agujero de gusano en busca de un nuevo hogar para la humanidad.' },
  { id: 2, titulo: 'Coco', tipo: 'Película', genero: 'Animación', anio: 2017, imagen: '/posters/coco.jpg', duracion: 105,
    sinopsis: 'Miguel sueña con ser músico aunque su familia lo tiene prohibido. Durante el Día de Muertos llega a la Tierra de los Muertos y descubre la historia de sus ancestros.' },
  { id: 3, titulo: 'Stranger Things', tipo: 'Serie', genero: 'Misterio', anio: 2016, imagen: '/posters/images.jpg',
    sinopsis: 'En un pequeño pueblo de Indiana en los años 80, la desaparición de un niño destapa experimentos secretos, fuerzas sobrenaturales y a una niña con poderes extraordinarios.',
    temporadas: [
      { n: 1, episodios: 8, titulos: ['The Vanishing of Will Byers', 'The Weirdo on Maple Street', 'Holly, Jolly', 'The Body', 'The Flea and the Acrobat', 'The Monster', 'The Bathtub', 'The Upside Down'] },
      { n: 2, episodios: 9 }, { n: 3, episodios: 8 }, { n: 4, episodios: 9 }, { n: 5, episodios: 8 } ] },
  { id: 4, titulo: 'El viaje de Chihiro', tipo: 'Película', genero: 'Animación', anio: 2001, imagen: '/posters/chihiro.jpg', duracion: 125,
    sinopsis: 'Una niña queda atrapada en un mundo de espíritus y debe trabajar en una casa de baños para rescatar a sus padres y volver a casa.' },
  { id: 5, titulo: 'Dark', tipo: 'Serie', genero: 'Misterio', anio: 2017, imagen: '/posters/dark.jpg',
    sinopsis: 'La desaparición de un niño en un pueblo alemán saca a la luz los secretos de cuatro familias y un misterio que atraviesa varias generaciones.',
    temporadas: [
      { n: 1, episodios: 10, titulos: ['Secrets', 'Lies', 'Past and Present', 'Double Lives', 'Truths', 'Sic Mundus Creatus Est', 'Crossroads', 'As You Sow, So Shall You Reap', 'Everything Is Now', 'Alpha and Omega'] },
      { n: 2, episodios: 8 }, { n: 3, episodios: 8 } ] },
  { id: 6, titulo: 'Dune', tipo: 'Película', genero: 'Ciencia ficción', anio: 2021, imagen: '/posters/dune.jpg', duracion: 155,
    sinopsis: 'Paul Atreides viaja con su familia a Arrakis, un planeta desértico y peligroso, fuente de la especia más valiosa del universo, y se ve envuelto en la lucha por controlarlo.' },
  { id: 7, titulo: 'The Last of Us', tipo: 'Serie', genero: 'Drama', anio: 2023, imagen: '/posters/last.jpg',
    sinopsis: 'Veinte años después de una pandemia que devastó el mundo, un superviviente endurecido debe escoltar a una adolescente a través de un país en ruinas.',
    temporadas: [
      { n: 1, episodios: 9, titulos: ["When You're Lost in the Darkness", 'Infected', 'Long, Long Time', 'Please Hold to My Hand', 'Endure and Survive', 'Kin', 'Left Behind', 'When We Are in Need', 'Look for the Light'] },
      { n: 2, episodios: 7 } ] },
  { id: 8, titulo: 'Spider-Man: Un nuevo universo', tipo: 'Película', genero: 'Animación', anio: 2018, imagen: '/posters/spiderman.jpg', duracion: 117,
    sinopsis: 'Miles Morales, un adolescente de Brooklyn, obtiene poderes de araña y conoce a otros Spider-People de realidades alternas para salvar el multiverso.' },
  { id: 9, titulo: 'Breaking Bad', tipo: 'Serie', genero: 'Drama', anio: 2008, imagen: '/posters/breaking.jpg',
    sinopsis: 'Un profesor de química con cáncer terminal empieza a fabricar metanfetamina con un antiguo alumno para asegurar el futuro económico de su familia.',
    temporadas: [
      { n: 1, episodios: 7, titulos: ['Pilot', "Cat's in the Bag...", "...And the Bag's in the River", 'Cancer Man', 'Gray Matter', "Crazy Handful of Nothin'", 'A No-Rough-Stuff-Type Deal'] },
      { n: 2, episodios: 13 }, { n: 3, episodios: 13 }, { n: 4, episodios: 13 }, { n: 5, episodios: 16 } ] },
  { id: 10, titulo: 'Avatar', tipo: 'Película', genero: 'Ciencia ficción', anio: 2009, imagen: '/posters/avatar.jpg', duracion: 162,
    sinopsis: 'En el planeta Pandora, un exmarine se infiltra entre los na\'vi y queda dividido entre su misión y la conexión que desarrolla con ese mundo.' },
  { id: 11, titulo: 'Wednesday', tipo: 'Serie', genero: 'Misterio', anio: 2022, imagen: '/posters/merlina.jpg',
    sinopsis: 'Wednesday Addams ingresa a la academia Nevermore, donde investiga una serie de asesinatos misteriosos mientras aprende a manejar sus habilidades psíquicas.',
    temporadas: [
      { n: 1, episodios: 8, titulos: ["Wednesday's Child Is Full of Woe", 'Woe Is the Loneliest Number', 'Friend or Woe', 'Woe What a Night', 'You Reap What You Woe', 'Quid Pro Woe', "If You Don't Woe Me By Now", 'A Murder of Woes'] },
      { n: 2, episodios: 8 } ] },
  { id: 12, titulo: 'Intensamente', tipo: 'Película', genero: 'Animación', anio: 2015, imagen: '/posters/intensamente.jpg', duracion: 95,
    sinopsis: 'Las emociones de Riley (Alegría, Tristeza, Furia, Miedo y Desagrado) viven en su mente y deben ayudarla cuando su familia se muda a una nueva ciudad.' },
  { id: 13, titulo: 'The Batman', tipo: 'Película', genero: 'Acción', anio: 2022, imagen: '/posters/batman.jpg', duracion: 176,
    sinopsis: 'En su segundo año como justiciero, Bruce Wayne persigue a un asesino que ataca a la élite de Gotham y deja enigmas a su paso.' },
  { id: 14, titulo: 'Arcane', tipo: 'Serie', genero: 'Animación', anio: 2021, imagen: '/posters/arcane.jpg',
    sinopsis: 'En las ciudades rivales de Piltover y Zaun, dos hermanas terminan en bandos opuestos de un conflicto impulsado por una peligrosa tecnología mágica.',
    temporadas: [
      { n: 1, episodios: 9, titulos: ['Welcome to the Playground', 'Some Mysteries Are Better Left Unsolved', 'The Base Violence Necessary for Change', 'Happy Progress Day!', 'Everybody Wants to Be My Enemy', 'When These Walls Come Tumbling Down', 'The Boy Savior', 'Oil and Water', 'The Monster You Created'] },
      { n: 2, episodios: 9 } ] },
  { id: 15, titulo: 'Gladiador', tipo: 'Película', genero: 'Acción', anio: 2000, imagen: '/posters/gladiador.jpg', duracion: 155,
    sinopsis: 'Un general romano traicionado es reducido a esclavo y se convierte en gladiador para vengar a su familia y enfrentar al emperador.' },
  { id: 16, titulo: 'Sherlock', tipo: 'Serie', genero: 'Misterio', anio: 2010, imagen: '/posters/sherlock.jpg',
    sinopsis: 'Versión moderna del famoso detective de Baker Street, que junto al doctor Watson resuelve casos en el Londres actual.',
    temporadas: [
      { n: 1, episodios: 3, titulos: ['A Study in Pink', 'The Blind Banker', 'The Great Game'] },
      { n: 2, episodios: 3 }, { n: 3, episodios: 3 }, { n: 4, episodios: 3 } ] },
  { id: 17, titulo: 'Inception', tipo: 'Película', genero: 'Ciencia ficción', anio: 2010, imagen: '/posters/inception.jpg', duracion: 148,
    sinopsis: 'Un ladrón especializado en robar secretos a través de los sueños recibe la tarea contraria: implantar una idea en la mente de alguien.' },
  { id: 18, titulo: 'The Mandalorian', tipo: 'Serie', genero: 'Ciencia ficción', anio: 2019, imagen: '/posters/mandalorian.jpg',
    sinopsis: 'Un cazarrecompensas solitario recorre los confines de la galaxia tras la caída del Imperio y se ve a cargo de un misterioso niño.',
    temporadas: [
      { n: 1, episodios: 8, titulos: ['The Mandalorian', 'The Child', 'The Sin', 'Sanctuary', 'The Gunslinger', 'The Prisoner', 'The Reckoning', 'Redemption'] },
      { n: 2, episodios: 8 }, { n: 3, episodios: 8 } ] },
  { id: 19, titulo: 'La La Land', tipo: 'Película', genero: 'Romance', anio: 2016, imagen: '/posters/lalaland.jpg', duracion: 128,
    sinopsis: 'Una aspirante a actriz y un pianista de jazz se enamoran en Los Ángeles mientras persiguen sus sueños.' },
  { id: 20, titulo: 'Heartstopper', tipo: 'Serie', genero: 'Romance', anio: 2022, imagen: '/posters/heartstopper.jpg',
    sinopsis: 'Charlie y Nick, dos estudiantes de secundaria en Reino Unido, forman una amistad que poco a poco se convierte en algo más.',
    temporadas: [ { n: 1, episodios: 8 }, { n: 2, episodios: 8 }, { n: 3, episodios: 8 } ] }
];

export const formatoDuracion = (min) => `${Math.floor(min / 60)} h ${min % 60} min`;
