export function getTimeStamp(date: string): string {
  const today = new Date();
  const postDate = new Date(Date.parse(date));

  const differenceSeconds = (today.getTime() - postDate.getTime()) / 1000;
  const differenceMinutes = differenceSeconds / 60;
  const differenceHours = differenceMinutes / 60;

  let temp = "";

  if (differenceSeconds <= 0) temp = `Agora`;
  else if (differenceSeconds >= 86400)
    temp = `${(differenceHours / 24).toFixed(0)} dias atrás`;
  else if (differenceSeconds >= 3600)
    temp = `${differenceHours.toFixed(0)} horas atrás`;
  else if (differenceSeconds > 60)
    temp = `${differenceMinutes.toFixed(0)} minutos atrás`;
  else temp = `${differenceSeconds.toFixed(0)} segundos atrás`;

  return temp;
}
