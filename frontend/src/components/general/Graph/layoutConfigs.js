export const getLayoutConfig = (layoutName) => {
  switch (layoutName) {
    case 'klay':
      return {
        name: 'klay',
        fit: true,
        padding: 20,
        klay: {
          spacing: 500
        }
      }
    case 'preset':
      return {
        name: 'preset',
        positions: (node) => node.data().position,
        fit: true
      }
    default:
      return {
        name: layoutName
      }
  }
}
