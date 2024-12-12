import './RegisteredPage.css'

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Registered {
  id: number;
  name: string;
  age: number;
  city: string;
  img: string;
  skills: string;
}

const RegisteredPage: React.FC = () => {
  const [registered, setRegistered] = useState<Registered[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string>("");
  const [type, setType] = useState<"ajudante" | "ajudado">("ajudante");
  const [page, setPage] = useState<number>(1);
  
  useEffect(() => {
    const fetchData = async () => {
      const citiesResponse = await axios.get<string[]>("/cities");
      setCities(citiesResponse.data);

      const registeredResponse = await axios.get<Registered[]>(
        `/${type}?page=${page}&city=${selectedCities}`
      );
      setRegistered(registeredResponse.data);
    };

    fetchData();
  }, [type, page, selectedCities]);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCities(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value as "ajudante" | "ajudado");
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex">
          <div className="dropdown me-2">
            <select
              className="form-select"
              value={selectedCities}
              onChange={handleCityChange}
            >
              <option value="">Filtrar por Cidade</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="btn-group">
          <input
            type="radio"
            className="btn-check"
            name="type"
            id="ajudante"
            value="ajudante"
            checked={type === "ajudante"}
            onChange={handleTypeChange}
            autoComplete="off"
          />
          <label className="btn btn-outline-primary" htmlFor="ajudante">
            Ajudantes
          </label>

          <input
            type="radio"
            className="btn-check"
            name="type"
            id="ajudado"
            value="ajudado"
            checked={type === "ajudado"}
            onChange={handleTypeChange}
            autoComplete="off"
          />
          <label className="btn btn-outline-primary" htmlFor="ajudado">
            Ajudados
          </label>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {registered.map((registered) => (
          <div className="col" key={registered.id}>
            <div className="card">
              <img
                src={registered.img}
                className="card-img-top"
                alt={registered.name}
              />
              <div className="card-body">
                <h5 className="card-title">{registered.name}, {registered.age} anos</h5>
                <p className="card-text">{registered.skills}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="btn-toolbar justify-content-center mt-4" role="toolbar">
        <div className="btn-group me-2" role="group" aria-label="Pagination">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handlePageChange(2)}
          >
            2
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handlePageChange(3)}
          >
            3
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handlePageChange(4)}
          >
            4
          </button>
        </div>
      </div>

      <div className="text-center mt-4">
        <a href="/register" className="btn btn-warning">Suba agora nessa ponte</a>
      </div>
    </div>
  );
};

export default RegisteredPage;
