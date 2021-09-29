import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import useSlides from "../hooks/useSildes";
import "./Home.scss";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home = () => {
  const slides = useSlides();

  return (
    <div className="home-page">

      {slides.hasLoaded && (
        <div className="home-banner">
          <Carousel
            responsive={responsive}
            swipeable={false}
            draggable={false}
            showDots={true}
            infinite={true}
            keyBoardControl={true}
            // autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={1000}
            transitionDuration={500}
          >
            {slides.state.reverse().map((slide, i) => (
              <div className="slide">
                <img src={slide.image} width="100%" alt="" />

                <span>
                  <h2>{slide.heading}</h2>
                  <p>{slide.caption}</p>
                </span>
              </div>
            ))}
          </Carousel>
        </div>
      )}
      <div className="show-case">
        <div className="women-collection">
            
        </div>
      </div>
    </div>
  );
};

export default Home;
