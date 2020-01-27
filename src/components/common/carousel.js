/*https://www.npmjs.com/package/pure-react-carousel*/

import React,{ Component }  from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';



class Carousel extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        remember: false,
        redirectToAssets: false
      };
    }



    render() {
      return (
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={120}
          totalSlides={3}
          isPlaying={true}
          infinite={false}
          interval={5000}
        
          >

        <Slider classNameAnimation="Animation">
          <Slide index={0}>I am the first Slide.</Slide>
          <Slide index={1}>I am the second Slide.</Slide>
          <Slide index={2}>I am the third Slide.</Slide>
          <Slide index={3}>I am the four Slide.</Slide>
          <Slide index={4}>I am the five Slide.</Slide>
          <Slide index={5}>I am the six Slide.</Slide>
          <Slide index={6}>I am the four Slide.</Slide>
          <Slide index={7}>I am the five Slide.</Slide>
          <Slide index={8}>I am the six Slide.</Slide>
        </Slider>
 

        </CarouselProvider>
      );
    }

}



    export default Carousel;
