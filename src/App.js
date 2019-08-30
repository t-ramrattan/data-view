import React from 'react';
import './App.css';
import * as d3 from 'd3';


class App extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const svg = d3.select('.Canvas');
    const padding = 40;
    const yPadding = 10;
    const margin = 35;
    svg.style('height', this.props.height);
    svg.style('width', this.props.width + 5);

    let stats = [
      {
        max: 80,
        min: 50,
        hour: 0
      },
      {
        max: 20,
        min: 0,
        hour: 1
      },
      {
        max: 200,
        min: 120,
        hour: 2
      },
      {
        max: 100,
        min: 85,
        hour: 3
      },
      {
        max: 80,
        min: 30,
        hour: 4
      }
    ];

    const maxHeight = d3.max(stats, d => d.max);
    let yScale = d3.scaleLinear()
      .domain([maxHeight, 0])
      .range([0, this.props.height - padding])

    console.log(yScale(80))

    let xBarScale = d3.scaleBand()
      .domain([0, 1, 2, 3, 4])
      .range([0, this.props.width - padding])
      .padding(.02);

    svg.append('g')
      .attr('transform', `translate(${margin},0)`)
      .selectAll('rect')
      .data(stats)
      .enter()
      .append('rect')
      .attr('class', 'box')
      .attr('y', d => yScale(d.max - yPadding))
      .attr('x', d => xBarScale(d.hour))
      .attr('width', xBarScale.bandwidth())
      .attr('height',d => yScale(maxHeight - (d.max - d.min)))
      .style('fill', 'none')
      .style('stroke-width', 1)
      .style('stroke-dasharray', '5,5');

    let xAxisScale = d3.scaleLinear()
      .domain([0, 5])
      .range([0, this.props.width - padding])

    let yAxis = d3
      .axisLeft(yScale)
      .ticks(10);

    let xAxis = d3
      .axisBottom(xAxisScale)
      .ticks(5);
    
    svg.append('g')
      .call(xAxis)
      .attr('class', 'xAxis')
      .attr('transform', `translate(${margin},${parseInt(this.props.height - padding + yPadding + 5)})`);

    svg.append('g')
      .call(yAxis)
      .attr('transform', `translate(${margin},${yPadding + 5})`)
      .attr('class', 'yAxis');
      ;

  }

  render() {
    return (
      <div className="Container">
        <svg className='Canvas' />
      </div>
    );
  }
}

export default App;
