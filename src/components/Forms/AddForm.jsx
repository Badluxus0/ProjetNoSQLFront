import { Form, Input, Select } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Col, Container, Row } from "react-bootstrap";

const AddForm = forwardRef(({ formData, handleChange }, ref) => {
  const [form] = Form.useForm();
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

  useImperativeHandle(ref, () => ({
    validate: () => form.validateFields(),
    getData: () => form.getFieldsValue(),
  }));

  return (
    <Container>
      <div>
        <Row>
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
                  onChange={(value) =>
                    handleChange({
                      target: { name: "subscriptionType", value },
                    })
                  }
                  value={formData.subscriptionType}
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                >
                  <Select.Option value="Basic">Basic</Select.Option>
                  <Select.Option value="Standard">Standard</Select.Option>
                  <Select.Option value="Premium">Premium</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Revenu Mensuel"
                htmlFor="monthlyRevenue"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir le revenu mensuel!",
                  },
                ]}
              >
                <Input
                  id="monthlyRevenue"
                  name="monthlyRevenue"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.monthlyRevenue}
                />
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
                  onChange={handleChange}
                  value={formData.joinDate}
                />
              </Form.Item>
              <Form.Item
                label="Date Dernier Paiement"
                htmlFor="lastPaymentDate"
                rules={[
                  {
                    required: true,
                    message: "Veuillez choisir la date du dernier paiement!",
                  },
                ]}
              >
                <Input
                  id="lastPaymentDate"
                  name="lastPaymentDate"
                  type="date"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.lastPaymentDate}
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
                  onChange={(value) =>
                    handleChange({
                      target: { name: "country", value },
                    })
                  }
                  value={formData.country}
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
                <Input
                  id="age"
                  name="age"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.age}
                />
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
                  onChange={(value) =>
                    handleChange({
                      target: { name: "gender", value },
                    })
                  }
                  value={formData.gender}
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
                  onChange={(value) =>
                    handleChange({
                      target: { name: "device", value },
                    })
                  }
                  value={formData.device}
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
        </Row>
      </div>
    </Container>
  );
});

export default AddForm;
