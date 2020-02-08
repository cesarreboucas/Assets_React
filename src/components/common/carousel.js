/*https://reactjsexample.com/infinite-carousel-for-react/*/


import React, { Component } from 'react';
import Slider from 'infinite-react-carousel';
import '../../styles/layout.css';
import * as assetsAPI from '../../api/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,faArrowDown} from '@fortawesome/free-solid-svg-icons';
//import { nsend } from 'q';





class Carousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quote: [{ symbol: "null" }],
            nSlides : Math.floor(window.innerWidth/200)
        };

    }

    async componentDidMount() {

        try {
            const quoteData = await assetsAPI.getQuotes();
            //console.log("Quotes ", quoteData);
            this.setState({ quote: quoteData })
        } catch (error) {

        }

       
    }

    result = (quote) => {

        let  quotePercentage = "null";
        
        if(quote.change_percent != null)
            quotePercentage = quote.change_percent;

        if( quotePercentage.charAt(0) === "-"){
            //console.log("result negative");
             return  <FontAwesomeIcon id='arrow-down' icon={faArrowDown}/> ;
        }

        else{
            //console.log("result positive");
             return  <FontAwesomeIcon id='arrow-up' icon={faArrowUp}/> ;
        }       
    }

    listQuotes = (quote, index) => {

        if(quote.change_percent != null){
            var quotePercentage = quote.change_percent;
            quotePercentage= quotePercentage.substring(0,  quotePercentage.length - 3) + "%";
            //console.log("Index is: ", quotePercentage);
        }
        
        return (
            <div key={`slider[${index}]`}>
                <span style={{fontSize:'0.8rem'}}>{this.result(quote)} {quote.symbol + ' ' + quotePercentage} </span>
            </div>                    
        )
    }

    onResize = () => {
        //console.log("CALLED");
        this.setState({nSlides : Math.floor(window.innerWidth/200)});
    }

    render() {
        //let nSlides = Math.floor(window.innerWidth/256) ;

        console.log('Screen X',this.state.nSlides);

        const settings = {
            arrows: false,
            autoplay: false,
            autoplaySpeed: 1000,
            duration: 6000,
            onResize:this.onResize,
            slidesToShow: this.state.nSlides
            
        };

        return (
            <div>
            <Slider {...settings} >
                {this.state.quote.map(this.listQuotes)}
            </Slider>

        </div>
        );
    }

}

export default Carousel;
