export default function Toggler(props){
    return(
          <div id='timer' className='settingchild'>
            <div id='seshtitle' className='title'><h2>{props.title}</h2></div>
            <div id='toggler' className='settingchild2'>
              <i onClick={props.clickdown} className="arrow down settingchild3"></i>
              <textarea value={props.length} className='display settingchild3' />
              <i onClick={props.clickup} className="arrow up settingchild3"></i>
            </div>   
  </div>
  )//return
}