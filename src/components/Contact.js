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

        this.handleChange = this.handleChange.bind(this);
        this.handleClickSubmit = this.handleClickSubmit.bind(this);
    }


    handleChange(event) {

        const target = event.target;
        var value = target.value;
        const name = target.name;

        console.log("phone")
        if(name == "phone")
            value = this.formatPhone(value)

        this.setState({ [name]: value });
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



    handleClickSubmit() {


    }

    render() {
        return (
            <section id="contact" className=''>
                <h2 class="centered">Contact Form</h2>
                <h5 class="centered">Need a bigger order? Catering? Comments or concerns? Send us a message!</h5>

                <input onChange={this.handleChange} value={this.state.name} name="name" placeholder="Your Name" />


                <input onChange={this.handleChange} value={this.state.email} name="email" placeholder="Your email" /> 


                <input inputmode="numeric" pattern="[0-9]*" onChange={this.handleChange} value={this.state.phone} name="phone" placeholder="Your Phone Number" />
             
                <textarea onChange={this.handleChange} className='textBoxContact' placeholder='Write your message here!' name='message'/>

                <div class="form-send">
                    <button type="submit" class="btn btn-large" onClick={this.handleClickSubmit} >Send Message</button>

                </div>
            </section>
        )
    }

}

export default Contact;