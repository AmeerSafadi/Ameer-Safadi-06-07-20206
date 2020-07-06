import React, { Component } from 'react'
import './Main.css'
import moment from 'moment'
import {Link} from 'react-router-dom'

export default class Main extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             city:props.city,
        }
    }

    render() {
        return (
            <div>
            <form onSubmit={this.props.get}>
                <input type='text' placeholder='🔍Enter your city' id='search' name='replacment' />
                <div className='div1'>
                <p id='description'>{this.props.description}</p>
                <p id='name'>{this.props.name}</p>
                <p id='degree'>{this.props.degree}</p>
                <hr></hr>
                {this.props.days.map((e,i)=>{
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
            </form>
            <Link to='/Favorite'> <button onClick={()=>{this.props.add(this.props.favoriteCity.name,this.props.favoriteCity.description,this.props.favoriteCity)}} type='button' className='btn btn-info' id='addbutton'> Add to Favorites </button> </Link>
            </div>
        )
    }
}
