import React, { useState } from "react";
import "./login.css";
import { API_URL_LOGIN } from "../../../config/global.constant";
import axios from "axios";
import { Form, Input } from "antd";

function Login() {
  const [error, setError] = useState("");
  const [form] = Form.useForm();

  const login = async () => {
    try {
      const values = await form.validateFields();
      const response = await axios.post(API_URL_LOGIN, values);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <div className="half">
      <div
        className="bg order-1 order-md-2"
        style={{ backgroundImage: 'url("Background_home.png")' }}
      ></div>
      <div className="contents order-2 order-md-1">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-6">
              <div className="form-block">
                <div className="text-center mb-5">
                  <h3>
                    Login to <strong>Admin</strong>
                  </h3>
                </div>
                <Form
                  layout="vertical"
                  name="basic"
                  autoComplete="off"
                  form={form}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: "Veuillez saisir le nom d'utilisateur!" }]}
                  >
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Mot de passe"
                    name="password"
                    rules={[{ required: true, message: "Veuillez saisir le mot de passe!" }]}
                  >
                    <Input
                      type="password"
                      className="form-control"
                      placeholder="Your Password"
                    />
                  </Form.Item>
                  <input
                    type="button"
                    value="Log In"
                    className="btn btn-block btn-primary"
                    onClick={login}
                  />
                  <div className="text-center mt-2">
                    <span className="text-danger">{error}</span>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
