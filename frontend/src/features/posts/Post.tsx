import React, { useEffect, useState } from 'react'
import ButtonGroup from './ButtonGroup';

function Post(props: any) {
  const [title, setTitle] = useState(props.post.title);
  const [body, setBody] = useState(props.post.body);
  const [isEditing, setIsEditing] = useState(props.postToEdit === props.post.id);

  useEffect(() => {
    setIsEditing(props.postToEdit === props.post.id);
  }, [props.postToEdit, props.post.id])

  function submitHandler(e:any) {
    e.preventDefault();
    const formData = {
      post: {
        id: props.post.id,
        title: title,
        body: body,
      }
    }
    props.submitEdit(formData);
    resetState();
  }

  function resetState() {
    setTitle('');
    setBody('')
  }

  const titleElement = <h2 className='title text-start'>{props.post.title}</h2>;
  const bodyElement = <p className='card-text text-start'>{props.post.body}</p>;

  const editableTitle = <input type="text" className='form-control text-start' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />;
  const editableBody = <input type="text" className='form-control text-start' name='title' value={body} onChange={(e) => setBody(e.target.value)} />;

  const submitButton = <button type="submit" className='form-control' onClick={(e) => submitHandler(e)}>編集</button>;

  return (
    <div>
        <div className="row">
          <div className="col-8">
            {isEditing ? editableTitle : titleElement}
          </div>
          <div className="col-4">
            <ButtonGroup 
              post_id={props.post.id}
              dispatch={props.dispatch}
              toggleEditForm={props.toggleEditForm}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            {isEditing ? editableBody : bodyElement}
          </div>
          <div className="row">
            <div className="col-2">
              {isEditing ? submitButton : ""}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Post