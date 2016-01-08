Collections.helpers.wordedTimes = [
  {
    expr: 'today',
    start: moment().startOf('day'),
    end: moment().endOf('day')
  },
  {
    expr: 'tomorrow',
    start: moment().add(1, 'day').startOf('day'),
    end: moment().add(1, 'day').endOf('day')
  },
  {
    expr: 'yesterday',
    start: moment().subtract(1, 'day').startOf('day'),
    end: moment().subtract(1, 'day').endOf('day')
  },
  {
    expr: 'this week',
    start: moment().startOf('week'),
    end: moment().endOf('week')
  },
  {
    expr: 'next week',
    start: moment().add(1, 'week').startOf('week'),
    end: moment().add(1, 'week').endOf('week')
  },
  {
    expr: 'last week',
    start: moment().subtract(1, 'week').startOf('week'),
    end: moment().subtract(1, 'week').endOf('week')
  },
  {
    expr: 'this month',
    start: moment().startOf('month'),
    end: moment().endOf('month')
  },
  {
    expr: 'next month',
    start: moment().add(1, 'month').startOf('month'),
    end: moment().add(1, 'month').endOf('month')
  },
  {
    expr: 'last month',
    start: moment().subtract(1, 'month').startOf('month'),
    end: moment().subtract(1, 'month').endOf('month')
  }
];