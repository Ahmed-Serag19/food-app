import React, { useState, useEffect } from "react";
import { Table, Dropdown, Button, Container, Row, Col } from "react-bootstrap";
import DashboardHeader from "../../../shared/components/DashboardHeader/DashboardHeader";
import UserHeaderImage from "../../../../assets/images/header-recipes.svg";
import {
  getRecipes,
  deleteRecipe,
} from "../../../../utils/RecipesApiFunctions";
import PopupModal from "../../../shared/components/PopupModal/PopupModal";
import WarningImage from "../../../../assets/images/warning-image.svg";
import CustomToggle from "../../../categories/components/CategoriesList/CustomToggle";

interface Recipe {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  price: number;
  creationDate: string;
  modificationDate: string;
  category: {
    id: number;
    name: string;
    creationDate: string;
    modificationDate: string;
  }[];
  tag: {
    id: number;
    name: string;
    creationDate: string;
    modificationDate: string;
  };
}

const RecipesList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const handleCloseDeleteModal = () => {
    if (!deleteLoading) setShowDeleteModal(false);
  };

  const handleShowDeleteModal = (id: number) => {
    setSelectedRecipeId(id);
    setShowDeleteModal(true);
  };

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await getRecipes();
      setRecipes(response.data);
      if (response.data.length > 0) {
        setHeaders(Object.keys(response.data[0]));
      }
    } catch (error) {
      console.error("Failed to load recipes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Handle recipe deletion
  const handleDelete = async () => {
    if (selectedRecipeId !== null) {
      setDeleteLoading(true);
      try {
        await deleteRecipe(selectedRecipeId);
        fetchRecipes(); // Refresh recipes after deletion
        handleCloseDeleteModal();
      } catch (error) {
        console.error("Failed to delete recipe", error);
      } finally {
        setDeleteLoading(false);
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
                <h5 className="font-semibold mt-6">Recipes Table Details</h5>
                <p className="mb-4">You can check all details</p>
              </div>
              <div className="d-flex">
                <Button
                  variant="success"
                  className="mt-3"
                  href="/add-recipe" // Update this to the correct route
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
                  style={{ maxWidth: "300px" }}
                />
                <p>No Data!</p>
              </div>
            ) : (
              <Table bordered hover>
                <thead>
                  <tr>
                    {headers.map((header, index) => (
                      <th key={index}>
                        {header.charAt(0).toUpperCase() + header.slice(1)}
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
                          {Array.isArray(recipe[header as keyof Recipe])
                            ? (recipe[header as keyof Recipe] as any[])
                                .map((item: any) => item.name)
                                .join(", ")
                            : typeof recipe[header as keyof Recipe] ===
                                "object" &&
                              recipe[header as keyof Recipe] !== null
                            ? (recipe[header as keyof Recipe] as any).name
                            : recipe[header as keyof Recipe]}
                        </td>
                      ))}
                      <td className="text-center">
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                          />
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">View</Dropdown.Item>
                            <Dropdown.Item href="#">Edit</Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleShowDeleteModal(recipe.id)}
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
