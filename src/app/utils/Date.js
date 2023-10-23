export default function formatarDataHora(data) {
  const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const diaSemana = diasDaSemana[data.getDay()];
  const dia = data.getDate();
  const mes = meses[data.getMonth()];

  return `${diaSemana}, ${dia} de ${mes}`;
}
