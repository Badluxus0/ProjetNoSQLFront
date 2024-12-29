import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  const token = localStorage.getItem("token");
  const isLogged = token ? true : false;
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark color-white">
        <div className="container">
          <Link className="navbar-brand" to="/">
            User-Management
          </Link>
          <div className="collapse navbar-collapse d-flex justify-content-between">
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Accueil
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user">
                    Liste des utilisateurs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  {isLogged ? (
                    <Link className="nav-link" type="primary" onClick={() => handleShowModal()}>
                      Se déconnecter
                    </Link>
                  ) : (
                  <Link className="nav-link" to="/login">
                    Se connecter
                  </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Modal
            show={showModal}
            onHide={handleHideModal}
            dialogClassName="custom-modal"
            size="lg"
            style={{ width: "100%", textAlign: "" }}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ textAlign: "center" }}>
                  Deconnexion
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <strong>
                Voulez-vous vraiment vous déconnecter ?
              </strong>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleHideModal}>
                Fermer
              </Button>
              <Button variant="primary" onClick={handleLogout}>
                Confirmer
              </Button>
            </Modal.Footer>
          </Modal>
    </header>
  );
}

export default Header;
