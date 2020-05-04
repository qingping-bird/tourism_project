import React from 'react';
import Banner from '../components/banner/Banner';
import HotItem from '../components/hotItem/HotItem';
import SeasonProject from '../components/seasonProject/SeasonProject';
import NearbyFun from '../components/nearbyFun/NearbyFun';

export default class Home extends React.Component{
  render(){
      return(
        <>
        <Banner />
        <HotItem />
        <SeasonProject />
        <NearbyFun />
        </>
      );
  }
}