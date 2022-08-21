export const getYearAndWeekFromIsoString = (str: string) => {
  const strArr = str.split('-');
  const year = Number(strArr[0]);
  const week = Number(strArr[1].split('W')[1]);
  return { year, week };
};

export const getSumByKey = (arr: Array<any>, key: string) => {
  return arr.reduce(
    (accumulator, current) => accumulator + Number(current[key]),
    0,
  );
};

export const getModifiedVaccineData = ({
  data,
  range,
}: {
  data: Array<any>;
  range: number;
}) => {
  const summary = [];
  const totalBatchCount = Math.floor(data.length / 5);

  for (let i = 0; i < totalBatchCount; i++) {
    const tempArr = data.splice(i, range);
    const NumberDosesReceived = getSumByKey(tempArr, 'count');
    const weekStart = tempArr[0].YearWeekISO;
    const weekEnd = tempArr[tempArr.length - 1].YearWeekISO;
    const obj = {
      NumberDosesReceived,
      weekStart,
      weekEnd,
    };
    summary.push(obj);
  }
  return summary;
};
