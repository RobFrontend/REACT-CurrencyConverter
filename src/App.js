import { useEffect, useState } from "react";

const flagEU =
  "https://www.colonialflag.com/cdn/shop/products/europe-flag__45457.1639690366.1280.1280_grande.jpg";

// `https://restcountries.com/v3.1/name/poland`
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("PLN");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [fromCountry, setFromCountry] = useState("PL");
  const [toCountry, setToCountry] = useState("US");
  const [flagFromCountry, setFlagFromCountry] = useState(null);
  const [flagToCountry, setFlagToCountry] = useState(null);

  useEffect(
    function () {
      async function convert() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
          );
          const data = await res.json();
          setConverted(data.rates[toCur]);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
      if (amount === 0) return setConverted(0);
      if (fromCur === toCur) return setConverted(amount);
      convert();
    },
    [amount, fromCur, toCur]
  );

  useEffect(
    function () {
      async function flagsFrom() {
        setIsLoading(true);
        setFromCountry(fromCur[0] + fromCur[1]);
        try {
          const res = await fetch(
            `https://restcountries.com/v3.1/alpha/${fromCountry}`
          );
          const data = await res.json();
          if (fromCur === "EUR") setFlagFromCountry(flagEU);
          if (fromCur !== "EUR") setFlagFromCountry(data[0].flags.png);

          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      }

      flagsFrom();
    },
    [fromCountry, fromCur]
  );
  useEffect(
    function () {
      async function flagsTo() {
        setIsLoading(true);
        setToCountry(toCur[0] + toCur[1]);
        try {
          const res = await fetch(
            `https://restcountries.com/v3.1/alpha/${toCountry}`
          );
          const data = await res.json();
          if (toCur === "EUR") setFlagToCountry(flagEU);
          if (toCur !== "EUR") setFlagToCountry(data[0].flags.png);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      }

      flagsTo();
    },
    [toCountry, toCur]
  );

  return (
    <>
      <main>
        <div>
          <h1>Currency Converter</h1>
        </div>
        <section>
          <div className="container">
            <div className="inputs">
              <input
                className="input-amount"
                type="text"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <select
                value={fromCur}
                onChange={(e) => setFromCur(e.target.value)}
                disabled={isLoading}
              >
                <option value="PLN">PLN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CHF">CHF</option>
              </select>
              <select
                value={toCur}
                onChange={(e) => setToCur(e.target.value)}
                disabled={isLoading}
              >
                <option value="PLN">PLN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CHF">CHF</option>
              </select>
            </div>
            <p>
              <span>
                {amount} {fromCur} =
              </span>{" "}
              {Number(converted).toFixed(2)} {toCur}
            </p>
          </div>
        </section>
        <section>
          <div className="container flags-box">
            <div className="flag-img-box">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <img src={flagFromCountry} alt="country flag" />
              )}
            </div>
            <div className="flag-img-box">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <img src={flagToCountry} alt="country flags" />
              )}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} by robfrontend</p>
      </footer>
    </>
  );
}

export default App;
