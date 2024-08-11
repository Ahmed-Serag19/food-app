import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { createCategory } from '../../../../utils/CategoriesApiFunctions';

interface AddCategoryModalProps {
  show: boolean;
  handleClose: () => void;
  onCategoryAdded: () => void; // Callback to refresh categories list after adding a category
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  show,
  handleClose,
  onCategoryAdded,
}) => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      await createCategory(categoryName);
      onCategoryAdded();
      handleClose();
      setCategoryName('');
    } catch (err) {
      setError('Failed to add category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
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
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCategoryModal;
