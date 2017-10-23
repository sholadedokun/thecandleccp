import React, {Component} from 'react';
export default class Map extends(Component){
  shouldComponentUpdate(){
      return false
  }
  componentDidMount(){

        var lagos = {lat: 6.462027 , lng:3.364082 };
        var map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: lagos
        });

        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">lagos</h1>'+
            '<div id="bodyContent">'+
            '<p><b>lagos</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and lagos are the two major '+
            'features of the lagos - Kata Tjuta National Park. lagos is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. lagos is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: lagos, <a href="https://en.wikipedia.org/w/index.php?title=lagos&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=lagos</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';

        var infowindow = new window.google.maps.InfoWindow({
          content: contentString
        });

        var marker = new window.google.maps.Marker({
          position: lagos,
          map: map,
          title: 'lagos (Ayers Rock)'
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

  }
  render(){
    const style={
        frontPage:{
            height: "350px",
        },
        addCampaign:{
            height: "100vh",
        }
    }
    const {size}=this.props
    return(
      <div id="map" style={style[size]} ></div>
    )
  }
}
