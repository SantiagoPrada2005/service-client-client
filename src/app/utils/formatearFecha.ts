export function formatDateToMySQLTimestamp(date: Date): string {
    // Obtener la fecha en formato ISO y dividirla
    const isoString = date.toISOString().replace('Z', '');
    const [datePart, timePart] = isoString.split('T');
    
    // Extraer milisegundos y agregar ceros para microsegundos
    const [fullTime, milliSeconds = '000'] = timePart.split('.'); // Si no hay ms, usar '000'
    const microSeconds = milliSeconds.padEnd(6, '0').slice(0, 6); // Asegurar 6 dígitos
    
    // Formatear como 'YYYY-MM-DD HH:mm:ss.ssssss'
    return `${datePart} ${fullTime}.${microSeconds}`;
  }