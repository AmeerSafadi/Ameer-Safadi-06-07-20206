import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Header.css'

export default class Header extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
        <div className = 'row'>
            <div className='div'>
                <div className='col-4'>
                    <Link to='/'>
                    <button type='button' className='btn btn-warning' id='Button'>Home</button>
                    </Link>
                </div>
                <div className='col-4'>
                    <Link to='/Favorite'>
                    <button type='button' className='btn btn-success' id='Buttons' >Favorite</button>
                    </Link>
                </div>
            </div>
        </div>
        )
    }
}
