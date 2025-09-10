export let CONSTANTS = {
  DATA_TYPE: {
    array: "Array",
    object: "Object",
    value: "value",
  },
  FILTER_PARAMS: {
    MACHINE_ID: "MACHINE_NAME",
  },
 EventList :[
    {
      module: 'Projects',
      events: ['projects', 'epics', 'milestones', 'tasks', 'alloction'],
    },
    {
      module: 'Users',
      events: ['users', 'roles', 'customers', 'user finance'],
    },
    
    {
      module: 'Timesheet',
      events: ['timesheet submission', 'timesheet approval/rejection'],
    },
    {
      module: 'TimeOff',
      events: ['leaves', 'approvals', 'settings'],
    },
    {
      module: 'Accounting',
      events: [
        'items',
        'estimates',
        'invoices',
        'bills',
        'purchase orders',
        'accounts',
        'transactions',
        'reconciliation',
        'settings',
      ],
    },
  ]};

