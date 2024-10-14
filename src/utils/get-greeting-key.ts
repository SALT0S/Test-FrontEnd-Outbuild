type GreetingKey = 'good_morning' | 'good_afternoon' | 'good_evening';

export function getGreetingKey(): GreetingKey {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'good_morning';
  } else if (hour < 18) {
    return 'good_afternoon';
  } else {
    return 'good_evening';
  }
}
