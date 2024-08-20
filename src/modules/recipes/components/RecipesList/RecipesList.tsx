import React, { useState, useEffect } from 'react';
import {
  Table,
  Dropdown,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Form,
} from 'react-bootstrap';
import DashboardHeader from '../../../shared/components/DashboardHeader/DashboardHeader';
import UserHeaderImage from '../../../../assets/images/header-recipes.svg';
import {
  getRecipes,
  deleteRecipe,
  updateRecipe,
  RecipeFormData,
} from '../../../../utils/RecipesApiFunctions';
import PopupModal from '../../../shared/components/PopupModal/PopupModal';
import WarningImage from '../../../../assets/images/warning-image.svg';
import CustomToggle from '../../../categories/components/CategoriesList/CustomToggle';

interface Recipe {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  price: number;
  creationDate: string;
  modificationDate: string;
  category: Category[];
  tag: Tag;
}

interface Category {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

interface Tag {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

const BASE_URL = 'https://upskilling-egypt.com:3006/';

const RecipesList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [headers, setHeaders] = useState<(keyof Recipe)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<
    number | null
  >(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<RecipeFormData>({
    name: '',
    description: '',
    price: '',
    tagId: '',
    categoriesIds: [],
    recipeImage: null,
  });

  const handleCloseDeleteModal = () => {
    if (!deleteLoading) setShowDeleteModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleShowDeleteModal = (id: number) => {
    setSelectedRecipeId(id);
    setShowDeleteModal(true);
  };

  const handleShowEditModal = (recipe: Recipe) => {
    setSelectedRecipeId(recipe.id);
    setEditFormData({
      name: recipe.name,
      description: recipe.description,
      price: recipe.price.toString(),
      tagId: recipe.tag.id.toString(),
      categoriesIds: recipe.category.map((cat) => cat.id.toString()),
      recipeImage: null, // Handle image file separately if needed
    });
    setShowEditModal(true);
  };

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await getRecipes();
      setRecipes(response.data);
      if (response.data.length > 0) {
        setHeaders(Object.keys(response.data[0]) as (keyof Recipe)[]);
      }
    } catch (error) {
      console.error('Failed to load recipes', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async () => {
    if (selectedRecipeId !== null) {
      setDeleteLoading(true);
      try {
        await deleteRecipe(selectedRecipeId);
        fetchRecipes();
        handleCloseDeleteModal();
      } catch (error) {
        console.error('Failed to delete recipe', error);
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const handleEditSubmit = async () => {
    if (selectedRecipeId !== null) {
      try {
        await updateRecipe(selectedRecipeId, editFormData);
        fetchRecipes();
        handleCloseEditModal();
      } catch (error) {
        console.error('Failed to update recipe', error);
      }
    }
  };

  return (
    <section className="recipes-list py-3">
      <Container fluid>
        <Row>
          <Col>
            <DashboardHeader
              title="Recipes "
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
                  Recipes Table Details
                </h5>
                <p className="mb-4">You can check all details</p>
              </div>
              <div className="d-flex">
                <Button
                  variant="success"
                  className="mt-3"
                  href="/dashboard/add-recipe"
                >
                  Add New Recipe
                </Button>
              </div>
            </div>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <p>Loading...</p>
              </div>
            ) : recipes.length === 0 ? (
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
                  {recipes.map((recipe, rowIndex) => (
                    <tr key={rowIndex}>
                      {headers.map((header, colIndex) => (
                        <td key={colIndex}>
                          {header === 'imagePath' ? (
                            <img
                              src={`${BASE_URL}${recipe.imagePath}`}
                              alt={recipe.name}
                              style={{ maxWidth: '100px' }}
                            />
                          ) : Array.isArray(recipe[header]) ? (
                            (recipe[header] as Category[])
                              .map((item) => item.name)
                              .join(', ')
                          ) : typeof recipe[header] === 'object' &&
                            recipe[header] !== null ? (
                            (recipe[header] as Tag).name
                          ) : (
                            recipe[header]
                          )}
                        </td>
                      ))}
                      <td className="text-center">
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                          />
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() =>
                                handleShowEditModal(recipe)
                              }
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleShowDeleteModal(recipe.id)
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

      {/* Edit Recipe Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRecipeName">
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control
                type="text"
                value={editFormData.name}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group
              controlId="formRecipeDescription"
              className="mt-3"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={editFormData.description}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formRecipePrice" className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={editFormData.price}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    price: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formRecipeTag" className="mt-3">
              <Form.Label>Tag ID</Form.Label>
              <Form.Control
                type="number"
                value={editFormData.tagId}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    tagId: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group
              controlId="formRecipeCategories"
              className="mt-3"
            >
              <Form.Label>Categories IDs</Form.Label>
              {recipes.length > 0 ? (
                <Form.Control
                  as="select"
                  multiple
                  value={editFormData.categoriesIds}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      categoriesIds: Array.from(
                        (e.target as unknown as HTMLSelectElement)
                          .selectedOptions,
                        (option) =>
                          (option as HTMLOptionElement).value
                      ),
                    })
                  }
                >
                  {recipes[0].category?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Control>
              ) : (
                <p>No categories available</p>
              )}
            </Form.Group>

            <Form.Group controlId="formRecipeImage" className="mt-3">
              <Form.Label>Recipe Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    recipeImage: (
                      e.target as unknown as HTMLInputElement
                    ).files
                      ? (e.target as unknown as HTMLInputElement)
                          .files![0]
                      : null,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <PopupModal
        show={showDeleteModal}
        bodyText="Are you sure you want to delete this recipe?"
        buttonText="Delete"
        title="Confirm Deletion"
        handleClose={handleCloseDeleteModal}
        propFunction={handleDelete}
        loading={deleteLoading}
      />
    </section>
  );
};

export default RecipesList;
