export const Utils = {
  getCoordinates(i) {
    let x = Math.floor(i / Utils.params.size);
    let y = i - x * Utils.params.size;

    x = x < 0 ? 0 : x;
    y = y < 0 ? 0 : y;

    return { x, y };
  },

  findNotBomb(field) {
    let j = Math.floor(Math.random() * field.length);

    if (j < field.length / 2) {
      while (field[j] === -1) {
        j++;
      }
    } else {
      while (field[j] === -1) {
        j--;
      }
    }
    return j;
  },

  params: {
    size: 16,
    bombAmount: 40,
    bomb: -1,
  },

  Neighbors: {
    getNeighborsCoordinates(i) {
      let { x, y } = Utils.getCoordinates(i);
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
      ].filter((el) => el.x >= 0 && el.y >= 0 && el.x < Utils.params.size && el.y < Utils.params.size);
    },

    getNeighborsIndexes(i) {
      const neighborsCoordinates = this.getNeighborsCoordinates(i);

      return neighborsCoordinates.map((coordinates) => {
        let currX = coordinates.x;
        let currY = coordinates.y;

        return currX * Utils.params.size + currY;
      });
    },

    updateNeighbors(i, field, action) {
      const neighborsIdxs = this.getNeighborsIndexes(i);

      neighborsIdxs.forEach((neighborIdx) => {
        if (field[neighborIdx] === Utils.params.bomb) return;

        if (action === 'inc') field[neighborIdx]++;

        if (action === 'dec' && field[neighborIdx] !== 0) field[neighborIdx]--;
      });

      return field;
    },

    checkNeighbors(i, field) {
      const neighborsIdxs = this.getNeighborsIndexes(i);
      let res = false;

      for (let i = 0; i < neighborsIdxs.length; i++) {
        if (field[neighborsIdxs[i]] === -1) {
          res = true;
          break;
        }
      }

      return res;
    },

    getAmountNeighborsBomb(i, field) {
      const neighborsIdxs = this.getNeighborsIndexes(i);

      let bombNeighborsCount = neighborsIdxs.reduce((bombCount, neighborIdx) => {
        return field[neighborIdx] === -1 ? ++bombCount : bombCount;
      }, 0);

      return bombNeighborsCount;
    },
  },
};
