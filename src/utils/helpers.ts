export default function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);

  return `${day}.${month < 10 ? '0' : ''}${month}.${year}`;
}
