import React, { useState, useEffect } from 'react';
import {
  Table,
  Dropdown,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import DashboardHeader from '../../../shared/components/DashboardHeader/DashboardHeader';
import UserHeaderImage from '../../../../assets/images/header-recipes.svg';
import CustomToggle from './CustomToggle';
import {
  getCategories,
  deleteCategory,
} from '../../../../utils/CategoriesApiFunctions';
import PopupModal from '../../../shared/components/PopupModal/PopupModal';
import AddCategoryModal from '../AddCategoryModal/AddCategoryModal';
import WarningImage from '../../../../assets/images/warning-image.svg'; // Import the warning image

interface Category {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] =
    useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | null
  >(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false); // State to handle loading during delete

  const handleCloseDeleteModal = () => {
    if (!deleteLoading) setShowDeleteModal(false); // Prevent closing if loading
  };

  const handleShowDeleteModal = (id: number) => {
    setSelectedCategoryId(id);
    setShowDeleteModal(true);
  };

  const handleCloseAddCategoryModal = () =>
    setShowAddCategoryModal(false);
  const handleShowAddCategoryModal = () =>
    setShowAddCategoryModal(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategories();
      setCategories(response.data);
      if (response.data.length > 0) {
        setHeaders(Object.keys(response.data[0]));
      }
    } catch (error) {
      console.error('Failed to load categories', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async () => {
    if (selectedCategoryId !== null) {
      setDeleteLoading(true); // Start loading
      try {
        await deleteCategory(selectedCategoryId);
        fetchCategories(); // Refresh categories after deletion
        handleCloseDeleteModal();
      } catch (error) {
        console.error('Failed to delete category', error);
      } finally {
        setDeleteLoading(false); // Stop loading
      }
    }
  };

  return (
    <section className="categories-list py-3">
      <Container fluid>
        <Row>
          <Col>
            <DashboardHeader
              title="Categories "
              image={UserHeaderImage}
              titleSpan="items"
              paragraph="You can now add your items that any user can order it from the Application and you can edit"
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="font-semibold mt-6">
                  Categories Table Details
                </h5>
                <p className="mb-4">You can check all details</p>
              </div>
              <div className="d-flex">
                <Button
                  variant="success"
                  className="mt-3"
                  onClick={handleShowAddCategoryModal}
                >
                  Add New Category
                </Button>
              </div>
            </div>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <p>Loading...</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <img
                  src={WarningImage}
                  alt="No Data"
                  className="mb-4"
                  style={{ maxWidth: '300px' }}
                />
                <p>No Data!</p>
              </div>
            ) : (
              <Table bordered hover>
                <thead>
                  <tr>
                    {headers.map((header, index) => (
                      <th key={index}>
                        {header.charAt(0).toUpperCase() +
                          header.slice(1)}
                      </th>
                    ))}
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, rowIndex) => (
                    <tr key={rowIndex}>
                      {headers.map((header, colIndex) => (
                        <td key={colIndex}>{category[header]}</td>
                      ))}
                      <td className="text-center">
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                          />
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">
                              View
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleShowDeleteModal(category.id)
                              }
                            >
                              Delete
                            </Dropdown.Item>
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
        bodyText="Are you sure you want to delete this category?"
        buttonText="Delete"
        title="Confirm Deletion"
        handleClose={handleCloseDeleteModal}
        propFunction={handleDelete}
        loading={deleteLoading} // Pass loading state to disable button during delete
      />

      <AddCategoryModal
        show={showAddCategoryModal}
        handleClose={handleCloseAddCategoryModal}
        onCategoryAdded={fetchCategories} // Refresh the categories list after adding a category
      />
    </section>
  );
};

export default CategoriesList;
