export const DEFAULT_OPTIONS = {
  chart: {
    defaultColor: '#565656',
    hideRoot: false,
    selectedColor: '#012C4B'
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
      color: "#159BFA",
      name: "Parent 1",
      children: [
      {
        id: "child-1",
        color: "#159BFA",
        name: "Child 1",
        value: 1
      },
      {
        id: "child-2",
        color: "#159BFA",
        name: "Child 2",
        value: 1
      },
      ]
    },
    {
      id: "parent-2",
      color: "#A83CF5",
      name: "Parent 2",
      children: [
      {
        id: "child-3",
        color: "#159BFA",
        name: "Child 3",
        value: 1
      },
      {
        id: "child-4",
        color: "#A83CF5",
        name: "Child 4",
        value: 1
      },
      ]
    },
    {
      id: "parent-3",
      color: "#11C583",
      name: "Parent 3",
      children: [
      {
        id: "child-5",
        color: "#A83CF5",
        name: "Child 5",
        value: 1
      },
      {
        id: "child-6",
        color: "#A83CF5",
        name: "Child 6",
        value: 1
      },
      ]
    },
    {
      id: "parent-4",
      name: "Parent 4",
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