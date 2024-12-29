import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { API_URL } from "../../../config/global.constant";
import { Pagination } from "antd";
import {
  FaCheckCircle,
  FaEdit,
  FaPlus,
  FaTimesCircle,
  FaTrash,
} from "react-icons/fa";
import { Button, Container, Modal, Toast } from "react-bootstrap";
import AddForm from "../../Forms/AddForm";
import EditForm from "../../Forms/EditForm";
import "./userlist.css";
import Layout from "../Layout";

function UserList() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    subscriptionType: "",
    monthlyRevenue: "",
    joinDate: "",
    lastPaymentDate: "",
    country: "",
    age: "",
    gender: "",
    device: "",
    planDuration: "1 Month",
  });

  const formRef = useRef();

  const handleGoClick = async () => {
    try {
      await formRef.current.validate();
      // Logique à exécuter après validation réussie
    } catch (errorInfo) {
      console.log("Erreur lors de la validation :", errorInfo);
    }
  };

  const handleSubmitAdd = async () => {
    try {
      console.log("Formulaire validé :", formData);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${API_URL}`, formData, config);
      if (response.status === 201) {
        fetchData(
          `${API_URL}?page=${currentPage}&limit=${itemsPerPage}`,
          setUsers
        );
        setShowAlert(true);
        setAlertType("success");
        setAlertTitle("Succès");
        setAlertMessage("Utilisateur ajouté avec succès !");
        setShowAddModal(false);
      }
    } catch (error) {
      console.log("Erreur lors de l'ajout de l'utilisateur :", error);
      setShowAlert(true);
      setAlertType("danger");
      setAlertTitle("Erreur");
      setAlertMessage("Erreur lors de l'ajout de l'utilisateur !");
    }
  };

  const handleSubmitEdit = async () => {
    try {
      console.log("Formulaire validé :", formData);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${API_URL}/${selectedUser._id}`,
        formData,
        config
      );
      if (response.status === 200) {
        fetchData(
          `${API_URL}?page=${currentPage}&limit=${itemsPerPage}`,
          setUsers
        );
        setShowAlert(true);
        setAlertType("success");
        setAlertTitle("Succès");
        setAlertMessage("Utilisateur modifié avec succès !");
        setShowEditModal(false);
      }
    } catch (error) {
      console.log("Erreur lors de la modification de l'utilisateur :", error);
      setShowAlert(true);
      setAlertType("danger");
      setAlertTitle("Erreur");
      setAlertMessage("Erreur lors de la modification de l'utilisateur !");
    }
  };

  const handleDeleteUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${API_URL}/${selectedUser._id}`, config);
      fetchData(
        `${API_URL}?page=${currentPage}&limit=${itemsPerPage}`,
        setUsers
      );
      setShowAlert(true);
      setAlertType("success");
      setAlertTitle("Succès");
      setAlertMessage("Utilisateur supprimé avec succès !");
      setShowDeleteModal(false);
    } catch (error) {
      console.log("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleShowEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      userid: user.userId,
      subscriptionType: user.subscriptionType,
      monthlyRevenue: user.monthlyRevenue,
      joinDate: user.joinDate,
      lastPaymentDate: user.lastPaymentDate,
      country: user.country,
      age: user.age,
      gender: user.gender,
      device: user.device,
      planDuration: user.planDuration,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleShowDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(`${API_URL}?page=${page}&limit=${itemsPerPage}`, setUsers);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchData = async (url, setter) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(url, config);
      setter(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(`${API_URL}`, setUsers);
  }, []);

  const handlePagination = (
    currentPage,
    totalPages,
    handlePageChange,
    itemsPerPage
  ) => {
    return (
      <Pagination
        id="pagination"
        key={currentPage}
        align="center"
        showQuickJumper
        locale={{ jump_to: "Aller à", page: "Page" }}
        current={currentPage}
        total={totalPages * itemsPerPage}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
        showTotal={(total, range) => {
          if (total === 0) {
            return `Aucun élément trouvé`;
          } else {
            return `Page ${currentPage} sur ${totalPages} - ${totalElements} éléments`;
          }
        }}
        showSizeChanger={false}
        responsive
      />
    );
  };

  const dataTable = (data) => {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Type Abonnement</th>
            <th>Revenu Mensuel</th>
            <th>Date Abonnement</th>
            <th>Date Dernier Paiement</th>
            <th>Pays</th>
            <th>Age</th>
            <th>Genre</th>
            <th>Appareil</th>
            <th>Durée Abonnement</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id}>
              <td>{user.userId}</td>
              <td>{user.subscriptionType}</td>
              <td>{user.monthlyRevenue}</td>
              <td>{user.joinDate}</td>
              <td>{user.lastPaymentDate}</td>
              <td>{user.country}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.device}</td>
              <td>{user.planDuration}</td>
              <td className="text-center">
                <div className="text-center d-flex align-items-center justify-content-center">
                  <button
                    type="button"
                    className="btn btn-warning d-flex align-items-center"
                    placement="left"
                    onClick={() => {
                      handleShowEditModal(user);
                    }}
                  >
                    <FaEdit />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className="btn btn-danger d-flex align-items-center"
                    placement="right"
                    onClick={() => {
                      handleShowDeleteModal(user);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <Layout>
        <Container>
          <div className="container mt-4">
            <Toast
              show={showAlert}
              onClose={() => setShowAlert(false)}
              delay={5000}
              autohide
              bg={alertType}
              style={{
                position: "fixed",
                top: "0%",
                right: "0%",
                zIndex: 1050,
                minWidth: "250px",
              }}
            >
              <Toast.Header className="d-flex justify-content-between">
                {alertTitle === "Succès" ? (
                  <div className="d-flex align-items-center">
                    <FaCheckCircle />
                    &nbsp;
                    <strong className="me-auto">{alertTitle}</strong>
                  </div>
                ) : (
                  alertTitle === "Erreur" && (
                    <div className="d-flex align-items-center">
                      <FaTimesCircle />
                      &nbsp;
                      <strong className="me-auto">{alertTitle}</strong>
                    </div>
                  )
                )}
              </Toast.Header>
              <Toast.Body>{alertMessage}</Toast.Body>
            </Toast>
          </div>
          <div className="d-flex justify-content-between mt-5 mb-3">
            <Button
              className="btn btn-success d-flex align-items-center"
              onClick={() => {
                handleShowAddModal();
              }}
            >
              Ajouter &nbsp; <FaPlus />
            </Button>
          </div>
          <div>{dataTable(users)}</div>
          <div>
            {handlePagination(
              currentPage,
              totalPages,
              handlePageChange,
              totalElements,
              itemsPerPage,
              setItemsPerPage
            )}
          </div>
          <Modal
            show={showAddModal}
            onHide={handleCloseAddModal}
            dialogClassName="custom-modal"
            size="lg"
            style={{ width: "100%", textAlign: "" }}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ textAlign: "center" }}>
                Ajouter utilisateur
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddForm
                formData={formData}
                handleChange={handleChange}
                ref={formRef}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseAddModal}>
                Fermer
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleSubmitAdd();
                  handleGoClick();
                }}
              >
                Ajouter
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showEditModal}
            onHide={handleCloseEditModal}
            dialogClassName="custom-modal"
            size="lg"
            style={{ width: "100%", textAlign: "" }}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ textAlign: "center" }}>
                Modifier utilisateur
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditForm
                user={selectedUser}
                formData={formData}
                handleChange={handleChange}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseEditModal}>
                Fermer
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleSubmitEdit();
                }}
              >
                Modifier
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showDeleteModal}
            onHide={handleCloseDeleteModal}
            dialogClassName="custom-modal"
            size="lg"
            style={{ width: "100%", textAlign: "" }}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ textAlign: "center" }}>
                Supprimer utilisateur
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Êtes-vous sûr de vouloir supprimer l'utilisateur avec l'ID{" "}
                <strong className="text-danger">{selectedUser.userId}</strong> ?
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseDeleteModal}>
                Fermer
              </Button>
              <Button variant="primary" onClick={handleDeleteUser}>
                Supprimer
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </Layout>
    </div>
  );
}

export default UserList;
