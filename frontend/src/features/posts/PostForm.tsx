import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store';
import { createPostAsync } from './postSlice';

function PostForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function submitHandler(e: any) {
    e.preventDefault();
    const formData = {
      post: {
        title: title,
        body: body,
      }
    }
    dispatch(createPostAsync(formData))
    resetState();
  };

  function resetState() {
    setTitle('');
    setBody('');
  }

  return (
    <div>
      <h1>投稿フォーム</h1>
      <form>
        <input
          type="text"
          className='form-control text-start'
          name='title'
          placeholder='タイトルを入力'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className='form-control text-start'
          name='body'
          value={body}
          placeholder='テキストを入力'
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit" onClick={(e) => submitHandler(e)}>投稿</button>
      </form>
    </div>
  )
}

export default PostForm