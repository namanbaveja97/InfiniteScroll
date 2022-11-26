import React from 'react'
import './Issubar.css'
import moment from 'moment';

function IssueBar(props, ref) {
    console.log(props);
    const data = props.displayData

const bodyJsx = (<div className='issueBar'>
<span className="issueBar__icon">
<svg  viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path><path fill-rule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path></svg>
</span>
<span className='issubar__title'>
   <p className='issubar__text'>{data.title} {data.labels.map((l,i) =><span className={'issueBar__label label_'+i}>{l.name}</span> )} </p>
  
   
</span>
<div className='issubar__duration'>
    <p style={{ margin: '0px 0px 0px 40px' }}># {data.number} opened {moment.utc(data.created_at).local().startOf('seconds').fromNow()} </p>
</div>

</div>)


const content = ref
        ? <div ref={ref}>{bodyJsx}</div>
        : <div>{bodyJsx}</div>

  return (
    content
  )
}

export default React.forwardRef(IssueBar)