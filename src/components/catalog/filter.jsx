
import './catalog.css'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/xFilter.svg';
import { MyContext } from '../../App';
import React, { useContext } from 'react';

export default function Filter({filters}) {
    



    return(
        <div className="filterWrap">
            <h2 className='allBoksFilterH2'>
                Всі книги
            </h2>
            {filters &&
            <>
<div className='filterSetiningWrap'>
    {filters.map((el, index) => {
       return <div key={index} className='filterSetining'>
        <p className='setiningsFilterName'>
        {el.value}
        </p>
        <HandySvg 
                    src={iconSrc}
                    className="delSetiningsFilter"
                    width="16"
        height="16"
                    />
    </div>
    })}
    
</div>

<button className='clearFilter'>
Скинути фільтр
</button>
</>
}

        </div>
    )
}