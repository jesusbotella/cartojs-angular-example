const buildStyle = function(data, colors) {
    const rules = data.bins.map((bin, i) => _createRule(bin, colors[i])).join('');

    return `
        #layer {
        marker-width: 10;
        marker-fill-opacity: 0.7;
        marker-allow-overlap: false;
        marker-line-width: 0;
        marker-comp-op: multiply;
        ${rules}
        }
    `;
}

const _createRule = function(bin, color) {
    return `
        [price >= ${bin.start}] {
            marker-fill: ${color};
        }
`;
}

export { buildStyle };
