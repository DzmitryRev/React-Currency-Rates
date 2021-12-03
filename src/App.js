import {
  faArrowLeft,
  faCog,
  faRedoAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import RatesPage from "./pages/Rates.page";
import SettingsPage from "./pages/Settings.page";

//// Хук запроса /////////
const useFetch = (link) => {
  const [todayRates, setTodayRates] = useState([]); // Массив доступных курсов
  const [isFetch, setIsFetch] = useState(false); // Флаг загрузки
  const [error, setError] = useState(false); // Флаг ошибки

  const fetchTodayRates = useCallback(() => {
    setIsFetch(true);
    setError(false);
    fetch(link)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTodayRates(res);
        setIsFetch(false);
      })
      .catch((e) => {
        console.log(e.message);
        setError(true);
      });
  }, [link]);

  // Функция для запроса
  return { fetchTodayRates, todayRates, isFetch, error };
};
//////////////////////////////////////////////////////////

//// Фильтрует изначальный массив курсов в зависимости от содержимого selectedRates /////////
const filterRates = (initialArray, filterCritetion) => {
  let result = initialArray.filter((item) =>
    filterCritetion.includes(item.Cur_Abbreviation)
  );
  return result;
};
///////////////////////////////////////////////////////

//// МАССИВ ВАЛЮТ НЕИЗМЕННЫХ ВАЛЮТ ////
export const BLOCKED_CUR = ["RUB", "USD", "EUR"];
//////////////////////////////////////////////////////

function App() {
  const [selectedRates, setSelectedRates] = useState(["USD", "EUR", "RUB"]); // массив выбранных валют (eur, usd, rub - неизменны)
  const location = useLocation(); // Отслеживание hash
  const { fetchTodayRates, todayRates, isFetch, error } = useFetch(
    `https://www.nbrb.by/api/exrates/rates?periodicity=0`
  );

  useEffect(() => {
    fetchTodayRates(); // Запрос за массивом курсов
  }, [fetchTodayRates]);
  return (
    <div className="app">
      <header className="header">
        <div className="header__col">
          {location.pathname === "/settings" ? (
            <Link to="/" className="header__setting-link">
              <FontAwesomeIcon
                icon={faArrowLeft}
                size="2x"
                className="header__icon_backs"
              />
            </Link>
          ) : (
            <Link to="/settings" className="header__setting-link">
              <FontAwesomeIcon
                icon={faCog}
                size="2x"
                className="header__icon_settings"
              />
            </Link>
          )}{" "}
          {/* Изменение ссылки в завимости от роута (если "/" - ссылка на "/settings", если "/settings" - ссылка на "/" )  */}
          {location.pathname === "/" ? (
            <FontAwesomeIcon
              className="header__icon_reload"
              icon={faRedoAlt}
              size="2x"
              onClick={
                isFetch
                  ? () => {}
                  : () => {
                      fetchTodayRates();
                    }
              }
            />
          ) : (
            <div></div>
          )}{" "}
          {/* Если роут === "/" - показывать иконку reload  */}
        </div>

        <div className="header__col">
          <h1 className="header__title">
            {location.pathname === "/settings" ? "Настройки" : "Курсы валют"}{" "}
            {/* Изменение header title в зависимости от роута */}
          </h1>
        </div>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <RatesPage
                rates={filterRates(todayRates, selectedRates)}
                isFetch={isFetch}
                error={error}
              />
            }
          />{" "}
          {/* Передача массива выбранных валют */}
          <Route
            path="/settings"
            element={
              <SettingsPage
                todayRates={todayRates}
                selectedRates={selectedRates}
                setSelectedRates={setSelectedRates}
                error={error}
              />
            }
          />
          {/* Передаем изначальный массив доступных курсов,
            массив аббревиатур выбранных вылют 
            и коллбэк для изменения массива аббревиатур выбранных валют  */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
