/*https://reactjsexample.com/infinite-carousel-for-react/*/


import React, { Component } from 'react';
import Slider from 'infinite-react-carousel';
import '../../styles/layout.css';
import * as assetsAPI from '../../api/assets'




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
            console.log("Quotes ", quoteData);
            this.setState({ quote: quoteData })
        } catch (error) {

        }


    }

    render() {
        const settings = {
            arrows: false,
            autoplay: true,
            autoplaySpeed: 1000,
            duration: 6000,
            slidesToShow: 3
        };

        return (
            <div>
            <Slider {...settings} >
                {this.state.quote.map(function (quote,index) {

                    let result = 'result';
                    if(quote.change_percent <0){
                        console.log("resu");
                        result = quote.symbol + " - " + quote.change_percent;
                    }
                    else if (quote.change_percent > 0 ){
                    result = quote.symbol + " + " + quote.change_percent;
                    }

                    return (
                        <div key={`slider[${index}]`}>
                            <h3>{quote.symbol + quote.change_percent}</h3>
                        </div>
                    )


                })}

            </Slider>

        </div>



        );
    }

}

export default Carousel;
