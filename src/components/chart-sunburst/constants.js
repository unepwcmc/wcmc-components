export const DEFAULT_OPTIONS = {
  chart: {
    colours: [
      '#095256',
      '#087f8c',
      '#5aaa95'
    ]
  },
  resetButton: {
    fontSize: '16px',
    text:'Reset'
  }
}

export const DUMMY_DATA = {
  name: "Hierarchy",
  children: 
  [
    {
      id: "parent-1",
      name: "Parent 1",
      children: [
      {
        id: "child-1",
        name: "Child 1",
        value: 1
      },
      {
        id: "child-2",
        name: "Child 2",
        value: 1
      },
      {
        id: "child-3",
        name: "Child 3",
        value: 1
      },
      ]
    },
    {
      id: "parent-2",
      name: "Parent 2",
      children: [
      {
        id: "child-4",
        name: "Child 4",
        value: 1
      },
      {
        id: "child-5",
        name: "Child 5",
        value: 1
      },
      {
        id: "child-6",
        name: "Child 6",
        value: 1
      },
      ]
    },
    {
      id: "parent-3",
      name: "Parent 3",
      children: [
      {
        id: "child-7",
        name: "Child 7",
        value: 1
      },
      {
        id: "child-8",
        name: "Child 8",
        value: 1
      },
      {
        id: "child-9",
        name: "Child 9",
        value: 1
      },
      ]
    }
  ]
}