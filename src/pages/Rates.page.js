import React from "react";
import Loading from "../components/Loading";
import CurrencyItem from "../components/CurrencyItem";

function RatesPage({ rates, isFetch = false, error = false }) {
  if (error) {
    return (
      <div className="rates">
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
  return (
    <div className="rates">
      {isFetch ? (
        <Loading />
      ) : (
        <>
          <div className="currency-item">
            <div className="currency-item__col_name">
              <span>
                <b>Название валюты</b>
              </span>
            </div>
            <div className="currency-item__col_scale">
              <b>Количество ед.</b>
            </div>
            <div className="currency-item__col_rate">
              <b>Курс BYN</b>
            </div>
          </div>

          {rates.map((item) => {
            return (
              <div key={item.Cur_ID}>
                <CurrencyItem
                  name={item.Cur_Name}
                  abbr={item.Cur_Abbreviation}
                  rate={item.Cur_OfficialRate}
                  scale={item.Cur_Scale}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default RatesPage;
