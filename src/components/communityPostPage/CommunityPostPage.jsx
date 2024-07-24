import React from 'react'
import './CommunityPostPage.scss'
import CommunityPost from '../communityPost/CommunityPost'

const CommunityPostPage = ({posts}) => {
  return (
    <div className='CommunityPostPage'>
      {posts.map((post, index) => (
        <CommunityPost
          key={index}
          imageSrc={post.imgUrl}
          description={post.content}
          likes={post.totalLikes}
          comments={post.totalComments}
          name={post.userId}
        />
      ))}
    </div>
  )
}

export default CommunityPostPage
