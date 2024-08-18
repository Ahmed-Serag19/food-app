import { Form, Button, Col, Row } from "react-bootstrap";
import CallToActionCard from "../../../shared/components/CallToActionCard/CallToActionCard";
import { useEffect, useState } from "react";
import {
  getTags,
  Tag,
  Category,
  getCategories,
  createRecipe,
  RecipeFormData,
} from "../../../../utils/RecipesApiFunctions";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent } from "react";

const AddRecipe = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<RecipeFormData>({
    name: "",
    description: "",
    price: "",
    tagId: "",
    categoriesIds: [],
    recipeImage: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
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

  type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

  const handleChange = (e: ChangeEvent<FormElement>) => {
    const target = e.target;

    if (
      target instanceof HTMLInputElement &&
      target.type === "file" &&
      target.files
    ) {
      setFormData({ ...formData, recipeImage: target.files[0] });
    } else if (
      target instanceof HTMLSelectElement &&
      target.name === "categoriesIds"
    ) {
      const selectedCategories = Array.from(
        target.selectedOptions,
        (option) => (option as HTMLOptionElement).value
      );
      setFormData({ ...formData, categoriesIds: selectedCategories });
    } else {
      setFormData({ ...formData, [target.name]: target.value });
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createRecipe(formData);
      navigate("/dashboard/recipes-list");
    } catch (error) {
      console.error("Error creating recipe", error);
    }
  };

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
            <Form onSubmit={handleSubmit}>
              <Form.Group className="py-2" controlId="recipeName">
                <Form.Control
                  type="text"
                  placeholder="Enter recipe name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Select
                className="py-2"
                name="tagId"
                value={formData.tagId}
                onChange={handleChange}
              >
                <option>Select Tag</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Group className="py-2" controlId="price">
                <Form.Control
                  type="text"
                  placeholder="350.99 EGP"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Select
                className="py-2"
                name="categoriesIds"
                value={formData.categoriesIds}
                onChange={handleChange}
              >
                <option>Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Group className="py-2" controlId="description">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="py-2" controlId="imageUpload">
                <Form.Control
                  type="file"
                  name="recipeImage"
                  onChange={handleChange}
                />
              </Form.Group>

              <Row className="mt-4">
                <Col xs={6}>
                  <Button variant="secondary">Cancel</Button>
                </Col>
                <Col xs={6}>
                  <Button variant="success" type="submit">
                    Save
                  </Button>
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
