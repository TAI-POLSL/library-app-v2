import React, { useState, useEffect } from 'react'
import APIService from './APIService'

function Form(props) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    setTitle(props.article.title)
    setBody(props.article.body)
  }, [props.article])

  const updateArticle = () => {
    APIService.UpdateArticle(props.article.id, { title, body })
      .then(resp => props.updatedData(resp))
      .catch(error => console.log(error))
  }

  const insertArticle = () => {
    APIService.InsertArticle({title, body})
    .then(resp => props.insertedArticle(resp))
    .catch(error => console.log(error))
  }

  return (
    <div>
      {/* poniżej został użyty if, jeśli props.article jest true to się wykona to co jest w nawiasie, jeśli nie to to co jest po dwókropku czyli null */}
      {props.article ? (
        <div className="mb-3">
          <label
            htmlFor="title"
            className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            placeholder="Please Enter Title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <label
            htmlFor="body"
            className="form-label">Description</label>
          <textarea
            rows="5"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="form-control"
            placeholder="Pleace Enter Description"
          />

          {props.article.id ? <button
            onClick={updateArticle}
            className="btn btn-success mat-3">Update</button>
            : <button
              onClick={insertArticle}
              className="btn btn-success mat-3">Insert</button>
          }
        </div>
      ) : null}


    </div>
  )
}

export default Form
