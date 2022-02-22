import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TOptionalStatistic } from '../../../api/types';
import { TStatisticType } from '../../../General/types';

type TStatisticsTableContainerProps = {
  learnedCounterWord?: number;
  optional?: TOptionalStatistic;
  statisticType: TStatisticType;
};

const StatisticsTableContainer = ({
  learnedCounterWord,
  optional,
  statisticType,
}: TStatisticsTableContainerProps) => {
  function createData(name: string, today?: number) {
    return { name, today };
  }

  let rows = [
    createData('Количество изученных слов:', learnedCounterWord),
    createData(
      'Самая длинная серия правильных ответов:',
      optional?.bestSeries || 0,
    ),
  ];

  if (statisticType === TStatisticType.audio) {
    const correctAnsw = optional?.audioCall?.rightAnswers || 0;
    const wrongAnsw = optional?.audioCall?.wrongAnswers || 0;
    let percent = 0;
    if (correctAnsw + wrongAnsw !== 0) {
      percent = Math.round((correctAnsw / (correctAnsw + wrongAnsw)) * 100);
    }

    rows = [
      createData(
        'Самая длинная серия правильных ответов:',
        optional?.audioCall?.bestSeries || 0,
      ),
      createData('Правильных ответов:', optional?.audioCall?.rightAnswers || 0),
      createData(
        'Неправильных ответов:',
        optional?.audioCall?.wrongAnswers || 0,
      ),
      createData('Процент правильных ответов:', percent),
    ];
  }

  if (statisticType === TStatisticType.sprint) {
    const correctAnsw = optional?.sprint?.rightAnswers || 0;
    const wrongAnsw = optional?.sprint?.wrongAnswers || 0;
    let percent = 0;
    if (correctAnsw + wrongAnsw !== 0) {
      percent = Math.round((correctAnsw / (correctAnsw + wrongAnsw)) * 100);
    }

    rows = [
      createData(
        'Самая длинная серия правильных ответов:',
        optional?.sprint?.bestSeries || 0,
      ),
      createData('Правильных ответов:', optional?.sprint?.rightAnswers || 0),
      createData('Неправильных ответов:', optional?.sprint?.wrongAnswers || 0),
      createData('Процент правильных ответов:', percent),
    ];
  }

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 300 }}
        size="small"
        aria-label="a dense table"
        className="statistics_table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Наименование показателя</TableCell>
            <TableCell align="right">За сегодня</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.today}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatisticsTableContainer;
