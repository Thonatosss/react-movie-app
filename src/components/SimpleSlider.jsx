import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MovieCard from "./MovieCard";
export function SimpleSlider({ movies }) {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    draggable: true,
    className: "w-full"
  };
  return (
    <Slider {...settings}>
      {movies.map((movie) => (
        <div>
          <MovieCard key={movie.id} movie={movie} width={200} />
        </div>
      ))}
    </Slider>
  );
}
