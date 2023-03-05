export const Utils = {
  bomb: -1,

  getCoordinates(i, size) {
    let x = Math.floor(i / size);
    let y = i - x * size;
    return { x, y };
  },

  Neighbors: {
    getNeighbors(i, size) {
      let { x, y } = Utils.getCoordinates(i, size);
      return [
        {
          x: x,
          y: y + 1,
        },
        {
          x: x + 1,
          y: y,
        },
        {
          x: x,
          y: y - 1,
        },
        {
          x: x - 1,
          y: y,
        },
        {
          x: x + 1,
          y: y + 1,
        },
        {
          x: x - 1,
          y: y - 1,
        },
        {
          x: x + 1,
          y: y - 1,
        },
        {
          x: x - 1,
          y: y + 1,
        },
      ];
    },

    updateNeighbors(i, field, size, action) {
      const neighbors = this.getNeighbors(i, size);

      neighbors.forEach((neighbor) => {
        let currX = neighbor.x;
        let currY = neighbor.y;
        let currI = currX * size + currY;

        if (currX >= 0 && currX < size && currY >= 0 && currY < size) {
          if (field[currI] === Utils.bomb) return;

          if (action === 'inc') field[currI]++;
          if (action === 'dec') field[currI]--;
        }
      });

      return field;
    },
  },
};
