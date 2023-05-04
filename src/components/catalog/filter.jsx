
import './catalog.css'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/xFilter.svg';
import { MyContext } from '../../App';
import React, { useContext } from 'react';

export default function Filter() {
    const { selectedFilters, setSelectedFilters } = useContext(MyContext);

console.log('Список з контексту', selectedFilters.length);

    return(
        <div className="filterWrap">
            <h2 className='allBoksFilterH2'>
                Всі книги
            </h2>
            {selectedFilters.length !== 0 &&
            <>
<div className='filterSetiningWrap'>
    {selectedFilters.map((el, index) => {
       return <div key={index} className='filterSetining'>
        <p className='setiningsFilterName'>
        {el}
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