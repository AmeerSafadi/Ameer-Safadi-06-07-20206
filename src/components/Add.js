import React, { Component } from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'

export default class Add extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    // showing the weather condition of your favorite city
    render() {
        return (
        <div>
            <div className='div1'>
                <p id='description'>{this.props.description}</p>
                <p id='name'>{this.props.name}</p>
                <p id='degree'>{this.props.degree}</p>
                <hr></hr>
                {this.props.day1.map((e,i)=>{
                    return (
                    <div className='div2'>
                        <br></br>
                        <p>{moment(e.Date).format('dddd')}</p>
                        <p>{moment(e.Date).format('Do MMM YY')}</p>
                        <hr></hr>
                        <p> Maxtemp : {e.Temperature.Maximum.Value}&deg;{e.Temperature.Maximum.Unit}</p>
                        <hr></hr>
                        <p> Mintemp : {e.Temperature.Minimum.Value}&deg;{e.Temperature.Maximum.Unit}</p>
                    </div>
                    )
                })}
            </div>
            <Link to = '/Favorite'> <button className='btn btn-danger' style={{position:'relative',left:'1250px',top:'150px'}}> X </button></Link>    
        </div>
        )
    }
}