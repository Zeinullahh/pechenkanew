// Список популярных временных зон с GMT смещениями
export const timeZones = [
  { value: 'UTC', label: 'UTC (GMT+00:00)', offset: 0 },
  { value: 'Europe/London', label: 'London (GMT+00:00)', offset: 0 },
  { value: 'Europe/Paris', label: 'Paris (GMT+01:00)', offset: 1 },
  { value: 'Europe/Berlin', label: 'Berlin (GMT+01:00)', offset: 1 },
  { value: 'Europe/Moscow', label: 'Moscow (GMT+03:00)', offset: 3 },
  { value: 'Asia/Dubai', label: 'Dubai (GMT+04:00)', offset: 4 },
  { value: 'Asia/Karachi', label: 'Karachi (GMT+05:00)', offset: 5 },
  { value: 'Asia/Dhaka', label: 'Dhaka (GMT+06:00)', offset: 6 },
  { value: 'Asia/Bangkok', label: 'Bangkok (GMT+07:00)', offset: 7 },
  { value: 'Asia/Shanghai', label: 'Shanghai (GMT+08:00)', offset: 8 },
  { value: 'Asia/Tokyo', label: 'Tokyo (GMT+09:00)', offset: 9 },
  { value: 'Australia/Sydney', label: 'Sydney (GMT+10:00)', offset: 10 },
  { value: 'Pacific/Auckland', label: 'Auckland (GMT+12:00)', offset: 12 },
  { value: 'America/Los_Angeles', label: 'Los Angeles (GMT-07:00)', offset: -7 },
  { value: 'America/Denver', label: 'Denver (GMT-06:00)', offset: -6 },
  { value: 'America/Chicago', label: 'Chicago (GMT-05:00)', offset: -5 },
  { value: 'America/New_York', label: 'New York (GMT-04:00)', offset: -4 },
  { value: 'America/Toronto', label: 'Toronto (GMT-04:00)', offset: -4 },
  { value: 'America/Sao_Paulo', label: 'Sao Paulo (GMT-03:00)', offset: -3 },
  { value: 'Atlantic/Azores', label: 'Azores (GMT-01:00)', offset: -1 }
];

// Функция для получения текущего GMT смещения временной зоны
export function getGMTOffset(timeZone) {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'longOffset'
    });
    const parts = formatter.formatToParts(now);
    const offsetPart = parts.find(part => part.type === 'timeZoneName');
    
    if (offsetPart) {
      const match = offsetPart.value.match(/GMT([+-]\d{1,2})(?::(\d{2}))?/);
      if (match) {
        const hours = parseInt(match[1]);
        const minutes = match[2] ? parseInt(match[2]) : 0;
        return hours + (minutes / 60) * (hours >= 0 ? 1 : -1);
      }
    }
    
    // Fallback: используем список временных зон
    const tz = timeZones.find(tz => tz.value === timeZone);
    return tz ? tz.offset : 0;
  } catch (error) {
    console.error('Error getting GMT offset:', error);
    return 0;
  }
}

// Функция для форматирования времени с учетом временной зоны
export function formatTimeWithOffset(date, timeZone) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date);
  } catch (error) {
    console.error('Error formatting time:', error);
    return date.toISOString().split('T')[1].split('.')[0];
  }
}

// Функция для получения текущего времени в указанной временной зоне
export function getCurrentTimeInTimeZone(timeZone) {
  return formatTimeWithOffset(new Date(), timeZone);
}

// Функция для получения смещения в формате GMT
export function getGMTOffsetString(timeZone) {
  const offset = getGMTOffset(timeZone);
  const sign = offset >= 0 ? '+' : '-';
  const hours = Math.abs(Math.floor(offset));
  const minutes = Math.abs((offset % 1) * 60);
  
  return `GMT${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Функция для получения временной зоны по умолчанию (системная или UTC)
export function getDefaultTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    return 'UTC';
  }
}

// Функция для поиска временной зоны по названию
export function findTimeZoneByName(name) {
  return timeZones.find(tz => 
    tz.value.toLowerCase().includes(name.toLowerCase()) ||
    tz.label.toLowerCase().includes(name.toLowerCase())
  );
}
