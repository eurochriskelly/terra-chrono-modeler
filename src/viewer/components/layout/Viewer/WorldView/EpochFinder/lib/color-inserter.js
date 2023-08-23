export const COLOR_CHART = [
    '#ca9dd0', '#d3e066', '#a9c8f8', '#a8822c', '#df18e0', '#470d15',
    '#45784d', '#accc3a', '#6cec7a', '#4999a2', '#9fcbea', '#8d21e6',
    '#844878', '#e051ee', '#30caa2', '#76cc0c', '#9ad0dd', '#7f8572',
    '#eca53b', '#3bcb30', '#984cd4', '#1821ac', '#2c4811', '#df0492',
    '#3fb7f3', '#64ad94', '#fa13f4', '#83b35f', '#35e960', '#b87179',
    '#f85761', '#e4893c', '#240b46', '#3d44fd', '#b3b490', '#489307',
    '#333b17', '#3b066e', '#8538ce', '#1ec87f', '#c76367', '#354205',
    '#d8fe9f', '#ab7dd3', '#2afc88', '#ed9271', '#11dbc5', '#84cf56',
    '#11290c', '#a939f7', '#29d5fe', '#ae788d', '#d2a91b', '#211742',
    '#fda77d', '#a7ee3a', '#8b0e60', '#44eb0f', '#6b1e35', '#93d6ad',
    '#b71111', '#4978d4', '#a4693c', '#4b62b5', '#30461d', '#bb8184',
    '#ef48e1', '#fc83ba', '#59123e', '#f88acd', '#218178', '#1df9b9',
    '#14993e', '#dc77fc', '#a9cbe8', '#68f103', '#27a9d7', '#5500e9',
    '#6d5db1', '#a1e114', '#b6dd9a', '#4a71a0', '#eeb8d0', '#97ce97',
    '#9a0b27', '#8812a2', '#1bc579', '#c262df', '#bf3c76', '#da5e2c',
    '#3e48a8', '#f85190', '#2aca44', '#8b7e56', '#9e46d7', '#aaf7ba',
    '#f06876', '#56317d', '#99474d', '#334bcb'
]

export function generateRandomColors(num) {
    const randomColors = [];
    for (let i = 0; i < num; i++) {
        const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        randomColors.push(color);
    }
    return randomColors;
}

export function insertColors(periods, colors) {
    let colorIndex = 0;
    const colorCount = colors.length;

    function assignColor(node) {
        if (!node.color) {
            node.color = colors[colorIndex % colorCount];
            colorIndex++;
        }

        if (node.children) {
            for (let child of node.children) {
                assignColor(child);
            }
        }
    }

    for (let period of periods) {
        assignColor(period);
    }
}
