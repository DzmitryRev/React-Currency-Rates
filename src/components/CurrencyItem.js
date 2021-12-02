import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CurrencyItem = ({
  type = "main",
  name,
  abbr,
  rate,
  scale,
  checked,
  addCurrency,
  deleteCurrency,
}) => {
  if (type === "settings") {
    return (
      <div className="currency-item">
        <div className="currency-item__col_checkbox">
          <input
            type="checkbox"
            className="currency-settings-item__checkbox"
            checked={checked}
            onChange={
              checked
                ? () => {
                    deleteCurrency(abbr);
                  }
                : () => {
                    addCurrency(abbr);
                  }
            }
          />
        </div>
        <div className="currency-item__col_name">
          <span>
            {name} ({abbr})
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="currency-item">
      <div className="currency-item__col_name">
        <span>
          {name} ({abbr})
        </span>
      </div>
      <div className="currency-item__col_scale">
        <span>{scale}</span>
      </div>
      <div className="currency-item__col_rate">
        <span>{rate} </span>
        <FontAwesomeIcon
          icon={faCopy}
          onClick={() => {
            navigator.clipboard.writeText(rate);
          }}
        />
      </div>
    </div>
  );
};

export default CurrencyItem;
