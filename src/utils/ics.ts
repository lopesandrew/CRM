/**
 * Gera um conteúdo de arquivo iCalendar (.ics) com os eventos fornecidos. Cada
 * evento deve possuir uid, start, end e summary. Datas devem ser objetos
 * Date. Essa função retorna uma string pronta para ser salva em um arquivo.
 */
export function generateICS(events: {
  uid: string;
  start: Date;
  end: Date;
  summary: string;
  description?: string;
}[]): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
  ];
  events.forEach((ev) => {
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${ev.uid}`);
    lines.push(`DTSTART:${toICSDate(ev.start)}`);
    lines.push(`DTEND:${toICSDate(ev.end)}`);
    lines.push(`SUMMARY:${escapeText(ev.summary)}`);
    if (ev.description) lines.push(`DESCRIPTION:${escapeText(ev.description)}`);
    lines.push('END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

function toICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function escapeText(text: string): string {
  return text.replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
}