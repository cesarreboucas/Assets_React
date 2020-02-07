/*https://reactjsexample.com/infinite-carousel-for-react/*/


import React, { Component } from 'react';
import Slider from 'infinite-react-carousel';
import '../../styles/layout.css';
import * as assetsAPI from '../../api/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,faArrowDown} from '@fortawesome/free-solid-svg-icons';





class Carousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quote: [{ symbol: "null" }]
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
                <h3>{this.result(quote)} {quote.symbol + ' ' + quotePercentage} </h3>
            </div>                    
        )
    }

    render() {
        const settings = {
            arrows: false,
            autoplay: true,
            autoplaySpeed: 1000,
            duration: 6000,
            slidesToShow: 5
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
