import React, { useEffect, useState } from "react";
import { BLOCKED_CUR } from "../App";
import CurrencyItem from "../components/CurrencyItem";

/// хук поиска
/// хук принимает исходный массив данных, возвращает отфильтрованный массив в зависимости от value
const useSearch = (initialRates) => {
  const [value, setValue] = useState("");
  const [rates, setRates] = useState([]); // массив результатов поиска
  useEffect(() => {
    if (value === "") {
      setRates(initialRates);
    } else {
      let filtredBySearch = initialRates.filter(
        (item) =>
          item.Cur_Name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
          item.Cur_Abbreviation.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setRates(filtredBySearch);
    }
  }, [value, initialRates]);
  return { value, setValue, rates };
};
//////////////////////////

// props
// todayRates - массив доступных курсов
// selectedRates - массив аббревиатур выбранных валют (Изначально - RUB, EUR, USD)
// setSelectedRates - изменить массив selectedRates

const SettingsPage = ({
  todayRates,
  selectedRates,
  setSelectedRates,
  error,
}) => {
  const { value, setValue, rates } = useSearch(todayRates);

  if (error) {
    return (
      <div>
        <div className="currency-item">
          <div className="currency-item__col">
            <span>
              <b>Ошибка</b>
            </span>
          </div>
        </div>
      </div>
    );
  }

  const deleteCurrency = (cur_abbr) => {
    const copy = [...selectedRates];
    let filtred = copy.filter((item) => item !== cur_abbr);
    setSelectedRates(filtred);
  }; // Удалить валюту

  const addCurrency = (cur_abbr) => {
    const copy = [...selectedRates];
    copy.push(cur_abbr);
    setSelectedRates(copy);
  }; // добавить валюту

  return (
    <>
      <div className="search-block">
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="Поиск валюты"
        />
      </div>
      {rates.length === 0 ? (
        <div className="search-block">
          <h3>Ничего не найдено</h3>
        </div>
      ) : (
        <div className="content">
          <div className="currency-item">
            <div className="currency-item__col_checkbox"></div>

            <div className="currency-item__col_name">
              <span>
                <b>Название валюты</b>
              </span>
            </div>
          </div>
          {rates.map((item) => {
            if (BLOCKED_CUR.includes(item.Cur_Abbreviation)) {
              return null;
            }
            return (
              <div key={item.Cur_ID}>
                <CurrencyItem
                  type="settings"
                  name={item.Cur_Name}
                  abbr={item.Cur_Abbreviation}
                  rate={item.Cur_OfficialRate}
                  scale={item.Cur_Scale}
                  checked={selectedRates.includes(item.Cur_Abbreviation)}
                  addCurrency={addCurrency}
                  deleteCurrency={deleteCurrency}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SettingsPage;
