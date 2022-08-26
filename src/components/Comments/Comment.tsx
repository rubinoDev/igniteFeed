import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react';
import { Avatar } from '../Avatar/Avatar'
import styles from './Comment.module.css'

export function Comment({content, handleRemoveComment}){
  const [likeCount, setLikeCount] = useState(0);

  function handleAddLikes(){
    setLikeCount(prevState => prevState + 1)
  }
  return(
    <div className={styles.comment}>
      <Avatar hasBorder={false} src= 'https://github.com/maykbrito.png'/>
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Víctor Rubiño</strong>
              <time>Cerca de 1h atrás</time>
            </div>

            <button 
            title='Deletar comentário'
            onClick={() => handleRemoveComment(content)}
            >
              <Trash size={24}/>
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button
            onClick ={handleAddLikes}
          >
            <ThumbsUp/>
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}