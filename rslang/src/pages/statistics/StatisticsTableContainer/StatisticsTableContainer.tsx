import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type TStatisticsTableContainerProps = {
  learnedCounterWord: number;
};

const StatisticsTableContainer = ({
  learnedCounterWord,
}: TStatisticsTableContainerProps) => {
  function createData(name: string, today: number) {
    return { name, today };
  }

  const rows = [
    createData('Количество изученных слов:', learnedCounterWord),
    createData('Процент правильных ответов:', 237),
    createData('Самая длинная серия правильных ответов:', 262),
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
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
