import { Col, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";

const SearchForm = ({ onSearch }) => {
  const { form } = Form.useForm();
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

  return (
    <div>
      <Col>
        <Form layout="vertical" name="basic" autoComplete="off" form={form}>
          <Form.Item
            label="Type d'Abonnement"
            htmlFor="subscriptionType"
            rules={[
              {
                required: true,
                message: "Veuillez choisir le type d'abonnement!",
              },
            ]}
          >
            <Select
              id="subscriptionType"
              name="subscriptionType"
              type="text"
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
            >
              <Select.Option value="Basic">Basic</Select.Option>
              <Select.Option value="Standard">Standard</Select.Option>
              <Select.Option value="Premium">Premium</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Date Abonnement"
            htmlFor="joinDate"
            rules={[
              {
                required: true,
                message: "Veuillez choisir la date de l'abonnement!",
              },
            ]}
          >
            <Input
              id="joinDate"
              name="joinDate"
              type="date"
              className="form-control"
            />
          </Form.Item>
        </Form>
      </Col>
      <Col>
        <Form layout="vertical" name="basic" autoComplete="off" form={form}>
          <Form.Item
            label="Pays"
            htmlFor="country"
            rules={[
              {
                required: true,
                message: "Veuillez choisir le pays!",
              },
            ]}
          >
            <Select
              id="country"
              name="country"
              type="text"
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
            >
              {countries.map((country) => (
                <Select.Option key={country} value={country}>
                  {country}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Age"
            htmlFor="age"
            rules={[
              {
                required: true,
                message: "Veuillez saisir l'age!",
              },
            ]}
          >
            <Input id="age" name="age" type="text" className="form-control" />
          </Form.Item>
          <Form.Item
            label="Genre"
            htmlFor="gender"
            rules={[
              {
                required: true,
                message: "Veuillez choisir le genre!",
              },
            ]}
          >
            <Select
              id="gender"
              name="gender"
              type="text"
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
            >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Appareil"
            htmlFor="device"
            rules={[
              {
                required: true,
                message: "Veuillez saisir l'objet!",
              },
            ]}
          >
            <Select
              id="device"
              name="device"
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
            >
              <Select.Option value="Smartphone">Smartphone</Select.Option>
              <Select.Option value="Tablette">Tablette</Select.Option>
              <Select.Option value="Ordinateur">Ordinateur</Select.Option>
              <Select.Option value="Smart TV">Smart TV</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
};

export default SearchForm;
