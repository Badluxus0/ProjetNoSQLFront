import { Form, Input, Select } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Col, Container, Row } from "react-bootstrap";

const EditForm = forwardRef(({ formData, handleChange }, ref) => {
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const countryNames = data.map((country) => country.name.common);
      setCountries(countryNames);
    } catch (error) {
      console.error("Erreur lors de la récupération des pays:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    form.setFieldsValue(formData);
  }, [formData, form]);

  useImperativeHandle(ref, () => ({
    validate: () => form.validateFields(),
    getData: () => form.getFieldsValue(),
  }));

  const formatDate = (date) => {
    const [day, month, year] = date.split("-");
    return `20${year}-${month}-${day}`;
  };

  return (
    <Container>
      <Form layout="vertical" name="editForm" autoComplete="off" form={form}>
        <Row>
          <Col>
            <Form.Item
              label="Type d'Abonnement"
              name="subscriptionType"
              rules={[
                {
                  required: true,
                  message: "Veuillez choisir le type d'abonnement!",
                },
              ]}
            >
              <Select
                onChange={(value) =>
                  handleChange({ target: { name: "subscriptionType", value } })
                }
              >
                <Select.Option value="Basic">Basic</Select.Option>
                <Select.Option value="Standard">Standard</Select.Option>
                <Select.Option value="Premium">Premium</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Revenu Mensuel"
              name="monthlyRevenue"
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
                onChange={handleChange}
                value={formData.monthlyRevenue || ""}
              />
            </Form.Item>

            <Form.Item
              label="Date Abonnement"
              name="joindate"
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
                onChange={handleChange}
                value={formatDate(formData.joinDate)}
              />
            </Form.Item>

            <Form.Item
              label="Date Dernier Paiement"
              name="lastPaymentDate"
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
                onChange={handleChange}
                value={formatDate(formData.lastPaymentDate)}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Pays"
              name="country"
              rules={[{ required: true, message: "Veuillez choisir le pays!" }]}
            >
              <Select
                loading={loading}
                onChange={(value) =>
                  handleChange({ target: { name: "country", value } })
                }
                value={formData.country}
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
              name="age"
              rules={[{ required: true, message: "Veuillez saisir l'age!" }]}
            >
              <Input type="text" onChange={handleChange} />
            </Form.Item>

            <Form.Item
              label="Genre"
              name="gender"
              rules={[
                { required: true, message: "Veuillez choisir le genre!" },
              ]}
            >
              <Select
                onChange={(value) =>
                  handleChange({ target: { name: "gender", value } })
                }
              >
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Appareil"
              name="device"
              rules={[{ required: true, message: "Veuillez saisir l'objet!" }]}
            >
              <Input type="text" onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Container>
  );
});

export default EditForm;
