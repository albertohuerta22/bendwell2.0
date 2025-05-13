import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import './Reviews.scss';

interface Review {
  name: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  {
    name: 'Lea',
    rating: 5,
    text: 'I sit 12 hours a day. These stretches are a lifesaver!',
  },
  {
    name: 'Kall',
    rating: 5,
    text: 'Never thought I’d be flexible like this. Highly recommend!',
  },
  {
    name: 'Eric',
    rating: 5,
    text: 'Helped my back from marathon Zoom meetings.',
  },
  { name: 'Jane', rating: 5, text: 'Super easy and fun to follow!' },
  { name: 'Luis', rating: 5, text: 'Perfect for breaks between coding.' },
  { name: 'Sara', rating: 5, text: 'Reminds me to sit up straight!' },
  {
    name: 'Tom',
    rating: 5,
    text: 'Stretching has never been this convenient.',
  },
  { name: 'Emily', rating: 5, text: 'Love the guided visuals!' },
  { name: 'Mark', rating: 5, text: 'Can’t go a day without it now.' },
];

// 👉 helper: splits reviews into arrays of 3
const chunkArray = <T,>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
};

const Reviews: FC = () => {
  const slides = chunkArray(reviews, 3); // group of 3 per slide

  return (
    <div className="testimonial-carousel">
      <h2>Users Love Our Program</h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop
        slidesPerView={1}
      >
        {slides.map((group, i) => (
          <SwiperSlide key={i}>
            <div className="review-group">
              {group.map((review, idx) => (
                <div className="testimonial-card" key={idx}>
                  <h3>{review.name}</h3>
                  <div className="stars">{'⭐'.repeat(review.rating)}</div>
                  <p>{review.text}</p>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
