import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useState } from 'react'
import { Avatar } from '../Avatar/Avatar'
import { Comment } from '../Comments/Comment'
import styles from './Post.module.css'

export function Post({author, content, publishedAt}){
  const[comments,setComments] = useState([
    'Muito daora!',
  ])

  const [newComment, setNewComment] = useState('')
  const isNewCommentEmpty = newComment.length === 0;

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  }) 

  function handleRemoveComment(commentToDelete){
    const commentsWithoutDeletedOne = comments.filter(comment => comment !== commentToDelete)

    setComments(commentsWithoutDeletedOne)
  }

  function handleAddNewComment(){
    event.preventDefault()

    if(newComment === ''){
      return
    }
    
    setComments([...comments, newComment])
    setNewComment('')

  }

  function handleNewCommentChange(){
    event.target.setCustomValidity('')
    setNewComment(event.target.value)
  }

  function handleInvalidComment(){
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  return(
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time 
          title={publishedDateFormatted} 
          dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
          </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if(line.type === 'paragraph'){
            return <p key={line.content} >{line.content}</p>
          }else if(line.type === 'link'){
              return <p key={line.content}><a href="#">{line.content}</a></p>
            }
        })}

      </div>

      <form onSubmit={handleAddNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea 
          placeholder='Deixe um comentário'
          value={newComment}
          onChange={handleNewCommentChange}
          onInvalid={handleInvalidComment}
          required
        />

        <footer>
          <button 
            type='submit'
            disabled={isNewCommentEmpty}
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment =>{
          return(
            <Comment 
            key={comment}
            content={comment}
            handleRemoveComment={handleRemoveComment}  
            />
          )
        })}
      </div>
    </article>
  )
}