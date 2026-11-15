import React from 'react'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import CityItem from './CityItem'
import PropTypes from 'prop-types'
import Message from './Message'


CityList.propTypes = {
    cities: PropTypes.array.isRequired,
    isloading: PropTypes.bool
}

function CityList({ cities, isloading }) {
  
    if(isloading) {
        return <Spinner/>
    }

    if(!cities.length){
        return <Message message="Add your first city by clicking on a city on the map "/>
    }

    return (
    <ul className={styles.cityList} >
        {Array.isArray(cities) && cities.map((city) => (
                <CityItem city={city} key={city.id}/>
        ))}
    </ul>
  )
}

export default CityList