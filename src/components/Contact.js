import React, { Component } from 'react';

class Contact extends Component {
    constructor(props) {
        super(props);



        this.state = {
            name: "",
            email: "",
            phone: "",
            message: "",
        }

        this.handleClickSubmit.bind(this);
    }


    handleChange(event) {

        const target = event.target;
        var value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }


    handleClickSubmit() {


    }

    render() {
        return (
            <section id="contact" className=''>
                <h2 class="centered">Contact Form</h2>

                <input onChange={this.handleInputChange} value={this.state.contactName} name="contantName" placeholder="Your Name" />


                <input onChange={this.handleInputChange} value={this.state.contactEmail} name="email" placeholder="Your email" />


                <input inputmode="numeric" pattern="[0-9]*" onChange={this.handleInputChange} value={this.state.contactPhone} name="contactPhone" placeholder="Your Phone Number" />


                <div class="form-send">
                    <button type="submit" class="btn btn-large" onClick={this.handleClickSubmit} >Send Message</button>

                </div>
            </section>
        )
    }

}

export default Contact;