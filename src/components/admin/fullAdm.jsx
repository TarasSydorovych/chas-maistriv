import { useState } from 'react'
import { Link } from 'react-router-dom'
import AddBooks from './addBooks'
import css from './adm.module.css'
import AddRuk from '../addRuk/addRuk'
import ProductList from './productList'
import ManList from './manList'
import OrderList from './orderList'
import AddBlog from '../admBlog/addBlog'
import AddPromo from './addPromo'
import Carton from './carton'
import CartonCha from './cartonCha'
import SurveyForm from './surveyForm'
import AddBooksTest from './addBooksTest'
import UserList from './userList'
import SeoBlock from './seoBlock'
import AutorAdm from '../autorAdm/autorAdm'
import HeroAdm from '../heroAdm/heroAdm'

export default function FullAdm() {
const [addB, setAddB] = useState(false)
const [addM, setAddM] = useState(false)
const [addBlog, setAddBlog] = useState(false)
const [bookList, setBookList] = useState(false)
const [manList, setManList] = useState(false)
const [prodList, setProdList] = useState(false)
const [promo, setPromo] = useState(false);
const [carton, setCarton] = useState(false);
const [cartonCha, setCartonCha] = useState(false);
const [question, setQuestion] = useState(false);
const [user, setUser] = useState(false)
const [seo, setSeo] = useState(false)
const [auth, setAuth] = useState(false)
const [hero, setHero] = useState(false)
   const  addBooksTrue = () => {
    setAddB(!addB)
    setAddM(false)
    setBookList(false)
    setManList(false)
    setProdList(false)
    setAddBlog(false)
    setPromo(false)
    setCarton(false)
    setCartonCha(false)
    setQuestion(false)
    setUser(false)
    setSeo(false)
    setHero(false)
   }
   const  addManTrue = () => {
    setAddB(false)
    setAddM(!addM)
    setBookList(false)
    setManList(false)
    setProdList(false)
    setAddBlog(false)
    setPromo(false)
    setCarton(false)
    setCartonCha(false)
    setQuestion(false)
    setUser(false)
    setSeo(false)
    setAuth(false)
    setHero(false)
   }
   const  bookListCha = () => {
    setAddB(false)
    setAddM(false)
    setBookList(!bookList)
    setManList(false)
    setProdList(false)
    setAddBlog(false)
    setPromo(false)
    setCarton(false)
    setCartonCha(false)
    setQuestion(false)
    setUser(false)
    setSeo(false)
    setAuth(false)
    setHero(false)
   }
   const  manListCha = () => {
    setAddB(false)
    setAddM(false)
    setBookList(false)
    setManList(!manList)
    setProdList(false)
    setAddBlog(false)
    setCarton(false)
    setCartonCha(false)
    setQuestion(false)
    setUser(false)
    setSeo(false)
   }
   const  prodListFunc = () => {
    setAddB(false)
    setAddM(false)
    setBookList(false)
    setManList(false)
    setProdList(!prodList)
    setAddBlog(false)
    setPromo(false)
    setCarton(false)
    setCartonCha(false)
    setQuestion(false)
    setUser(false)
    setSeo(false)
    setAuth(false)
    setHero(false)
   }
   const  addBlogP = () => {
    setAddB(false)
    setAddM(false)
    setBookList(false)
    setManList(false)
    setProdList(false)
    setAddBlog(!addBlog)
    setPromo(false)
    setCarton(false)
    setCartonCha(false)
    setQuestion(false)
    setUser(false)
    setSeo(false)
    setHero(false)
   }
   const  changeToPromo = () => {
    setAddB(false)
    setAddM(false)
    setBookList(false)
    setManList(false)
    setProdList(false)
    setAddBlog(false)
    setPromo(!promo)
    setCarton(false)
    setCartonCha(false)
    setQuestion(false)
    setUser(false)
    setSeo(false)
   }
   const  cartonFun = () => {
    setAddB(false)
    setAddM(false)
    setBookList(false)
    setManList(false)
    setProdList(false)
    setAddBlog(false)
    setPromo(false)
    setCarton(!carton)
    setCartonCha(false)
    setQuestion(false)
    setUser(false)
    setSeo(false)
    setHero(false)
   }
   const  cartonFunCha = () => {
    setAddB(false)
    setAddM(false)
    setBookList(false)
    setManList(false)
    setProdList(false)
    setAddBlog(false)
    setPromo(false)
    setCarton(false)
    setCartonCha(!cartonCha)
    setQuestion(false)
    setUser(false)
    setSeo(false)
    setAuth(false)
    setHero(false)
   }
   const addQuestion = () => {
    setAddB(false)
    setAddM(false)
    setBookList(false)
    setManList(false)
    setProdList(false)
    setAddBlog(false)
    setPromo(false)
    setCarton(false)
    setCartonCha(false)
    setQuestion(!question)
    setUser(false)
    setSeo(false)
    setHero(false)
   }
   const userBlock = () => {
    setAddB(false)
    setAddM(false)
    setBookList(false)
    setManList(false)
    setProdList(false)
    setAddBlog(false)
    setPromo(false)
    setCarton(false)
    setCartonCha(false)
    setQuestion(false)
    setUser(!user)
    setSeo(false)
    setAuth(false)
    setHero(false)
   }
   const seoBlock = () => {
    setAddB(false)
    setAddM(false)
    setBookList(false)
    setManList(false)
    setProdList(false)
    setAddBlog(false)
    setPromo(false)
    setCarton(false)
    setCartonCha(false)
    setQuestion(false)
    setUser(false)
    setSeo(!seo)
    setAuth(false)
    setHero(false)
   }
   const authBlock = () => {
    setAddB(false)
    setAddM(false)
    setBookList(false)
    setManList(false)
    setProdList(false)
    setAddBlog(false)
    setPromo(false)
    setCarton(false)
    setCartonCha(false)
    setQuestion(false)
    setUser(false)
    setSeo(false)
    setAuth(!auth)
    setHero(false)
   }
   const heroBlock = () => {
    setAddB(false)
    setAddM(false)
    setBookList(false)
    setManList(false)
    setProdList(false)
    setAddBlog(false)
    setPromo(false)
    setCarton(false)
    setCartonCha(false)
    setQuestion(false)
    setUser(false)
    setSeo(false)
    setAuth(false)
    setHero(!hero)
   }
    return(
<div className={css.fullAdmWrapp}>
    <div className={css.admList}>
        <ul className={css.listUlForAdm}>
            <li className={css.listUlForAdmLi} onClick={addBooksTrue}><Link
            className={`${css.listUlForAdmLiA} ${addB ? css.listUlForAdmLiAA : ''}`}>Додати книгу</Link></li>
               <li className={css.listUlForAdmLi} onClick={addManTrue}><Link
            className={`${css.listUlForAdmLiA} ${addM ? css.listUlForAdmLiAA : ''}`}>Додати літопис</Link></li>
             <li className={css.listUlForAdmLi} onClick={bookListCha}><Link
            className={`${css.listUlForAdmLiA} ${bookList ? css.listUlForAdmLiAA : ''}`}>Список товарів</Link></li>
            <li className={css.listUlForAdmLi} onClick={manListCha}><Link
            className={`${css.listUlForAdmLiA} ${manList ? css.listUlForAdmLiAA : ''}`}>Список рукописів</Link></li>
                    <li className={css.listUlForAdmLi} onClick={prodListFunc}><Link
            className={`${css.listUlForAdmLiA} ${prodList ? css.listUlForAdmLiAA : ''}`}>Список замовлень</Link></li>
             <li className={css.listUlForAdmLi} onClick={addBlogP}><Link
            className={`${css.listUlForAdmLiA} ${addBlog ? css.listUlForAdmLiAA : ''}`}>Додати статтю</Link></li>
            <li className={css.listUlForAdmLi} onClick={changeToPromo}><Link
            className={`${css.listUlForAdmLiA} ${promo ? css.listUlForAdmLiAA : ''}`}>Промокод</Link></li>
                     <li className={css.listUlForAdmLi} onClick={cartonFunCha}><Link
            className={`${css.listUlForAdmLiA} ${cartonCha ? css.listUlForAdmLiAA : ''}`}>Змінити обкладинку</Link></li>
                       <li className={css.listUlForAdmLi} onClick={addQuestion}><Link
            className={`${css.listUlForAdmLiA} ${question ? css.listUlForAdmLiAA : ''}`}>Додати опитування</Link></li>
            <li className={css.listUlForAdmLi} onClick={userBlock}><Link
            className={`${css.listUlForAdmLiA} ${user ? css.listUlForAdmLiAA : ''}`}>Список користувачів</Link></li>
                   <li className={css.listUlForAdmLi} onClick={seoBlock}><Link
            className={`${css.listUlForAdmLiA} ${seo ? css.listUlForAdmLiAA : ''}`}>Seo</Link></li>
             <li className={css.listUlForAdmLi} onClick={authBlock}><Link
            className={`${css.listUlForAdmLiA} ${auth ? css.listUlForAdmLiAA : ''}`}>Додати автора</Link></li>
                   <li className={css.listUlForAdmLi} onClick={heroBlock}><Link
            className={`${css.listUlForAdmLiA} ${hero ? css.listUlForAdmLiAA : ''}`}>Додати героя</Link></li>
        </ul>
    </div>
    {addB && 
    <AddBooksTest/>
    }
    {addM && 
    <AddRuk/>
    }
    {bookList &&
    <ProductList/>
    }
    {manList &&
        <ManList/>
    }
     {prodList &&
        <OrderList/>
    }
    {addBlog &&
        <AddBlog/>
    }
     {promo &&
        <AddPromo/>
    }
    {carton &&
        <Carton/>
    }
      {cartonCha &&
        <CartonCha/>
    }
    {question &&
        <SurveyForm/>
    }
    {user &&
    <UserList/>
    }
    {seo &&
    <SeoBlock/>
    }
     {auth &&
    <AutorAdm/>
    }
    {hero &&
    <HeroAdm/>
    }
</div>

    )
}