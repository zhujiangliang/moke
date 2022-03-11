const functionIds = [
  {
    functionId: '1',
    children: [
      {
        functionId: '1-1',
        children: [
          {
            functionId: '1-1-1',
            children: []
          },
          {
            functionId: '1-1-2',
            children: []
          },
          {
            functionId: '1-1-3',
            children: []
          }
        ]
      },
      {
        functionId: '1-2',
        children: [
          {
            functionId: '1-2-1',
            children: []
          },
          {
            functionId: '1-2-2',
            children: []
          },
          {
            functionId: '1-2-3',
            children: []
          }
        ]
      },
      {
        functionId: '1-3',
        children: [
          {
            functionId: '1-3-1',
            children: []
          },
          {
            functionId: '1-3-2',
            children: []
          },
          {
            functionId: '1-3-3',
            children: [
              {
                functionId: '1-3-3-1',
                children: []
              },
              {
                functionId: '1-3-3-2',
                children: []
              }
            ]
          },
          {
            functionId: '1-3-4',
            children: []
          }
        ]
      }
    ]
  },
  {
    functionId: '2',
    children: [
      {
        functionId: '2-1',
        children: [
          {
            functionId: '2-1-1',
            children: []
          },
          {
            functionId: '2-1-2',
            children: []
          },
          {
            functionId: '2-1-3',
            children: []
          }
        ]
      },
      {
        functionId: '2-2',
        children: []
      },
      {
        functionId: '2-3',
        children: [
          {
            functionId: '2-3-1',
            children: []
          },
          {
            functionId: '2-3-2',
            children: []
          },
          {
            functionId: '2-3-3',
            children: [
              {
                functionId: '2-3-3-1',
                children: []
              },
              {
                functionId: '2-3-3-2',
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
]
const checkedFunctionIds = ['1', '1-1', '1-1-3']

export { functionIds, checkedFunctionIds }
