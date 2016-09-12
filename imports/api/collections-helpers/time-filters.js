
const wordedTimes = [{
  expr: 'today',
  position: 'present',
  start: moment().startOf('day'),
  end: moment().endOf('day')
}, {
  expr: 'tomorrow',
  position: 'future',
  start: moment().add(1, 'day').startOf('day'),
  end: moment().add(1, 'day').endOf('day')
}, {
  expr: 'yesterday',
  position: 'past',
  start: moment().subtract(1, 'day').startOf('day'),
  end: moment().subtract(1, 'day').endOf('day')
}, {
  expr: 'this week',
  position: 'present',
  start: moment().startOf('week'),
  end: moment().endOf('week')
}, {
  expr: 'next week',
  position: 'future',
  start: moment().add(1, 'week').startOf('week'),
  end: moment().add(1, 'week').endOf('week')
}, {
  expr: 'last week',
  position: 'past',
  start: moment().subtract(1, 'week').startOf('week'),
  end: moment().subtract(1, 'week').endOf('week')
}, {
  expr: 'this month',
  position: 'present',
  start: moment().startOf('month'),
  end: moment().endOf('month')
}, {
  expr: 'next month',
  position: 'future',
  start: moment().add(1, 'month').startOf('month'),
  end: moment().add(1, 'month').endOf('month')
}, {
  expr: 'last month',
  position: 'past',
  start: moment().subtract(1, 'month').startOf('month'),
  end: moment().subtract(1, 'month').endOf('month')
}];

function getWordedTime(inputDate) {
  return _.find(wordedTimes, {
    'expr': inputDate.toLowerCase()
  }) || false;
}

function getEuropeanDate(inputDate) {
  // Make sure the date is read the European way by default
  if (moment(inputDate, 'DD-MM-YYYY').isValid()) {
    return moment(inputDate, 'DD-MM-YYYY').hours(12);
  } else if (!moment(new Date(inputDate)).isValid()) {
    return false;
  }
  return moment(new Date(inputDate));
}

export { wordedTimes, getEuropeanDate, getWordedTime };