import imgLogog from '../../img/logSubscribe.png'



export default function Subscribe() {




    return(
        <div className="subscribeWrap">
            <img src={imgLogog} className="logSubscribe"/>
            <p className='subscribeP'>
            Підпишись щоб <br/><span className='subscribePSpan'>отримати знижку</span>
            </p>
            <button className='subscribeButton'>
                Підписатися
            </button>
        </div>
    )
}