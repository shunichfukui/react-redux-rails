import { destroyPostAsync } from './postSlice'

function ButtonGroup(props:any) {

  function handleClick(e:any) {
      const payload = {
          post: {
              post_id: props.post_id
          }
      }
      props.dispatch(destroyPostAsync(payload));
  }
  return (
    <div className='btn-group float-end'>
        <button className='btn btn-warning' onClick={(e) => props.toggleEditForm()}>
            編集
        </button>
        <button className='btn btn-danger' onClick={(e) => handleClick((e))}>
            削除
        </button>
    </div>
  )
}

export default ButtonGroup