import React, { Component } from 'react'
import './App.css'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Main from './components/Main'
import Favorite from './components/Favorite'
import Header from './components/Header'
import Add from './components/Add'
const key = 'P5EIslESp9iFTYb8nGp5BP1aVYU1xVrI' // My Api Key

export default class App extends Component {

  state = {
    city:[],
    iD:'215854',
    name:'Tel aviv',
    degree:'26.5C',
    description:'Some clouds',
    days:[{Date : '2020-07-05T07:00:00+03:00',Temperature:{Maximum : {Value : '30.8' , Unit : 'C'},Minimum : {Value : '26.1' , Unit : 'C'}}},
          {Date : '2020-07-06T07:00:00+03:00',Temperature:{Maximum : {Value : '30.2' , Unit : 'C'},Minimum : {Value : '24.5' , Unit : 'C'}}},
          {Date : '2020-07-07T07:00:00+03:00',Temperature:{Maximum : {Value : '30.5' , Unit : 'C'},Minimum : {Value : '23.5' , Unit : 'C'}}},
          {Date : '2020-07-08T07:00:00+03:00',Temperature:{Maximum : {Value : '31.1' , Unit : 'C'},Minimum : {Value : '24.8' , Unit : 'C'}}},
          {Date : '2020-07-09T07:00:00+03:00',Temperature:{Maximum : {Value : '29.6' , Unit : 'C'},Minimum : {Value : '24.1' , Unit : 'C'}}}],
    favoriteCity : [] ,
  }

  // Add Favorite City to new array
  addFavoriteCity=()=>{
    this.setState({
      favoriteCity:[...this.state.favoriteCity,{iD:this.state.iD,name:this.state.name,description:this.state.description,degree:this.state.degree,day1:this.state.days}]
    })
    for(let i =0 ; i<this.state.favoriteCity.length;i++){
      if(this.state.name === this.state.favoriteCity[i].name){
        alert('Your city is in favorite') 
        this.setState({favoriteCity:[...this.state.favoriteCity]})
      }      
    }
  }

  // Delete City from Favorites
  del=(i)=>{
    const delFav = this.state.favoriteCity.filter((element,index)=>(index!=i))
    this.setState({favoriteCity:[...delFav]})
  }

  // Get detailes of the city that you want to know her weather
  getWeather = async (e) =>{
    const replacment = e.target.elements.replacment.value;
    if((replacment)&&(((replacment>='a')&&(replacment<='z'))||((replacment>='A')&&(replacment<='Z')))){
    e.preventDefault();
    const api_cal = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${replacment}&language=en-us`);
    const data = await api_cal.json();    
    this.setState({city:data});
    this.state.city.forEach(element => {
      this.setState({
          iD:element.Key,name:element.LocalizedName,name2:element.LocalizedName
      })
    });
    
    // Get Current weather of the city you want
    const api_cal1 = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${this.state.iD}?apikey=${key}&language=en-us`);
    const data1 = await api_cal1.json(); 
    this.setState({
      description:data1[0].WeatherText,
      degree:data1[0].Temperature.Metric.Value + data1[0].Temperature.Metric.Unit
    })  
        
    // Get the weather condition for the next 5 days
    const api_cal2 = await fetch(` http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.state.iD}?apikey=${key}&language=en-us&metric=true`);
    const data2 = await api_cal2.json(); 
    this.setState({
      days:[...data2.DailyForecasts]
    })
      this.setState({city:[...data,data1,data2]});
    }else{
      alert('Pelase Enter Name in English letters only')
    }
  }


  render() {
    return (
      <div>
          <Router>
            <p id='title'>Weather App Task</p>  
            <Header/>
            <Switch>
              <Route exact path = '/' component = {()=>{return <Main add={this.addFavoriteCity} get={this.getWeather} favoriteCity={this.state.favoriteCity} days={this.state.days} name={this.state.name} description={this.state.description} degree={this.state.degree} />}}/>
              <Route exact path='/Favorite' component = {()=>{return <Favorite del={this.del} favoriteCity={this.state.favoriteCity} />}}/>
              {this.state.favoriteCity.map((e,i)=>{
              return(
                <Route exact path = {`/Add/${e.name}`} component = {()=>{return <Add name={e.name} degree={e.degree} description={e.description} day1={e.day1} index={i} />}}/>
              )
            })}
            </Switch>
          </Router>
      </div>
    )
  }
}