import { match } from "date-fns/locale/af";

function convertHourToMinutes(time: string) {
  const [hour, minutes] = time.split(':').map(Number);

  const timeInMinutes = (hour * 60) + minutes;
  // aqui estou transformando as horas em minutos.

  return timeInMinutes;
};

function convertMinutesToHour(time: number) {
  // convertendo minutos em horas;
  const hours = (time / 60);

  // retorna o menor número inteiro dentre o hour;
  const rhours = Math.floor(hours);

  const minutes = (hours - rhours) * 60;

  // arredondando os minutos mais proximo do inteiro;
  const rminutes = Math.round(minutes);

  if (rhours.toString().length == 2) {
    return `${rhours}:${rminutes}0`;
  }

  if (rminutes.toString().length == 2) {
    return `0${rhours}:${rminutes}`;
  }

  return `0${rhours}:${rminutes}0`;
};

export { convertHourToMinutes, convertMinutesToHour };