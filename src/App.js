import React from 'react';
import './App.css';
import * as d3 from 'd3';


class App extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() { 
    let svg = d3.select('.Canvas');
    svg.style('height', this.props.height);
    svg.style('width', this.props.width);
    
    let stats = [
      {
        max: 80,
        min: 50,
        hour: 0
      },
      {
        max: 20,
        min: 10,
        hour: 1
      },
      {
        max: 200,
        min: 50,
        hour: 2
      },
      {
        max: 150,
        min: 105,
        hour: 3
      },
      {
        max: 80,
        min: 30,
        hour: 4
      }      
    ];

    let yScale = d3.scaleLinear()
        .domain([d3.max(d => d.max), 0])
        .range(0, this.props.height)

    let xBarScale = d3.scaleBand()
    .domain([0,1,2,3,4])
    .range([0, this.props.width])
    .paddingInner(.05)
    .paddingOuter(.05)

    console.log(xBarScale(1))


    svg.selectAll('rect')
        .data(stats)
        .enter()
        .append('rect')
        .attr('y', d => this.props.height - d.max) 
        .attr('x', d => xBarScale(d.hour))
        .attr('width', xBarScale.bandwidth())
        .attr('height', d => d.min)
        .style('fill', 'none')
        .style('stroke', 'red')
        .style('stroke-width', 1)
    
    
  }

  render() {
    return (
      <div className="Container">
        <svg  className='Canvas'/>
      </div>
    );
  }
}

export default App;
