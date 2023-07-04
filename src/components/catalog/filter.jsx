
import css from './catalog.module.css'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/xFilter.svg';
import { MyContext } from '../../App';
import React, { useContext } from 'react';

export default function Filter({filters}) {
    



    return(
        <div className={css.filterWrap}>
            <h2 className={css.allBoksFilterH2}>
                Всі книги
            </h2>
            {filters &&
            <>
<div className={css.filterSetiningWrap}>
    {filters.map((el, index) => {
       return <div key={index} className={css.filterSetining}>
        <p className={css.setiningsFilterName}>
        {el.value}
        </p>
        <HandySvg 
                    src={iconSrc}
                    className={css.delSetiningsFilter}
                    width="16"
        height="16"
                    />
    </div>
    })}
    
</div>

<button className={css.clearFilter}>
Скинути фільтр
</button>
</>
}

        </div>
    )
}