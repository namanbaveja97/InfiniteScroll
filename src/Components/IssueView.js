import React, { useEffect, useState, useCallback, useRef } from 'react'
import axios from 'axios'
import IssueBar from './IssueBar';

function IssueView() {
  const [pageNum,setPageNum] = useState(0);
  const [data,setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState({})
  const [hasNextPage, setHasNextPage] = useState(false)



useEffect(()=>{
  console.log('called use effect');
  const controller = new AbortController()
  const { signal } = controller
  if(isLoading) return;
  setIsLoading(true)

  if(pageNum >= 5){
    return ()=>controller.abort()
    // setIsLoading(false)
    // if(signal.aborted) return
    // setIsError(true)
    // console.log('error',error.message);
    // setError({errorMessage: error.message})
  }

  axios.get(`https://api.github.com/repos/facebook/react/issues?page=${pageNum}`)
  .then(function(result){
    console.log(result);
    setData(prev => [...prev,...result.data] );
    setHasNextPage(Boolean(result.data.length))
    setIsLoading(false)
  }).catch(function(error){
    setIsLoading(false)
    if(signal.aborted) return
    setIsError(true)
    console.log('error',error.message);
    setError({errorMessage: error.message})
    
  })

  return ()=>controller.abort()
},[pageNum])
const intObserver = useRef()
const lastPostRef = useCallback(post => {
  if (isLoading) return
  console.log('check')

  if (intObserver.current) intObserver.current.disconnect()

  intObserver.current = new IntersectionObserver(posts => {
      if (posts[0].isIntersecting && hasNextPage) {
          console.log('We are near the last post!')
          setPageNum(prev => prev + 1)
      }
  })

  if (post) intObserver.current.observe(post)
}, [isLoading, hasNextPage])


  const issues = data.map((d,i)=>{
    console.log(data.length,i+1);
        if(data.length-5 == i){
          console.log('calling new index ------------------------------');
          return <IssueBar ref={lastPostRef} key={d.id} displayData={d}></IssueBar>
        }
       return <IssueBar key={d.id} displayData={d}></IssueBar>
      })

  // if(isError) return(
  //   <div className="alert alert-danger m-5 " style={{ textAlign: 'center' }} role="alert">
  //  {error.errorMessage}
  // </div>
  // )
  const test = {
    "url": "https://api.github.com/repos/facebook/react/issues/25746",
    "repository_url": "https://api.github.com/repos/facebook/react",
    "labels_url": "https://api.github.com/repos/facebook/react/issues/25746/labels{/name}",
    "comments_url": "https://api.github.com/repos/facebook/react/issues/25746/comments",
    "events_url": "https://api.github.com/repos/facebook/react/issues/25746/events",
    "html_url": "https://github.com/facebook/react/issues/25746",
    "id": 1465176747,
    "node_id": "I_kwDOAJy2Ks5XVNKr",
    "number": 25746,
    "title": "> > I need this isValidElement to determine whether it's a component or a function",
    "user": {
      "login": "qq281113270",
      "id": 20044598,
      "node_id": "MDQ6VXNlcjIwMDQ0NTk4",
      "avatar_url": "https://avatars.githubusercontent.com/u/20044598?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/qq281113270",
      "html_url": "https://github.com/qq281113270",
      "followers_url": "https://api.github.com/users/qq281113270/followers",
      "following_url": "https://api.github.com/users/qq281113270/following{/other_user}",
      "gists_url": "https://api.github.com/users/qq281113270/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/qq281113270/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/qq281113270/subscriptions",
      "organizations_url": "https://api.github.com/users/qq281113270/orgs",
      "repos_url": "https://api.github.com/users/qq281113270/repos",
      "events_url": "https://api.github.com/users/qq281113270/events{/privacy}",
      "received_events_url": "https://api.github.com/users/qq281113270/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [
     
    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "assignees": [

    ],
    "milestone": null,
    "comments": 1,
    "created_at": "2022-11-26T14:59:18Z",
    "updated_at": "2022-11-26T16:47:56Z",
    "closed_at": null,
    "author_association": "NONE",
    "active_lock_reason": null,
    "body": "        > > I need this isValidElement to determine whether it's a component or a function\r\n> \r\n> `isValidElement` cannot distinguish component from function:\r\n> \r\n> ```js\r\n> isValidElement(<Component />); // true\r\n> isValidElement(Component); // false\r\n> isValidElement(() => <Component />); // false\r\n> ```\r\n\r\n\r\n\r\n> > I need this isValidElement to determine whether it's a component or a function\r\n> \r\n> `isValidElement` cannot distinguish component from function:\r\n> \r\n> ```js\r\n> isValidElement(<Component />); // true\r\n> isValidElement(Component); // false\r\n> isValidElement(() => <Component />); // false\r\n> ```\r\n  isValidElement(<Component />);  ， The judgment is inaccurate。\r\ntest code \r\n```\r\nconst lazy = (loader) => {\r\n  lazy.loaderArr = [...lazy.loaderArr, loader];\r\n  return () => {\r\n    return loader()\r\n      .then((res) => {\r\n        return res.default;\r\n      })\r\n      .catch((e) => {\r\n        throw new Error(e);\r\n      });\r\n  };\r\n};\r\nlazy.loaderArr = [];\r\n\r\n\r\n let = Component = lazy(() =>\r\n      import(\r\n        /* webpackChunkName:\"accountManagementDetails\" */ \r\n\r\n      \"client/pages/Index/pages/system/pages/AccountManagement/index.js\"  // this is  Component  path\r\n\r\n      )\r\n    )\r\n    console.log(\"Component===\", Component);\r\n    console.log(\"<Component/>==\", <Component />);\r\n    console.log(\"isValidElement==\", isValidElement(<Component />));\r\n    debugger;\r\n\r\n```\r\nIf I use   <Component />  ,He will become a vnode, \r\n isValidElement(<Component />)  Will return true。\r\n\r\n But Component isn't really a component, it's a component promise loader。\r\nUsing <Component/> in jsx produces an error。 \r\n So it's not really a component。\r\n expect  <Component />  Will return false。\r\n So isValidElement can't tell if it's a real component.\r\n\r\ntest result\r\n![image](https://user-images.githubusercontent.com/20044598/204095208-2679a0b4-56c0-489c-817e-8ab177a59f17.png)\r\n\r\nIs there any other way you can tell if it's a component or a function or a promise.\r\n\r\n_Originally posted by @qq281113270 in https://github.com/facebook/react/issues/25665#issuecomment-1328060814_\r\n      ",
    "reactions": {
      "url": "https://api.github.com/repos/facebook/react/issues/25746/reactions",
      "total_count": 0,
      "+1": 0,
      "-1": 0,
      "laugh": 0,
      "hooray": 0,
      "confused": 0,
      "heart": 0,
      "rocket": 0,
      "eyes": 0
    },
    "timeline_url": "https://api.github.com/repos/facebook/react/issues/25746/timeline",
    "performed_via_github_app": null,
    "state_reason": null
  }

  return (
    <div>
        <div className="card mx-5 my-2 p-0">
          <div className="card-header" style={{ backgroundColor:'#f6f8fa' }}>
            869 open    <svg style={{ marginLeft:'20px' }} aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check">
              
            <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
            </svg> 11,006 Closed
          </div>
          <div className="card-body p-0">
          {issues}
            {/* <IssueBar displayData={test}></IssueBar> */}
           


            
          </div>
        </div>
    </div>
  )
}

export default IssueView