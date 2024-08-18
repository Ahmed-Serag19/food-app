import React, { useState, useEffect } from "react";
import { Table, Dropdown, Button, Container, Row, Col } from "react-bootstrap";
import DashboardHeader from "../../../shared/components/DashboardHeader/DashboardHeader";
import UserHeaderImage from "../../../../assets/images/header-recipes.svg";
import { getUsers, deleteUser } from "../../../../utils/UsersApiFunctions";
import PopupModal from "../../../shared/components/PopupModal/PopupModal";
import WarningImage from "../../../../assets/images/warning-image.svg";
import CustomToggle from "../../../categories/components/CategoriesList/CustomToggle";

interface User {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string | null;
  group: {
    id: number;
    name: string;
    creationDate: string;
    modificationDate: string;
  };
  creationDate: string;
  modificationDate: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const handleCloseDeleteModal = () => {
    if (!deleteLoading) setShowDeleteModal(false);
  };
  console.log(users);
  const handleShowDeleteModal = (id: number) => {
    setSelectedUserId(id);
    setShowDeleteModal(true);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data);
      if (response.data.length > 0) {
        setHeaders([
          "Username",
          "Email",
          "Country",
          "Phone number",
          "Group",
          "Creation date",
        ]);
      }
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (selectedUserId !== null) {
      setDeleteLoading(true);
      try {
        await deleteUser(selectedUserId);
        fetchUsers();
        handleCloseDeleteModal();
      } catch (error) {
        console.error("Failed to delete user", error);
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  return (
    <section className="users-list py-3">
      <Container fluid>
        <Row>
          <Col>
            <DashboardHeader
              title="Users "
              image={UserHeaderImage}
              titleSpan="List"
              paragraph="Manage all users within the application. You can add, edit, and delete users as needed."
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="font-semibold mt-6">Users Table Details</h5>
                <p className="mb-4">You can check all user details</p>
              </div>
              <div className="d-flex">
                <Button
                  variant="success"
                  className="mt-3"
                  // onClick={handleShowAddUserModal}
                >
                  Add New User
                </Button>
              </div>
            </div>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <p>Loading...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <img
                  src={WarningImage}
                  alt="No Data"
                  className="mb-4"
                  style={{ maxWidth: "300px" }}
                />
                <p>No Data!</p>
              </div>
            ) : (
              <Table hover>
                <thead>
                  <tr>
                    {headers.map((header, index) => (
                      <th key={index} id="table-header">
                        {header.charAt(0).toUpperCase() + header.slice(1)}
                      </th>
                    ))}
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, rowIndex) => (
                    <tr key={rowIndex}>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>{user.country}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.group.name}</td>
                      <td>
                        {new Date(user.creationDate).toLocaleDateString()}
                      </td>
                      <td className="text-center">
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                          />
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">View</Dropdown.Item>

                            {user.group.name === "SystemUser" && (
                              <Dropdown.Item
                                onClick={() => handleShowDeleteModal(user.id)}
                              >
                                Delete
                              </Dropdown.Item>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>

      <PopupModal
        show={showDeleteModal}
        bodyText="Are you sure you want to delete this user?"
        buttonText="Delete"
        title="Confirm Deletion"
        handleClose={handleCloseDeleteModal}
        propFunction={handleDelete}
        loading={deleteLoading}
      />

      {/* <AddUserModal
        show={showAddUserModal}
        handleClose={handleCloseAddUserModal}
        onUserAdded={fetchUsers}
      /> */}
    </section>
  );
};

export default UsersList;
