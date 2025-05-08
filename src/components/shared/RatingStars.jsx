import { FaStar, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= Math.floor(rating) ? 
      <FaStar key={i} className="text-yellow-400" /> : 
      <FaRegStar key={i} className="text-yellow-400" />
    );
  }
  return (
    <div className="flex items-center">
      {stars}
      <span className="ml-1 text-sm">({rating})</span>
    </div>
  );
};

export default RatingStars;