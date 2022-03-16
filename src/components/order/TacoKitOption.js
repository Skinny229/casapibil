import React, { Component } from 'react';
import Select from 'react-select';



const options = [{
  value: 0, label: 0
}, {
  value: 1, label: 1
}, {
  value: 2, label: 2
}, {
  value: 3, label: 3
}];

class TacoKitOption extends Component {


  constructor(props) {
    super(props)

    this.state = {
      hasNotBeenClicked: true,
      kitCountSelection: null
    }

    this.handleChange = this.handleChange.bind(this);
  }



  handleChange(event) {
    this.setState({
      kitCountSelection: event
    })
    event.name = this.props.data.kitName;
    this.props.onChange(event);
  }



  render() {


    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderColor: '#9e9e9e',
        minHeight: '30px',
        height: '30px',
        fontSize: '14px',
        boxShadow: state.isFocused ? null : null,
      }),

      valueContainer: (provided, state) => ({
        ...provided,
        height: '30px',
        padding: '0 6px'
      }),

      input: (provided, state) => ({
        ...provided,
        margin: '0px',
      }),
      indicatorSeparator: state => ({
        display: 'none',
      }),
      indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '30px',
      }),
    };
    return (
      <div className='menuItemContainer'>

        <img className="kitImage" src={this.props.data.imgsrc} alt={this.props.data.altsrc} />

        <h3 className='kitName'>{this.props.data.kitName}</h3>
        <div className='kitPrice'>
          <p>{"$" + this.props.data.kitPrice}</p>
        </div>
        <p className='kitDescription'> {this.props.data.kitDescription}</p>
        <div className='kitDropdown'>
          <Select styles={customStyles} options={options} value={this.state.kitCountSelection} onChange={this.handleChange} placeholder={"Order"} isSearchable={false} />
        </div>


      </div>
    )
  }

}



export default TacoKitOption;