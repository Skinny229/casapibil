import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import TacoKitOption from './order/TacoKitOption';
import config from '../config'
import isEmail from 'validator/lib/isEmail'

const topBarImage = "images/AdobeStock_468881483.jpeg";

const AG = config.apiGateway;

const endpoint = ('https://' + AG.id + '.execute-api.' + AG.region + '.amazonaws.com/' + AG.stageName + '/order');
const todaysDate = new Date();


class Order extends Component {



    constructor(props) {
        super(props);




        this.state = {
            contactName: "",
            contactEmail: "",
            contactPhone: "",
            orderCountSmall: 0,
            orderCountLarge: 0,
            specialRequests: " ",
            datePicked: "",
            orderSubmited: false,
            dropdownSelectedSmall: true,
            dropdownSelectedLarge: true,
            onCheckout: false,

        }


        this.changeDate = this.changeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.isValidDeliveryDate = this.isValidDeliveryDate.bind(this);
        this.onChangeOrder = this.onChangeOrder.bind(this);
        this.generateSummaryItem = this.generateSummaryItem.bind(this);
    }



    handleInputChange(event) {

        const target = event.target;
        var value = target.value;
        const name = target.name;
        console.log(target);

        switch (name) {
            case "contactPhone":
                value = this.formatPhone(value);
                break;
                default:
        }

        this.setState({
            [name]: value
        });
    }


    onChangeOrder(event) {
        const value = event.value
        if (event.name[0] === "1")
            this.setState({
                orderCountSmall: value
            })
        if (event.name[0] === "2")
            this.setState({
                orderCountLarge: value
            })
    }




    formatPhone(value) {
        if (!value) return value;

        const phoneNumber = value.replace(/[^\d]/g, '');

        const phoneNumberLength = phoneNumber.length;



        if (phoneNumberLength < 4) return phoneNumber;


        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }

        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
        )}-${phoneNumber.slice(6, 10)}`;
    }

    changeDate(date) {
        this.setState({
            datePicked: date
        });

    }








    handleSubmit() {

        //ValidateData
        const state = this.state;

        var errors = [];
        if (state.contactName.length < 3)
            errors.push('Name not long enough')
        if (!isEmail(state.contactEmail))
            errors.push('Invalid Email')
        if (this.formatPhone(state.contactPhone).length < 10)
            errors.push('Invalid Phone')
        if (!state.datePicked || !this.isValidDeliveryDate(state.datePicked))
            errors.push('Invalid Date')
        if (state.orderCountLarge === 0 && state.orderCountSmall === 0)
            errors.push('Nothing Ordered')



        if (errors.length === 0)
            axios.post(endpoint, {
                contactName: this.state.contactName,
                contactEmail: this.state.contactEmail,
                contactPhone: this.state.contactPhone,
                orderCountSmall: this.state.orderCountSmall,
                orderCountLarge: this.state.orderCountLarge,
                deliveryDate: this.state.datePicked,
                specialRequests: " "
            });
        else
            alert(errors)
    }




    isValidDeliveryDate(date) {
        const day = date.getDay();
        return (date > todaysDate && (day === 1 || day === 5));
    };

    generateSummaryItem(name, count, price) {
        return <div className='orderSummaryItem'>
            <p>{name} x {count}</p>
            <p>${count * price}</p>
        </div>
    }


    render() {

        //Exlcude DeliveryDates
        const minDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDay() + 1);
        const maxDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth() + 2, todaysDate.getDay());

        if (config.menuItems) {
            var listings = config.menuItems.map((menuItem) => <TacoKitOption key={menuItem.kitName} onChange={this.onChangeOrder} data={menuItem} />)
        }


        var summary = [];

        if (this.state.orderCountLarge !== 0) {
            summary.push(this.generateSummaryItem('2 Pound Kit', this.state.orderCountLarge, 35));
        }
        if (this.state.orderCountSmall !== 0) {
            summary.push(this.generateSummaryItem('1 Pound Kit', this.state.orderCountSmall, 25));
        }







        return (
            <section id="order" className="order">

                <div className=" rowOrder bannerOrder">
                    <img src={topBarImage} />
                </div>
                <div className="menuForm" >
                    <div className="menuRow">
                        <h1>Taco Entree Kits</h1>

                        {listings}


                    </div>

                    <div class="rightSideOrder">
                        <div className='checkout'>
                            <div className='orderSummary'>
                                <h2>Order summary</h2>
                                <h8>We will contactly you shortly after you place your order</h8>

                                {summary}


                            </div>

                          
                                <input onChange={this.handleInputChange} value={this.state.contactName} name="contactName" className='orderSummaryInput' placeholder="Your Name" />

                         
                                <input onChange={this.handleInputChange} value={this.state.contactEmail} className="orderSummaryInput" name="contactEmail" placeholder="Your email" />
                           
                         
                                <input  inputmode="numeric" pattern="[0-9]*" onChange={this.handleInputChange} value={this.state.contactPhone} name="contactPhone" className="orderSummaryInput" placeholder="Your Phone Number" />

                            
                            <div className='dateContainer'>
                                <DatePicker
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    selected={this.state.datePicked}
                                    filterDate={this.isValidDeliveryDate}
                                    onChange={this.changeDate}
                                    placeholderText='Select a Delivery Date'
                                />
                            </div>
                            <button onClick={this.handleSubmit}>Submit Order</button>
                        </div>
                    </div>
                </div>
            </section>

        )
    }

}

export default Order;