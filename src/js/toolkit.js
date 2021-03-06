const matrixToolkit = {
    makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v)
        return array;
    },

    makeMatrix(v = 0) {
        return Array.from({length: 9}, () => this.makeRow(v))
    },

    /**
     * Fisher-Yates 洗牌算法
     */
    shuffle(array) {
        const endIndex = array.length - 2;
        const length = array.length;
        for (let i = 0; i < endIndex; i++) {
            let j = i + Math.floor(Math.random() * (length - i));
            [array[j], array[i]] = [array[i], array[j]];
        }
        return array;
    }
};


module.exports = matrixToolkit;