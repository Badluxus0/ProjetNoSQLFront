import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

function EditForm({ formData, handleChange }) {
  const [countries, setCountries] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const countryNames = data.map((country) => country.name.common);
      setCountries(countryNames);
    } catch (error) {
      console.error("Erreur lors de la récupération des pays:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (date) => {
    const [day, month, year] = date.split("-");
    return `20${year}-${month}-${day}`;
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="form-group">
            <label htmlFor="subscriptionType">Type d'Abonnement :</label>
            <select
              id="subscriptionType"
              name="subscriptionType"
              type="text"
              className="form-select"
              onChange={(value) =>
                handleChange({ target: { name: "subscriptionType", value } })
              }
              value={formData.subscriptionType}
            >
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="monthlyRevenue">Revenu Mensuel :</label>
            <input
              id="monthlyRevenue"
              name="monthlyRevenue"
              type="text"
              className="form-control"
              onChange={handleChange}
              value={formData.monthlyRevenue || ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="joinDate">Date Abonnement :</label>
            <input
              id="joinDate"
              name="joinDate"
              type="date"
              className="form-control"
              onChange={handleChange}
              value={formatDate(formData.joinDate)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastPaymentDate">Date Dernier Paiement :</label>
            <input
              id="lastPaymentDate"
              name="lastPaymentDate"
              type="date"
              className="form-control"
              onChange={handleChange}
              value={formatDate(formData.lastPaymentDate)}
            />
          </div>
        </Col>
        <Col>
          <div className="form-group">
            <label htmlFor="country">Pays :</label>
            <select
              id="country"
              name="country"
              type="text"
              className="form-select"
              onChange={(value) =>
                handleChange({ target: { name: "country", value } })
              }
              value={formData.country}
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="age">Age :</label>
            <input
              id="age"
              name="age"
              type="text"
              className="form-control"
              onChange={handleChange}
              value={formData.age || ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Genre :</label>
            <select
              className="form-select"
              onChange={(value) =>
                handleChange({ target: { name: " gender", value } })
              }
              value={formData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="device">Appareil :</label>
            <select
              name="device"
              id="device"
              className="form-select"
              value={formData.device}
              onChange={(value) =>
                handleChange({ target: { name: "device", value } })
              }
            >
              <option value="Smartphone">Smartphone</option>
              <option value="Tablet">Tablet</option>
              <option value="Desktop">Desktop</option>
              <option value="Smart TV">Smart TV</option>
            </select>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EditForm;
