import axios from 'axios';
import React from 'react'
import {useEffect} from 'react'

const CheckUse = () => {
    useEffect(() => {
        console.log('useffec called ');
        axios.get('https://api.github.com/repos/facebook/react/issues').then(function(result){
            console.log(result);
        })
        
      },[]);



  return (
    <div>CheckUse</div>
  )
}

export default CheckUse