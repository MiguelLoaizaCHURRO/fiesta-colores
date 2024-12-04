// Mapeo de colores principales con sus archivos de audio correspondientes
const audioMap = {
  red: 'sounds/red.mp3',     // Audio para el color rojo
  blue: 'sounds/blue.mp3',   // Audio para el color azul
  yellow: 'sounds/yellow.mp3', // Audio para el color amarillo
  green: 'sounds/green.opus'  // Audio para el color verde
};

// Función para reproducir sonidos según el color
function playSound(color) {
  // Verifica si el color tiene un audio asociado en el mapeo
  if (audioMap[color]) {
    const audio = new Audio(audioMap[color]); // Crea un objeto de audio con la ruta correspondiente
    audio.play(); // Reproduce el sonido
  } else {
    console.warn(`No se encontró un sonido para el color: ${color}`); // Advertencia si no existe un audio para el color
  }
}
