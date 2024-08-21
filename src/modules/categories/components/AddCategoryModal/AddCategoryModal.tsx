import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import {
  createCategory,
  updateCategory,
  Category,
} from '../../../../utils/CategoriesApiFunctions';

interface AddCategoryModalProps {
  show: boolean;
  handleClose: () => void;
  onCategoryAdded: () => void;
  category?: Category | null;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  show,
  handleClose,
  onCategoryAdded,
  category = null,
}) => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
    } else {
      setCategoryName('');
    }
  }, [category]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      if (category) {
        await updateCategory(category.id, categoryName);
      } else {
        await createCategory(categoryName);
      }
      onCategoryAdded();
      handleClose();
    } catch (err) {
      setError('Failed to save category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {category ? 'Edit Category' : 'Add Category'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCategoryName">
            <Form.Control
              type="text"
              placeholder="Category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              disabled={loading}
            />
          </Form.Group>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={handleSave}
          disabled={loading || !categoryName.trim()}
        >
          {loading ? 'Saving...' : category ? 'Update' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCategoryModal;
