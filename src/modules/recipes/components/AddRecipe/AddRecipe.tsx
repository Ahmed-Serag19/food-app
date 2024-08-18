import { Form, Button, Col, Row } from "react-bootstrap";
import CallToActionCard from "../../../shared/components/CallToActionCard/CallToActionCard";
import { useEffect, useState } from "react";
import {
  getTags,
  Tag,
  Category,
  getCategories,
} from "../../../../utils/RecipesApiFunctions";

const AddRecipe = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories(10, 1);
        setCategories(categoriesData.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    const fetchTags = async () => {
      try {
        const tagsData = await getTags();
        setTags(tagsData);
      } catch (error) {
        console.error("Error fetching tags", error);
      }
    };
    fetchCategories();
    fetchTags();
  }, []);
  return (
    <section>
      <CallToActionCard
        title="Show All Recipes"
        linkTo="dashboard/recipes-list"
        buttonText="All Recipes"
        description="you can now see the meals easily, click here and check all the recipes!"
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Form>
              <Form.Group className="py-2" controlId="recipeName">
                <Form.Control type="text" placeholder="Enter recipe name" />
              </Form.Group>

              <Form.Select className="py-2">
                {tags.map((tag, index) => (
                  <option key={index} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Group className="py-2" controlId="price">
                <Form.Control type="text" placeholder="350.99 EGP" />
              </Form.Group>

              <Form.Select className="py-2">
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Group className="py-2" controlId="description">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                />
              </Form.Group>

              <Form.Group className="py-2" controlId="imageUpload">
                <Form.Control type="file" />
              </Form.Group>

              <Row className="mt-4">
                <Col xs={6}>
                  <Button variant="secondary">Cancel</Button>
                </Col>
                <Col xs={6}>
                  <Button variant="success">Save</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddRecipe;
