import { useState } from "react";
import css from "./adm.module.css";
import OpicunskaRada from "./mainPages/opicunskaRada";
import AdminProductSelector from "./catalog/adminProductSelector";
import FiltersBooks from "./filters/filtersBooks";
import FiltersManuscript from "./filters/filtersManuscript";
import PriceOptPage from "./priceOtp/priceOptPage";
import CatalogOptCom from "./priceOtp/catalogOptCom";
import LitShowManager from "./priceOtp/litShowManager";
import AutorAndHud from "./autorAndHud";
import AdminForeignRights from "./adminForeignRights";
import NovaPoshtaKeyManager from "./novaPoshta";
const PageListFor = () => {
  const [mainPage, setMainPage] = useState(false);
  const [opicunskaRada, setOpicunskaRada] = useState(false);
  const [catalogPage, setCatalogPage] = useState(false);
  const [mainBanner, setMainBanner] = useState(false);
  const [filters, setFilters] = useState(false);
  const [filtersBooks, setFiltersBooks] = useState(false);
  const [filtersManuscript, setFiltersManuscript] = useState(false);
  const [priceOpt, setPriceOpt] = useState(false);
  const [actionsAndRoz, setActionsAndRoz] = useState(false);
  const [documentoobig, setDocumentoobig] = useState(false);
  const [litShow, setLitShow] = useState(false);
  const [autorsHudognik, setAutorsHudognik] = useState(false);
  const [foreiRight, setForeiRight] = useState(false);
  const [novaKey, setNovaKey] = useState(false);
  const mainPageClick = () => {
    setMainPage(!mainPage);
    setCatalogPage(false);
    setFilters(false);
    setFiltersBooks(false);
    setFiltersManuscript(false);
    setPriceOpt(false);
    setActionsAndRoz(false);
    setDocumentoobig(false);
    setLitShow(false);
    setAutorsHudognik(false);
    setForeiRight(false);
    setNovaKey(false);
  };
  const catalogPageClick = () => {
    setMainPage(false);
    setCatalogPage(!catalogPage);
    setFilters(false);
    setFiltersBooks(false);
    setFiltersManuscript(false);
    setPriceOpt(false);
    setActionsAndRoz(false);
    setDocumentoobig(false);
    setLitShow(false);
    setAutorsHudognik(false);
    setForeiRight(false);
    setNovaKey(false);
  };
  const opicunscaPageClick = () => {
    setOpicunskaRada(!opicunskaRada);
    setMainPage(false);
    setCatalogPage(false);
    setFilters(false);
    setFiltersBooks(false);
    setFiltersManuscript(false);
    setPriceOpt(false);
    setActionsAndRoz(false);
    setDocumentoobig(false);
    setLitShow(false);
    setAutorsHudognik(false);
    setForeiRight(false);
    setNovaKey(false);
  };
  const mainBannerCatalogPageClick = () => {
    setOpicunskaRada(false);
    setMainPage(false);
    setCatalogPage(false);
    setMainBanner(!mainBanner);
    setFilters(false);
    setFiltersBooks(false);
    setFiltersManuscript(false);
    setPriceOpt(false);
    setActionsAndRoz(false);
    setDocumentoobig(false);
    setLitShow(false);
    setAutorsHudognik(false);
    setForeiRight(false);
    setNovaKey(false);
  };
  const filtersPageClick = () => {
    setOpicunskaRada(false);
    setMainPage(false);
    setCatalogPage(false);
    setMainBanner(false);
    setFilters(!filters);
    setFiltersBooks(false);
    setFiltersManuscript(false);
    setPriceOpt(false);
    setActionsAndRoz(false);
    setDocumentoobig(false);
    setLitShow(false);
    setAutorsHudognik(false);
    setForeiRight(false);
    setNovaKey(false);
  };
  const filtersBooksPageClick = () => {
    setOpicunskaRada(false);
    setMainPage(false);
    setCatalogPage(false);
    setMainBanner(false);
    setFilters(false);
    setFiltersBooks(!filtersBooks);
    setFiltersManuscript(false);
    setPriceOpt(false);
    setActionsAndRoz(false);
    setDocumentoobig(false);
    setLitShow(false);
    setAutorsHudognik(false);
    setForeiRight(false);
    setNovaKey(false);
  };
  const filtersManuscriptPageClick = () => {
    setOpicunskaRada(false);
    setMainPage(false);
    setCatalogPage(false);
    setMainBanner(false);
    setFilters(false);
    setFiltersBooks(false);
    setFiltersManuscript(!filtersManuscript);
    setPriceOpt(false);
    setActionsAndRoz(false);
    setDocumentoobig(false);
    setLitShow(false);
    setAutorsHudognik(false);
    setForeiRight(false);
    setNovaKey(false);
  };
  const priceOptPageClick = () => {
    setOpicunskaRada(false);
    setMainPage(false);
    setCatalogPage(false);
    setMainBanner(false);
    setFilters(false);
    setFiltersBooks(false);
    setFiltersManuscript(false);
    setPriceOpt(!priceOpt);
    setActionsAndRoz(false);
    setDocumentoobig(false);
    setLitShow(false);
    setAutorsHudognik(false);
    setForeiRight(false);
    setNovaKey(false);
  };
  const actionsAndRozprodagPageClick = () => {
    setOpicunskaRada(false);
    setMainPage(false);
    setCatalogPage(false);
    setMainBanner(false);
    setFilters(false);
    setFiltersBooks(false);
    setFiltersManuscript(false);
    setPriceOpt(false);
    setActionsAndRoz(!actionsAndRoz);
    setDocumentoobig(false);
    setLitShow(false);
    setAutorsHudognik(false);
    setForeiRight(false);
    setNovaKey(false);
  };
  const documentoobigPageClick = () => {
    setOpicunskaRada(false);
    setMainPage(false);
    setCatalogPage(false);
    setMainBanner(false);
    setFilters(false);
    setFiltersBooks(false);
    setFiltersManuscript(false);
    setPriceOpt(false);
    setActionsAndRoz(false);
    setDocumentoobig(!documentoobig);
    setLitShow(false);
    setAutorsHudognik(false);
    setForeiRight(false);
    setNovaKey(false);
  };
  const liShowPageClick = () => {
    setOpicunskaRada(false);
    setMainPage(false);
    setCatalogPage(false);
    setMainBanner(false);
    setFilters(false);
    setFiltersBooks(false);
    setFiltersManuscript(false);
    setPriceOpt(false);
    setActionsAndRoz(false);
    setDocumentoobig(false);
    setLitShow(!litShow);
    setAutorsHudognik(false);
    setForeiRight(false);
    setNovaKey(false);
  };
  const autorAndHudognuk = () => {
    setOpicunskaRada(false);
    setMainPage(false);
    setCatalogPage(false);
    setMainBanner(false);
    setFilters(false);
    setFiltersBooks(false);
    setFiltersManuscript(false);
    setPriceOpt(false);
    setActionsAndRoz(false);
    setDocumentoobig(false);
    setLitShow(false);
    setAutorsHudognik(!autorsHudognik);
    setForeiRight(false);
    setNovaKey(false);
  };
  const foreiR = () => {
    setOpicunskaRada(false);
    setMainPage(false);
    setCatalogPage(false);
    setMainBanner(false);
    setFilters(false);
    setFiltersBooks(false);
    setFiltersManuscript(false);
    setPriceOpt(false);
    setActionsAndRoz(false);
    setDocumentoobig(false);
    setLitShow(false);
    setAutorsHudognik(false);
    setForeiRight(!foreiRight);
    setNovaKey(false);
  };
  const novaK = () => {
    setOpicunskaRada(false);
    setMainPage(false);
    setCatalogPage(false);
    setMainBanner(false);
    setFilters(false);
    setFiltersBooks(false);
    setFiltersManuscript(false);
    setPriceOpt(false);
    setActionsAndRoz(false);
    setDocumentoobig(false);
    setLitShow(false);
    setAutorsHudognik(false);
    setForeiRight(false);
    setNovaKey(!novaKey);
  };
  return (
    <div className={css.wrapAdmLisPage}>
      <div className={css.buttonWrapInPage}>
        <div className={css.mainPageButtonO} onClick={novaK}>
          Нова пошта ключ
        </div>
        <div className={css.mainPageButtonO} onClick={mainPageClick}>
          Головна
        </div>
        <div className={css.mainPageButtonO} onClick={catalogPageClick}>
          Каталог
        </div>
        <div className={css.mainPageButtonO} onClick={filtersPageClick}>
          Фільтри
        </div>
        <div className={css.mainPageButtonO} onClick={priceOptPageClick}>
          Прайс-гурт
        </div>
        <div className={css.mainPageButtonO} onClick={autorAndHudognuk}>
          Авторам/Художникам
        </div>
        <div className={css.mainPageButtonO} onClick={foreiR}>
          foreign-rights
        </div>
      </div>
      {mainPage && (
        <div className={css.buttonWrapInPage}>
          <div className={css.mainPageButtonO} onClick={opicunscaPageClick}>
            Опікунська рада
          </div>
        </div>
      )}
      {filters && (
        <div className={css.buttonWrapInPage}>
          <div className={css.mainPageButtonO} onClick={filtersBooksPageClick}>
            Фільтри книг
          </div>
          <div
            className={css.mainPageButtonO}
            onClick={filtersManuscriptPageClick}
          >
            Фільтри рукописів
          </div>
        </div>
      )}
      {catalogPage && (
        <div className={css.buttonWrapInPage}>
          <div
            className={css.mainPageButtonO}
            onClick={mainBannerCatalogPageClick}
          >
            Головний банер
          </div>
        </div>
      )}
      {priceOpt && (
        <div className={css.buttonWrapInPage}>
          <div
            className={css.mainPageButtonO}
            onClick={actionsAndRozprodagPageClick}
          >
            Акції та розпродаж
          </div>
          <div className={css.mainPageButtonO} onClick={documentoobigPageClick}>
            Документообіг, каталог
          </div>
          <div className={css.mainPageButtonO} onClick={liShowPageClick}>
            Літ шоу
          </div>
        </div>
      )}
      {opicunskaRada && <OpicunskaRada />}
      {mainBanner && <AdminProductSelector />}
      {filtersBooks && <FiltersBooks />}
      {filtersManuscript && <FiltersManuscript />}
      {actionsAndRoz && <PriceOptPage />}
      {documentoobig && <CatalogOptCom />}
      {litShow && <LitShowManager />}
      {autorsHudognik && <AutorAndHud />}
      {foreiRight && <AdminForeignRights />}
      {novaKey && <NovaPoshtaKeyManager />}
    </div>
  );
};
export default PageListFor;
