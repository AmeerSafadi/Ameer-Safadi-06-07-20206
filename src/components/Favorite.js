import React, { Component } from 'react'
import './Favorite.css'
import {Link} from 'react-router-dom'

export default class Favorite extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
        }
    }

    // showing your favorite city in button , you can click and see the weather condition
    render() {
        return (
            <div>
               {this.props.favoriteCity.map((e,index)=>{
                return(
                <div className='div3'>
                    <Link to={`/Add/${e.name}`}><button className='btn btn-info' id='button'>
                        {e.name} 
                        <hr></hr>
                        {e.degree} 
                        <hr></hr>
                        {e.description}
                    </button>
                    </Link>
                    <button type='button' className='btn btn-danger' id='removebutton' onClick={()=>{this.props.del(index)}}>Remove from Favorites</button>
                </div>
                )
            })}
            </div>
        )
    }
}
