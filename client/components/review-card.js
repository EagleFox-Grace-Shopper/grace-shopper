import React from 'react'

export default function ReviewCard(props) {
  const review = props.review
  return (
    <div>
      <h4>
        {review.title}
      </h4>
      <h6>
        RATING: {review.rating}
      </h6>
      <p>
        {review.description}
      </p>
    </div>
  )
}
