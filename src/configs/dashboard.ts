export const fields = [{
  label: 'RATES.ADVENTURE',
  key: 'adventureRate',
}, {
  label: 'RATES.COMMANDER',
  key: 'commanderRate',
}, {
  label: 'RATES.DOCTOR',
  key: 'doctorRate',
}, {
  label: 'RATES.NORMAL',
  key: 'normalRate',
}, {
  label: 'RATES.SCIENTIST',
  key: 'scientistRate',
}, {
  label: 'RATES.SPECIALIST',
  key: 'specialistRate',
}, {
  label: 'RATES.TOTAL_AMOUNT',
  key: 'totalAmount',
  base: 1,
}];
export const dashboard = {
  maxWidth: 'xl',
  className: 'dashboard-container',
  sx: {
    p: 4,
    backgroundColor: 'background.default',
    color: 'text.primary',
  },
  items: [{
    type: 'paper',
    elevation: 0,
    items: [{
      type: 'gridList',
      spacing: 2,
      breakpoints: {
        xs: 6,
        md: 3
      },
      elevation: 1,
      items: fields,
      sx: {
        p:2,
        display: { xs: 'block', md: 'flex' },
        justifyContent: 'space-between'
      },
      extraItems: [{
        type: 'gridItem',
        xs: 6,
        md: 3,
        items: [{
          type: 'paper',
          elevation: 1,
          sx: {
            p: 2,
            display: { xs: 'block', md: 'flex' },
            justifyContent: 'space-between'
          },
          items: [{
            type: 'typography',
            component: 'h6',
            label: 'DASHBOARD.STAKED_NFT_COUNT',
            noWrap: true
          }, {
            type: 'typography',
            component: 'p',
            label: (pipe) => pipe.userStakedCount
          }]
        }]
      }]
    }]
  }]
}