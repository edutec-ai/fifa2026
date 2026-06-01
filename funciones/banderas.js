// funciones/banderas.js
// Mapeo centralizado de banderas para todos los módulos
// Basado en los equipos validados en especiales.js

export const BANDERAS = {
  // Grupo A
  'México': '🇲🇽',
  'Sudáfrica': '🇿🇦',
  'República de Corea': '🇰🇷',
  'Corea del Sur': '🇰🇷',
  'República Checa': '🇨🇿',
  
  // Grupo B
  'Canadá': '🇨🇦',
  'Bosnia': '🇧🇦',
  'Catar': '🇶🇦',
  'Suiza': '🇨🇭',
  
  // Grupo C
  'Brasil': '🇧🇷',
  'Marruecos': '🇲🇦',
  'Haití': '🇭🇹',
  'Escocia': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  
  // Grupo D
  'Estados Unidos': '🇺🇸',
  'EE. UU.': '🇺🇸',
  'Paraguay': '🇵🇾',
  'Australia': '🇦🇺',
  'Turquía': '🇹🇷',
  
  // Grupo E
  'Alemania': '🇩🇪',
  'Curazao': '🇨🇼',
  'Costa de Marfil': '🇨🇮',
  'Ecuador': '🇪🇨',
  
  // Grupo F
  'Países Bajos': '🇳🇱',
  'Japón': '🇯🇵',
  'Suecia': '🇸🇪',
  'Tunez': '🇹🇳',
  
  // Grupo G
  'Bélgica': '🇧🇪',
  'Egipto': '🇪🇬',
  'RI de Irán': '🇮🇷',
  'Nueva Zelanda': '🇳🇿',
  
  // Grupo H
  'España': '🇪🇸',
  'Islas de Cabo Verde': '🇨🇻',
  'Arabia Saudí': '🇸🇦',
  'Uruguay': '🇺🇾',
  
  // Grupo I
  'Francia': '🇫🇷',
  'Senegal': '🇸🇳',
  'Irak': '🇮🇶',
  'Noruega': '🇳🇴',
  
  // Grupo J
  'Argentina': '🇦🇷',
  'Argelia': '🇩🇿',
  'Austria': '🇦🇹',
  'Jordania': '🇯🇴',
  
  // Grupo K
  'Portugal': '🇵🇹',
  'RD Congo': '🇨🇩',
  'Uzbekistán': '🇺🇿',
  'Colombia': '🇨🇴',
  
  // Grupo L
  'Inglaterra': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'Croacia': '🇭🇷',
  'Ghana': '🇬🇭',
  'Panamá': '🇵🇦',
  
  // Playoff
  'Playoff UEFA': '🏆'
};

export function getBandera(nombre) {
  return BANDERAS[nombre] || '🏳️';
}