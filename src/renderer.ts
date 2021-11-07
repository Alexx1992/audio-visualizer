import * as d3 from 'd3';

const svgEl = document.getElementById('svgEl')!;
const svgWidth = svgEl.clientWidth;
const svgHeight = svgEl.clientHeight;

const barPadding = 2;
const barWidth = 2;
const barCount = Math.floor(svgWidth / (barWidth + barPadding));
const defaultDataSet: number[] = Array(barCount).fill(0);

const container = d3.select('svg');
const bars = container.selectAll('.bar')
  .data(defaultDataSet)
  .enter()
  .append('rect')
  .classed('bar', true)
  .attr('y', i => svgHeight - (i / 2))
  .attr('height', i => i / 2)
  .attr('width', barWidth)
  .attr('transform', (_, i) => {
    const translate = [(barWidth + barPadding) * i];
    return `translate(${translate})`;
});

function updateRenderer(audioData: Uint8Array) {
  bars.data(audioData)
      .attr('y', i => svgHeight - (i / 2))
      .attr('height', i => i / 2);
}

export default updateRenderer;