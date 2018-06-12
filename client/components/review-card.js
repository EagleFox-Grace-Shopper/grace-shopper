import React from 'react'

export default function ReviewCard(props) {
  const review = props.review
  return (
    <div>
      <h1>
        {review.description}
      </h1>
      <p>
        what is going on?
      </p>
    </div>
  )
}
